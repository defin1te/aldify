import { GoHome } from "@/components/go-home";
import { Search } from "@/components/search";

export default function Page() {
  return (
    <div>
      <div className="text-center mb-3">
        <GoHome />
      </div>
      <Search />
    </div>
  );
}
