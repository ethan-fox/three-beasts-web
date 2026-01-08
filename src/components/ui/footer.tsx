import { cn } from "@/lib/utils";

interface FooterProps {
  className?: string;
}

const Footer = ({ className }: FooterProps) => {
  return (
    <footer className={cn("py-8 text-center text-sm text-muted-foreground", className)}>
      <p className="mb-2">
        Baseball data is sourced from the{" "}
        <a
          href="https://sabr.org/lahman-database"
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground underline hover:text-primary transition-colors"
        >
          Sean Lahman Baseball Database
        </a>
        , copyright 1996-2025 by SABR. Licensed under{" "}
        <a
          href="https://creativecommons.org/licenses/by-sa/3.0/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground underline hover:text-primary transition-colors"
        >
          CC BY-SA 3.0
        </a>
        .
      </p>
      <p className="mb-2">
        Football, basketball, and NCAA basketball data is sourced from{" "}
        <a
          href="https://www.sports-reference.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground underline hover:text-primary transition-colors"
        >
          Sports Reference LLC
        </a>
        .
      </p>
      <p>
        This website is an{" "}
        <a
          href="https://ethan-builds.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground underline hover:text-primary transition-colors"
        >
          Ethan build
        </a>
        . Copyright &copy; 2025 Ethan Fox LLC. All rights reserved.
      </p>
    </footer>
  );
};

export { Footer };
