import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Character } from '../lib/types';

interface CharacterCardProps {
  character: Character;
}

export function CharacterCard({ character }: CharacterCardProps) {
  const statusClass =
    {
      Alive: 'status-alive',
      Dead: 'status-dead',
      unknown: 'status-unknown',
    }[character.status] || 'status-unknown';

  return (
    <Card className="glass overflow-hidden transition-all duration-400 hover:scale-102 hover:shadow-lg glow-hover tilt w-full max-w-sm mx-auto">
      <CardHeader className="p-3">
        <CardTitle className="text-sm sm:text-base md:text-lg font-normal text-gray-200 truncate tracking-wider">
          {character.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3">
        <img
          src={character.image}
          alt={character.name}
          className="w-full h-36 sm:h-44 md:h-52 object-cover  rounded-xl mb-3 shadow-sm transition-transform duration-300 hover:scale-101"
        />
        <div className="space-y-2 text-xs sm:text-sm text-gray-400">
          <p>
            <span className="font-normal text-gray-300">Status:</span>{' '}
            <span className={statusClass}>{character.status}</span>
          </p>
          <p>
            <span className="font-normal text-gray-300">Gender:</span>{' '}
            {character.gender}
          </p>
          <p>
            <span className="font-normal text-gray-300">Species:</span>{' '}
            {character.species}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
