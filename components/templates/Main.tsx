// Component
import { SearchGroup } from "@/components/molecules/Group";
import { Box } from "../molecules/Box";

export function Main(): JSX.Element {
  return (
    <div className="flex h-screen items-center justify-center w-screen">
      <div className="md:w-96 w-full">
        <SearchGroup />
      </div>
    </div>
  );
}