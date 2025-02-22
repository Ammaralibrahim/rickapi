'use client';

import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { ApiResponse } from '../lib/types';
import { cn } from '@/lib/utils';

interface PaginationProps {
  info: ApiResponse['info'];
}

export function Pagination({ info }: PaginationProps) {
  const router = useRouter();
  const currentPage = parseInt((router.query.page as string) || '1', 10);
  const totalPages = info.pages;

  const goToPage = (page: number) => {
    router.push({
      pathname: '/characters',
      query: { ...router.query, page: page.toString() },
    });
  };

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1).slice(
    Math.max(0, currentPage - 3),
    Math.min(totalPages, currentPage + 2)
  );

  return (
    <div className="flex items-center justify-between text-gray-300 space-x-3">
      <Button
        onClick={() => goToPage(currentPage - 1)}
        disabled={!info.prev}
        variant="outline"
        className="glass text-gray-300 border-gray-700 hover:bg-gray-800/20 transition-all duration-300 glow-hover"
      >
        Previous
      </Button>
      <div className="flex space-x-2">
        {pageNumbers.map((page) => (
          <Button
            key={page}
            onClick={() => goToPage(page)}
            variant={page === currentPage ? 'default' : 'outline'}
            className={cn(
              'glass transition-all duration-300',
              page === currentPage
                ? 'bg-blue-600 text-gray-200 hover:bg-blue-700 shadow-sm'
                : 'text-gray-300 border-gray-700 hover:bg-gray-800/20 glow-hover'
            )}
          >
            {page}
          </Button>
        ))}
      </div>
      <Button
        onClick={() => goToPage(currentPage + 1)}
        disabled={!info.next}
        variant="outline"
        className="glass text-gray-300 border-gray-700 hover:bg-gray-800/20 transition-all duration-300 glow-hover"
      >
        Next
      </Button>
    </div>
  );
}
