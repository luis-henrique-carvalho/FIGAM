import { Metadata } from "next";
import * as prismic from "@prismicio/client";
import { createClient } from "@/prismicio";
import Link from "next/link";
import { formactDate } from "@/helpers/formactDate";

/**
 * Generate metadata for the News page
 */
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Notícias - FIGAM",
    description: "Fique por dentro das últimas notícias e atualizações do FIGAM",
    openGraph: {
      title: "Notícias - FIGAM",
      description: "Fique por dentro das últimas notícias e atualizações do FIGAM",
    },
  };
}

/**
 * News page component - Lists all posts
 */
export default async function NewsPage() {
  const client = createClient();

  // Fetch all posts ordered by publication date
  const posts = await client.getAllByType("post", {
    orderings: [
      { field: "document.first_publication_date", direction: "desc" },
    ],
  });

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Header */}
      <div className="flex flex-col gap-3">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-gray-900">
          Notícias
        </h1>
        <p className="text-center text-gray-600 text-base md:text-lg">
          Fique por dentro das últimas atualizações
        </p>
      </div>

      {/* Posts Grid */}
      <section className="w-full">
        {posts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">
              Nenhuma notícia disponível no momento.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-8">
            {posts.map((post) => {
              const postDate = formactDate(post.last_publication_date);
              const title = prismic.asText(post.data.title);
              const description = prismic.asText(post.data.description);

              return (
                <Link
                  key={post.uid}
                  href={`/news/post/${post.uid}`}
                  className="group flex flex-col bg-white shadow-md hover:shadow-2xl rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-2"
                >
                  {/* Image */}
                  <div className="relative w-full h-48 sm:h-52 md:h-56 lg:h-64 overflow-hidden bg-gray-200">
                    <img
                      src={post.data.cover.url as string}
                      alt={post.data.cover.alt as string}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-grow p-4 md:p-5 gap-3">
                    {/* Title */}
                    <h3 className="text-base md:text-lg lg:text-xl font-semibold text-gray-900 line-clamp-2 leading-tight group-hover:text-primary transition-colors duration-200">
                      {title || "Sem título"}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-sm md:text-base text-gray-600 line-clamp-3 flex-grow leading-relaxed">
                      {description.substring(0, 150) || ""}...
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-3 mt-auto border-t border-gray-200">
                      <time className="text-xs md:text-sm text-gray-500 font-medium">
                        {postDate}
                      </time>
                      <span className="text-sm font-bold text-primary group-hover:text-primary/80 transition-colors flex items-center gap-1">
                        Ler mais
                        <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
