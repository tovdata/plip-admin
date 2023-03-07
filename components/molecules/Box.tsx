import { useMemo } from "react";
// Component
import { StatisticCountParagraph } from "@/components/atoms/Paragraph";
import { FormBoxTitle } from "@/components/atoms/Title";

/** [Component] 박스 */
export function Box({ children, className }: { children?: React.ReactNode, className?: string }): JSX.Element {
  // 클래스
  const combineClassName: string = useMemo(() => {
    const cn: string = "bg-white overflow-hidden rounded-md shadow w-full";
    return className ? `${cn} ${className}` : cn;
  }, [className]);

  return (
    <div className={combineClassName}>{children}</div>
  );
}
/** [Component] 폼(Form) 박스 */
export function FormBox({ children, className, extra, title }: { children?: React.ReactNode, className?: string, extra?: React.ReactNode, title: string }): JSX.Element {
  return (
    <Box className={className}>
      <div className="flex items-center justify-between px-6 py-5">
        <FormBoxTitle>{title}</FormBoxTitle>
        <>{extra}</>
      </div>
      <div>{children}</div>
    </Box>
  );
}
/** [Component] 개인정보 관리(PIM) 데이터 통계 박스 */
export function PimStatisticsBox({ count, containLink, link, title }: { count?: number, containLink?: boolean, link?: number, inline?: boolean, title: string }): JSX.Element {
  return (
    <Box className="mb-4 last:mb-0">
      <div className="flex flex-wrap items-center justify-between px-6 py-4">
        {containLink ? (
          <>
            <div className="flex items-end">
              <FormBoxTitle>
                <>{title}</>
                <small className="font-light text-gray-500 text-xs"> / 링크 수</small>
              </FormBoxTitle>
            </div>
            <StatisticCountParagraph className="ml-6">
              <>{count}</>
              <small className="font-light text-gray-500 text-sm">{` / ${link}`}</small>
            </StatisticCountParagraph>
          </>
        ) : (
          <>
            <FormBoxTitle>{title}</FormBoxTitle>
            <StatisticCountParagraph className="ml-6">{count}</StatisticCountParagraph>
          </>
        )}
      </div>
    </Box>
  );
}
/** [Component] 통계 박스 */
export function StatisticsBox({ count, title }: { count?: number, title: string }): JSX.Element {
  return (
    <Box>
      <div className="px-6 py-4">
        <FormBoxTitle>{title}</FormBoxTitle>
        <StatisticCountParagraph className="">{count ? count : 0}</StatisticCountParagraph>
      </div>
    </Box>
  );
}