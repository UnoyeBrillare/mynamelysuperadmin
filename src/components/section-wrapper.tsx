import type { ReactNode } from "react";

export function SectionWrapper({
  children,
  title,
  rightElement,
}: {
  children: ReactNode | ReactNode[];
  title?: string;
  rightElement?: ReactNode;
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex mb-4 items-center gap-3">
        <p className="font-bold text-md">{title}</p>
        <div className="border-b flex-1" />
        {rightElement}
      </div>
      {children}
    </div>
  );
}
