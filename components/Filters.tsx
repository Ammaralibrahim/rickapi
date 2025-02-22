'use client';

import { useRouter } from 'next/router';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';

export function Filters() {
  const router = useRouter();
  const { status, gender } = router.query;

  const statusOptions = ['alive', 'dead', 'unknown'];
  const genderOptions = ['male', 'female', 'genderless', 'unknown'];

  const updateFilter = (key: string, value: string) => {
    router.push({
      pathname: '/characters',
      query: { ...router.query, [key]: value, page: '1' },
    });
  };

  const resetFilters = () => {
    router.push({
      pathname: '/characters',
      query: { page: '1' },
    });
  };

  return (
    <div className="space-y-6 w-full max-w-md mx-auto">
      <h2 className="text-base sm:text-lg md:text-xl font-normal text-gray-200 tracking-wider text-center">
        Explore Characters
      </h2>
      <div className="space-y-4">
        <Select
          value={(status as string) || ''}
          onValueChange={(value) => updateFilter('status', value)}
        >
          <SelectTrigger className="w-full glass text-gray-300 border-gray-700 hover:bg-gray-800/20 transition-all duration-300 glow-hover">
            <SelectValue placeholder="Select Status" />
          </SelectTrigger>
          <SelectContent className="glass text-gray-300 border-gray-700">
            {statusOptions.map((opt) => (
              <SelectItem key={opt} value={opt}>
                {opt.charAt(0).toUpperCase() + opt.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={(gender as string) || ''}
          onValueChange={(value) => updateFilter('gender', value)}
        >
          <SelectTrigger className="w-full glass text-gray-300 border-gray-700 hover:bg-gray-800/20 transition-all duration-300 glow-hover">
            <SelectValue placeholder="Select Gender" />
          </SelectTrigger>
          <SelectContent className="glass text-gray-300 border-gray-700">
            {genderOptions.map((opt) => (
              <SelectItem key={opt} value={opt}>
                {opt.charAt(0).toUpperCase() + opt.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          onClick={resetFilters}
          variant="outline"
          className="w-full glass text-gray-300 border-gray-700 hover:bg-gray-800/20 transition-all duration-300 glow-hover"
        >
          Reset Filters
        </Button>
      </div>
    </div>
  );
}
