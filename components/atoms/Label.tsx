/** [Component] 입력 그룹 라벨 */
export function InputGroupLabel({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <p className="inline-block m-0 text-gray-700 text-sm">{children}</p>
  );
}