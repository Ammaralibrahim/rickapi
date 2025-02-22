import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { fetchCharacters, useCharacters } from '../lib/api';
import { ApiResponse, Character, QueryParams } from '../lib/types';
import { Filters } from '../components/Filters';
import { CharacterCard } from '../components/CharacterCard';
import { Pagination } from '../components/Pagination';

interface CharactersPageProps {
  initialData: ApiResponse;
}

export default function CharactersPage({ initialData }: CharactersPageProps) {
  const router = useRouter();
  const params: QueryParams = {
    status: router.query.status as string,
    gender: router.query.gender as string,
    page: (router.query.page as string) || '1',
  };

  const { data, isLoading, error } = useCharacters(params, initialData);

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen text-base text-gray-400">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="flex items-center justify-center h-screen text-base text-red-300">
        Error: {(error as Error).message}
      </div>
    );
  if (!data)
    return (
      <div className="flex items-center justify-center h-screen text-base text-gray-400">
        No data available
      </div>
    );

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <header className="fixed top-0 left-0 w-full bg-gray-900/80 backdrop-blur-md z-10 py-4 px-5 ">
        <h1 className="text-center text-xl sm:text-2xl md:text-3xl font-semibold text-gray-200 tracking-wider drop-shadow-sm">
          RickApi
        </h1>
      </header>
      <div className="pt-20 pb-10 min-h-screen">
        <section className="my-6">
          <Filters />
        </section>
        <section className="cards-section ">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {data.results.map((character: Character) => (
              <div key={character.id} className="fade-in">
                <CharacterCard character={character} />
              </div>
            ))}
          </div>
        </section>
      </div>
      <div className="fixed bottom-0 left-0 w-full bg-gray-900/80 backdrop-blur-xs py-4">
        <Pagination info={data.info} />
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const params: QueryParams = {
    status: context.query.status as string,
    gender: context.query.gender as string,
    page: (context.query.page as string) || '1',
  };

  try {
    const initialData = await fetchCharacters(params);
    return { props: { initialData } };
  } catch {
    return {
      props: {
        initialData: {
          info: { count: 0, pages: 0, next: null, prev: null },
          results: [],
        },
      },
    };
  }
};
