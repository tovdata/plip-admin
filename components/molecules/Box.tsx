import { useMemo } from "react";
// Component
import { Spin } from "antd";
import Link from "next/link";
import { StatisticCountParagraph } from "@/components/atoms/Paragraph";
import { FormBoxTitle } from "@/components/atoms/Title";

/** [Component] 박스 */
export function Box({ children, className, onClick }: { children?: React.ReactNode, className?: string, onClick?: () => void }): JSX.Element {
  // 클래스
  const combineClassName: string = useMemo(() => {
    let cn: string = "bg-white overflow-hidden rounded-md shadow w-full";
    // 추가적인 클래스 여부
    if (className) cn += ` ${className}`;
    // 클릭 여부
    if (onClick) cn += " cursor-pointer";
    // 반환
    return cn;
  }, [className, onClick]);

  return (
    <div className={combineClassName} onClick={onClick}>{children}</div>
  );
}
/** [Component] 폼(Form) 박스 */
export function FormBox({ children, className, description, extra, title }: { children?: React.ReactNode, className?: string, description?: React.ReactNode, extra?: React.ReactNode, title: string }): JSX.Element {
  return (
    <Box className={className}>
      <div className="px-6 py-5">
        <div className="flex items-center justify-between">
          <FormBoxTitle>{title}</FormBoxTitle>
          <>{extra}</>
        </div>
        {description ? (<p className="mb-0 mt-1 text-gray-400 text-sm">{description}</p>) : (<></>)}
      </div>
      <>{children}</>
    </Box>
  );
}
/** [Component] 개인정보 관리(PIM) 데이터 통계 박스 */
export function PimStatisticsBox({ count, containLink, extra, link, onClick, title }: { count?: number, containLink?: boolean, extra?: React.ReactNode, link?: number, onClick?: () => void, title: React.ReactNode }): JSX.Element {
  return (
    <Box className="mb-4 last:mb-0" onClick={onClick}>
      <div className="px-6 py-4">
        {containLink ? (
          <>
            <div className="flex items-end">
              <FormBoxTitle>
                <>{title}</>
                <small className="font-light text-gray-500 text-xs"> / 링크 수</small>
              </FormBoxTitle>
            </div>
            <StatisticCountParagraph className="ml-6">
              <>{count !== undefined ? count : 0}</>
              <small className="font-light text-gray-500 text-sm">{` / ${link !== undefined ? link : 0}`}</small>
            </StatisticCountParagraph>
          </>
        ) : (
          <>
            <FormBoxTitle>{title}</FormBoxTitle>
            <StatisticCountParagraph className="ml-6">
              <>{count !== undefined ? count : 0}</>
              <>{extra ? (<small className="font-light text-gray-500 text-sm"> {extra}</small>) : (<></>)}</>
            </StatisticCountParagraph>
          </>
        )}
      </div>
    </Box>
  );
}
/** [Component] 통계 박스 */
export function StatisticsBox({ count, href, loading, title }: { count?: number, href: string, loading?: boolean, title: string }): JSX.Element {
  return (
    <Box>
      <Link className="block cursor-pointer no-underline px-6 py-4" href={href} rel="noopener noreferrer">
        <Spin spinning={loading}>
          <FormBoxTitle>{title}</FormBoxTitle>
          <StatisticCountParagraph className="">{count !== undefined ? count : 0}</StatisticCountParagraph>
        </Spin>
      </Link>
    </Box>
  );
}