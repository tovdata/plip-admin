/** [Component] 입력 그룹 라벨 */
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