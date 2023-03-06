import { isEmptyValue } from "@/utilities/common";

/** [Component] 마지막 로그인 시간 비교 태그 */
export function LastSigninTag({ children }: { children?: string }): JSX.Element {
  return isEmptyValue(children) ? (
    <span className="bg-gray-200 px-1 py-0.5 rounded-sm text-gray-800 text-2xs">None</span>
  ) : (
    <span className="bg-green-600 px-1 py-0.5 rounded-sm text-white text-2xs">{children}</span>
  )
}