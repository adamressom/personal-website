import Link from "next/link";
import { notFound } from "next/navigation";
import BlogImageLightbox from "@/components/BlogImageLightbox";
import { getPost, posts } from "@/lib/blog-posts";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) return {};

  return {
    title: `${post.title} | adamressom.dev`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) notFound();

  return (
    <main className="min-h-screen bg-[#eef4ec] px-4 pb-20 pt-16 text-[#20221f]">
      <article className="mx-auto max-w-2xl">
        <Link
          href="/blogs"
          className="mono-font text-[10px] font-semibold lowercase tracking-[0.16em] text-[#386f8f] hover:text-[#c45f3a]"
        >
          back to blogs
        </Link>

        <header className="mt-8">
          <p className="mono-font text-[10px] lowercase text-[#386f8f]">
            {post.tag} / {post.readTime} / {post.date}
          </p>
          {post.titleImage ? (
            <div className="mt-3 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div className="min-w-0 flex-1">
                <h1 className="text-3xl font-semibold leading-tight tracking-[-0.03em] sm:text-4xl">
                  {post.title}
                </h1>
                <p className="mt-4 max-w-xl text-sm leading-7 text-[#4f5b53]">
                  {post.excerpt}
                </p>
              </div>
              <div className="shrink-0 self-start rounded-[22px] bg-[#fbfaf3] p-2 shadow-[0_18px_50px_rgba(57,70,61,0.12)] sm:self-end">
                <BlogImageLightbox
                  src={post.titleImage.src}
                  alt={post.titleImage.alt}
                  orientation={post.titleImage.orientation}
                  variant="title"
                />
              </div>
            </div>
          ) : (
            <>
              <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-[-0.03em] sm:text-4xl">
                {post.title}
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-7 text-[#4f5b53]">
                {post.excerpt}
              </p>
            </>
          )}
        </header>

        <div className="mt-8 rounded-[24px] border border-[#d4ded2] bg-[#fbfaf3]/75 p-5 sm:p-7">
          <div className="space-y-5 text-sm leading-7 text-[#4f5b53]">
            {post.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {post.image && (
              <BlogImageLightbox
                src={post.image.src}
                alt={post.image.alt}
                orientation={post.image.orientation}
              />
            )}
          </div>
        </div>
      </article>
    </main>
  );
}
