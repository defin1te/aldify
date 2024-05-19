import { auth, signIn } from "@/auth";
import { Albums } from "@/components/albums";
import { Artists } from "@/components/artists";
import { Search } from "@/components/search";
import { Songs } from "@/components/songs";

export default async function Home() {
  const session = await auth();

  return (
    <>
      <header className="mb-6 text-center">
        spotify clone by{" "}
        <a className="underline" href="https://github.com/defin1te/">
          aldiyar
        </a>
        <div className="mt-2">
          {session?.user ? (
            <h1 className="text-2xl font-extrabold">
              hello, {session.user.name} 👋
            </h1>
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn();
              }}
            >
              <button
                type="submit"
                className="border px-2 rounded-md hover:bg-gray-800 hover:duration-300"
              >
                sign in
              </button>
            </form>
          )}
        </div>
      </header>

      <div className="space-y-6">
        <Artists />
        <Albums />
        <Songs />
      </div>
    </>
  );
}
