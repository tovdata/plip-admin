import { useCallback, useMemo } from "react";
// Component
import Link from "next/link";
import { LastSigninTag } from "@/components/atoms/Tag";
// Utilities
import { lastSignin, transformToDate } from "@/utilities/common";

/** [Component] 서비스 목록 아이템 */
export function ServiceListItem({ createAt, name, id }: { createAt: number, name: string, id: string }): JSX.Element {
  // 서비스 정보 URL
  const href: string = useMemo(() => `/service/${id}`, [id]);

  return (
    <Link className="border-solid border-0 border-b border-slate-200 cursor-pointer flex items-center justify-between last:border-b-0 px-6 py-3 text-black" href={href}>
      <p className="m-0">{name}</p>
      <p className="m-0 text-gray-500 text-xs">{transformToDate(createAt)}</p>
    </Link>
  );
}
/** [Component] 사용자 목록 아이템 */
export function UserListItem({ onClick, user }: { onClick: (value: any) => void, user: any }): JSX.Element {
  /** [Event handler] 사용자 선택 */
  const onSelect = useCallback((): void => onClick(user), [onClick, user])

  return (
    <div className="border-solid border-0 border-b border-slate-200 cursor-pointer flex items-center justify-between last:border-b-0 px-6 py-3" onClick={onSelect}>
      <div>
        <p className="m-0">{user.name}</p>
        <p className="m-0 text-gray-400 text-xs">{user.email}</p>
      </div>
      <div className="flex items-center">
        <LastSigninTag>{lastSignin(user.last_signin)}</LastSigninTag>
        <p className="ml-2 my-0 text-gray-500 text-xs">{transformToDate(user.affiliated_at)}</p>
      </div>
    </div>
  );
}