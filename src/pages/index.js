
import Link from 'next/link';

export default function Home({ posts }) {
  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-2 text-3xl font-bold text-slate-800">
          Katalog Artikel SSG
        </h1>

        <p className="mb-6 text-slate-600">
          Kelompok 3 | Belajar Static Site Generation
        </p>

        <div className="grid gap-5 md:grid-cols-2">
          {posts.map((post) => (
            <div
              key={post.id}
              className="rounded-xl bg-white p-5 shadow transition hover:shadow-lg"
            >
              <span className="text-xs font-semibold uppercase text-indigo-600">
                Artikel #{post.id}
              </span>

              <h2 className="mb-2 mt-2 text-xl font-bold capitalize text-slate-800">
                {post.title}
              </h2>

              <p className="mb-4 text-sm leading-relaxed text-slate-600">
                {post.body}
              </p>

              <Link
                href={`/posts/${post.id}`}
                className="inline-block rounded-lg bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-700"
              >
                Baca Selengkapnya →
              </Link>
            </div>
          ))}
        </div>

        <footer className="mt-10 border-t border-slate-300 pt-5 text-center text-sm text-slate-500">
          © 2026 Kelompok 3 | Praktikum Next.js SSG
        </footer>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch(
    'https://jsonplaceholder.typicode.com/posts?_limit=12'
  );

  if (!res.ok) {
    throw new Error('Gagal mengambil data artikel');
  }

  const posts = await res.json();

  return {
    props: {
      posts,
    },
  };
}
