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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    <div className="container">
      <header className="fixed-header fade-in">
        <h1 className="text-3xl font-semibold text-gray-200 tracking-wider drop-shadow-sm">
          Rick & Morty Cosmos
        </h1>
      </header>
      <div className="main-content">
        <section className="filters-section my-5 fade-in">
          <Filters />
        </section>
        <section className="cards-section">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.results.map((character: Character) => (
              <div key={character.id} className="fade-in">
                <CharacterCard character={character} />
              </div>
            ))}
          </div>
        </section>
      </div>
      <div className="fixed-pagination fade-in">
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
