import { useMemo } from "react";
// Utilities
import { isEmptyString } from "@/utilities/common";

/** [Component] 동의서 유형 태그 */
export function ConsentTypeTag({ type }: { type: string }): JSX.Element {
  // 동의서 유형에 따른 내용
  const content: string = useMemo(() => {
    switch (type) {
      case "mai":
        return "마케팅"
      case "pi":
        return "개인정보";
      case "si":
        return "민감정보";
      case "tpi":
        return "제3자 제공";
      case "uii":
        return "고유식별정보";
      default:
        return "";
    }
  }, [type]);

  return (
    <span className="bg-gray-200 px-1 py-0.5 rounded-sm text-gray-800 text-xs break-keep">{content}</span>
  );
}
/** [Component] 마지막 로그인 시간 비교 태그 */
export function LastSigninTag({ children }: { children?: string }): JSX.Element {
  return isEmptyString(children) ? (
    <span className="bg-gray-200 px-1 py-0.5 rounded-sm text-gray-800 text-2xs">None</span>
  ) : (
    <span className="bg-green-600 px-1 py-0.5 rounded-sm text-white text-2xs">{children}</span>
  )
}