import { getVariantConfig } from "@/util/variantUtil";

interface CategoryHeaderProps {
  variant: string;
  day_number: number | null;
}

const CategoryHeader = ({ variant, day_number }: CategoryHeaderProps) => {
  const config = getVariantConfig(variant);

  return (
    <div className="text-center mb-6">
      <div className="flex items-center justify-center gap-2 mb-1">
        <span className="text-2xl">{config.emoji}</span>
        <h2 className="text-xl font-semibold">
          {config.displayName}{day_number && ` #${day_number}`}
        </h2>
      </div>
      {config.subtext && (
        <p className="text-sm text-muted-foreground">{config.subtext}</p>
      )}
    </div>
  );
};

export default CategoryHeader;
