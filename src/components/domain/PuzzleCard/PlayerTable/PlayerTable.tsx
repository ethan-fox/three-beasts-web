import type { PlayerTableProps } from "@/model/component/PlayerTableProps";

const PlayerTable = ({ players }: PlayerTableProps) => {
  return (
    <div className="flex flex-col gap-2">
      {players.map((player, index) => (
        <div key={index} className="flex justify-between items-center">
          <span className="font-medium">
            {player.name}
            {player.platoon && (
              <span className="text-sm text-gray-500 ml-2">(Platoon)</span>
            )}
          </span>
          {player.value && <span className="text-gray-700">{player.value}</span>}
        </div>
      ))}
    </div>
  );
};

export default PlayerTable;
