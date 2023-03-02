/** [Component] 로그인 버튼 */
export function LoginButton({ children }: { children: string }): JSX.Element {
  return (
    <button className="block bg-blue-500 border-0 cursor-pointer duration-300 rounded-md px-4 py-2 text-white w-full hover:bg-blue-600 transition-colors" type="submit">{children}</button>
  );
}