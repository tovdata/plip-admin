import { useMemo } from "react";

/** [Component] 컨테이너 */
export function Container({ children, className }: { children?: React.ReactNode, className?: string }) {
  // 클래스
  const combineClassName: string = useMemo(() => {
    const cn: string = "h-full m-auto max-w-7xl px-8 py-16 xl:px-0";
    return className ? `${cn} ${className}` : cn;
  }, [className]);

  return (
    <div className={combineClassName}>{children}</div>
  );
}