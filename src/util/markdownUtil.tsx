import type { ReactNode, JSX } from "react";

export interface MarkdownSection {
  title: string;
  content: string;
}

export interface ParsedMarkdown {
  preamble: string;
  sections: MarkdownSection[];
}

export const parseMarkdownSections = (markdown: string): ParsedMarkdown => {
  const sections: MarkdownSection[] = [];
  const lines = markdown.split("\n");

  let preambleLines: string[] = [];
  let currentTitle = "";
  let currentContent: string[] = [];
  let foundFirstSection = false;

  for (const line of lines) {
    if (line.startsWith("# ") && !line.startsWith("## ")) {
      continue;
    }

    if (line.startsWith("## ")) {
      if (currentTitle) {
        sections.push({
          title: currentTitle,
          content: currentContent.join("\n").trim(),
        });
      }
      currentTitle = line.replace("## ", "").trim();
      currentContent = [];
      foundFirstSection = true;
    } else if (foundFirstSection) {
      currentContent.push(line);
    } else {
      preambleLines.push(line);
    }
  }

  if (currentTitle) {
    sections.push({
      title: currentTitle,
      content: currentContent.join("\n").trim(),
    });
  }

  return {
    preamble: preambleLines.join("\n").trim(),
    sections,
  };
};

interface ChildrenProps {
  children?: ReactNode;
}

export const createMarkdownComponents = (size: "sm" | "base"): Record<string, (props: ChildrenProps) => JSX.Element | null> => {
  const textClass = size === "sm" ? "text-sm" : "text-base";
  const spacingClass = size === "sm" ? "mb-3" : "mb-4";
  const listSpacingClass = size === "sm" ? "space-y-1" : "space-y-2";
  const listMarginClass = size === "sm" ? "ml-2" : "ml-4";

  return {
    h1: () => null,
    h2: () => null,
    p: ({ children }: ChildrenProps) => (
      <p className={`${textClass} ${spacingClass}`}>{children}</p>
    ),
    strong: ({ children }: ChildrenProps) => (
      <strong className="font-bold">{children}</strong>
    ),
    em: ({ children }: ChildrenProps) => (
      <em className="italic">{children}</em>
    ),
    ol: ({ children }: ChildrenProps) => (
      <ol className={`list-decimal list-inside ${listSpacingClass} ${spacingClass} ${listMarginClass} ${textClass}`}>
        {children}
      </ol>
    ),
    ul: ({ children }: ChildrenProps) => (
      <ul className={`list-disc list-inside ${listSpacingClass} ${spacingClass} ${listMarginClass} ${textClass}`}>
        {children}
      </ul>
    ),
    li: ({ children }: ChildrenProps) => (
      <li className={textClass}>{children}</li>
    ),
  };
};
