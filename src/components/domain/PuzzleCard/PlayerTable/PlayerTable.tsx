import type { PlayerTableProps } from "@/model/component/PlayerTableProps";
import { formatStatValue } from "@/util/statFormatter";

const PlayerTable = ({ players, stat }: PlayerTableProps) => {
  return (
    <div className="flex flex-col gap-2">
      {players.map((player, index) => (
        <div key={index} className="flex justify-between items-center">
          <span className="font-medium">
            {player.name}
            {player.platoon && (
              <span className="text-sm text-muted-foreground ml-2">(Platoon)</span>
            )}
          </span>
          {player.value && (
            <span className="font-bold text-foreground">
              {formatStatValue(player.value, stat)}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default PlayerTable;
