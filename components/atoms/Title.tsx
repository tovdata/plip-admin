/** [Component] 폼(Form) 박스 제목 */
export function FormBoxTitle({ children }: { children: string }): JSX.Element {
  return (
    <h3 className="font-bold leading-6 m-0 text-base text-gray-900">{children}</h3>
  );
}