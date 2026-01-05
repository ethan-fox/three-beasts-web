import type { ContentItemView } from "@/model/view/ContentItemView";
import { formatValue } from "@/util/statFormatter";

interface ContentTableProps {
  content: ContentItemView[];
}

const ContentTable = ({ content }: ContentTableProps) => {
  return (
    <div className="flex flex-col gap-2">
      {content.map((item, index) => (
        <div key={index} className="flex justify-between items-center">
          <span className="font-medium">
            {item.name}
            {item.tags.includes("platoon") && (
              <span className="text-sm text-muted-foreground ml-2">(Platoon)</span>
            )}
          </span>
          {item.value !== null && (
            <span className="font-bold text-foreground">
              {formatValue(item.value)}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default ContentTable;
