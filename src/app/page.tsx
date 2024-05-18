import { Albums } from "@/components/albums";
import { Artists } from "@/components/artists";
import { Songs } from "@/components/songs";

export default async function Home() {
  return (
    <main className="max-w-[60ch] m-auto min-h-screen">
      <header className="p-6 text-center">
        spotify clone by <span className="underline">aldiyar</span>
      </header>

      <div className="space-y-6">
        <Artists />
        <Albums />
        <Songs />
      </div>
    </main>
  );
}
