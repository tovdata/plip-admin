import { useMemo } from "react";

/** [Component] 설명 단락 */
export function DescriptionParagraph({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <p className="m-0 text-gray-500 text-xs">{children}</p>
  );
}
/** [Component] 통계 숫자 단락 */
export function StatisticCountParagraph({ children, className }: { children: React.ReactNode, className?: string }): JSX.Element {
  // 클래스
  const combineClassName: string = useMemo(() => {
    const cn: string = "flex-auto font-semibold my-0 text-xl text-right text-blue-800";
    return className ? `${cn} ${className}` : cn;
  }, [className]);

  return (
    <p className={combineClassName}>{children}</p>
  );
}