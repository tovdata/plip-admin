/** [Component] 설명 그룹 라벨 */
export function DescriptionGroupLabel({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <label className="font-bold text-gray-600 text-xs">{children}</label>
  );
}
/** [Component] 입력 그룹 라벨 */
export function InputGroupLabel({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <p className="inline-block m-0 text-gray-700 text-sm">{children}</p>
  );
}
/** [Component] 검색 그룹 라벨 */
export function SearchGroupLabel({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <p className="block mb-1 mt-0 text-gray-700 text-sm">{children}</p>
  );
}