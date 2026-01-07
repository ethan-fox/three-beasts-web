import { cn } from "@/lib/utils";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

const PageContainer = ({ children, className }: PageContainerProps) => {
  return (
    <div
      className={cn(
        "max-w-[clamp(56rem,80vw,90rem)] mx-auto md:py-8 md:px-4",
        className
      )}
    >
      {children}
    </div>
  );
};

export default PageContainer;
