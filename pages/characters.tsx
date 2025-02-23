import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { fetchCharacters, useCharacters } from '../lib/api';
import { ApiResponse, Character, QueryParams } from '../lib/types';
import { Filters } from '../components/Filters';
import { CharacterCard } from '../components/CharacterCard';
import { Pagination } from '../components/Pagination';
import { Button } from '@/components/ui/button';

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

  // Function to scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

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
      <header className="fixed top-0 left-0 w-full bg-gray-900/80 backdrop-blur-md z-10 py-4 px-5">
        <h1 className="text-center text-2xl sm:text-2xl md:text-3xl font-semibold text-gray-200 tracking-wider drop-shadow-sm">
          RickAPI
        </h1>
      </header>
      <div className="pt-20 pb-10 min-h-screen">
        <section className="my-6">
          <Filters />
        </section>
        <section className="cards-section">
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

      {/* Scroll to Top Button */}
      <Button
        onClick={scrollToTop}
        className="fixed bottom-24 right-4 sm:right-6 z-20 glass bg-gray-500/30 backdrop-blur-xs text-gray-100 rounded-full "
        variant="outline"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m4.5 18.75 7.5-7.5 7.5 7.5"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m4.5 12.75 7.5-7.5 7.5 7.5"
          />
        </svg>
      </Button>
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
