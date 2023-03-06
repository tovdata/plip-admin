import { FormBoxTitle } from "@/components/atoms/Title";

/** [Component] 박스 */
export function Box({ children }: { children?: React.ReactNode }): JSX.Element {
  return (
    <div className="bg-white overflow-hidden rounded-md shadow">{children}</div>
  );
}
/** [Component] 폼(Form) 박스 */
export function FormBox({ children, extra, title }: { children?: React.ReactNode, extra?: React.ReactNode, title: string }): JSX.Element {
  return (
    <Box>
      <div className="flex items-center justify-between px-6 py-5">
        <FormBoxTitle>{title}</FormBoxTitle>
        <>{extra}</>
      </div>
      <div>{children}</div>
    </Box>
  );
}
/** [Component] 통계 박스 */
export function StatisticsBox({ count, title }: { count?: number, title: string }): JSX.Element {
  return (
    <Box>
      <div className="px-6 pt-4">
        <FormBoxTitle>{title}</FormBoxTitle>
      </div>
      <p className="font-semibold m-0 px-6 py-4 text-2xl text-right text-blue-800">{count}</p>
    </Box>
  );
}