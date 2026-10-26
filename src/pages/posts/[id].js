
import Link from 'next/link';

export default function PostDetail({ post, author }) {
  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-2xl rounded-xl bg-white p-8 shadow-md">
        <Link
          href="/"
          className="mb-5 inline-block text-sm text-indigo-600 hover:underline"
        >
          ← Kembali ke Katalog
        </Link>

        <div className="mb-5 border-b border-slate-200 pb-4">
          <span className="rounded bg-indigo-100 px-3 py-1 text-xs text-indigo-700">
            ID Artikel: {post.id}
          </span>

          <h1 className="mt-3 text-3xl font-bold capitalize text-slate-800">
            {post.title}
          </h1>
        </div>

        <p className="text-lg leading-relaxed text-slate-700">
          {post.body}
        </p>

        <div className="mt-8 rounded-lg bg-indigo-50 p-5">
          <h2 className="mb-3 text-xl font-bold text-indigo-900">
            Informasi Penulis
          </h2>

          <p className="mb-2 text-slate-700">
            <strong>Nama:</strong> {author.name}
          </p>

          <p className="mb-2 text-slate-700">
            <strong>Email:</strong> {author.email}
          </p>

          <p className="text-slate-700">
            <strong>Perusahaan:</strong> {author.company.name}
          </p>
        </div>

        <footer className="mt-8 border-t border-slate-200 pt-4 text-center text-sm text-slate-500">
          © 2026 Kelompok 3 | Praktikum Next.js SSG
        </footer>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const res = await fetch(
    'https://jsonplaceholder.typicode.com/posts?_limit=12'
  );

  const posts = await res.json();

  const paths = posts.map((post) => ({
    params: { id: post.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postRes = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.id}`
  );

  if (!postRes.ok) {
    return { notFound: true };
  }

  const post = await postRes.json();

  const authorRes = await fetch(
    `https://jsonplaceholder.typicode.com/users/${post.userId}`
  );

  if (!authorRes.ok) {
    throw new Error('Gagal mengambil data penulis');
  }

  const author = await authorRes.json();

  return {
    props: {
      post,
      author,
    },
  };
}
