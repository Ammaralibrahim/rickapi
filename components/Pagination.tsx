'use client';

import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { ApiResponse } from '../lib/types';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

interface PaginationProps {
  info: ApiResponse['info'];
}

export function Pagination({ info }: PaginationProps) {
  const router = useRouter();
  const currentPage = parseInt((router.query.page as string) || '1', 10);
  const totalPages = info.pages;

  // State to track if we're in mobile mode
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile(); // Initial check
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const goToPage = (page: number) => {
    router.push({
      pathname: '/characters',
      query: { ...router.query, page: page.toString() },
    });
  };

  // Show 3 pages in mobile, 5 pages in desktop
  const pagesToShow = isMobile ? 3 : 5;

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1).slice(
    Math.max(0, currentPage - Math.floor(pagesToShow / 2)),
    Math.min(totalPages, currentPage + Math.ceil(pagesToShow / 2))
  );

  return (
    <div className="flex items-center justify-center gap-2 py-2 text-gray-100 w-full">
      {/* Previous Button */}
      <Button
        onClick={() => goToPage(currentPage - 1)}
        disabled={!info.prev}
        variant="outline"
        className="min-w-[100px] glass text-gray-100 border-gray-700 hover:bg-gray-800/20 transition-all duration-300 glow-hover"
      >
        Previous
      </Button>

      {/* Page Numbers */}
      <div className="flex flex-wrap items-center justify-center gap-2 mx-2">
        {pageNumbers.map((page) => (
          <Button
            key={page}
            onClick={() => goToPage(page)}
            variant={page === currentPage ? 'default' : 'outline'}
            className={cn(
              'w-10 h-10 glass transition-all duration-300',
              page === currentPage
                ? 'bg-blue-600 text-gray-200 hover:bg-blue-700 shadow-sm'
                : 'text-gray-100 border-gray-700 hover:bg-gray-800/20 glow-hover'
            )}
          >
            {page}
          </Button>
        ))}
      </div>

      {/* Next Button */}
      <Button
        onClick={() => goToPage(currentPage + 1)}
        disabled={!info.next}
        variant="outline"
        className="min-w-[100px] glass text-gray-100 border-gray-700 hover:bg-gray-800/20 transition-all duration-300 glow-hover"
      >
        Next
      </Button>
    </div>
  );
}
