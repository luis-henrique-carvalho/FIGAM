import { Metadata } from "next";
import { notFound } from "next/navigation";
import * as prismic from "@prismicio/client";
import { PrismicRichText, SliceZone, JSXMapSerializer } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { formactDate } from "@/helpers/formactDate";
import { components } from "@/slices";

type Params = { id: string };

/**
 * Generate static paths for all visits
 */
export async function generateStaticParams() {
  const client = createClient();
  const visits = await client.getAllByType("visit_card");

  return visits.map((visit) => ({
    id: visit.uid,
  }));
}

/**
 * Generate metadata for the visit page
 */
export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const client = createClient();
  const visit = await client
    .getByUID("visit_card", params.id)
    .catch(() => notFound());

  return {
    title: prismic.asText(visit.data.visit_title),
    description: prismic.asText(visit.data.visit_description).substring(0, 160),
    openGraph: {
      title: prismic.asText(visit.data.visit_title),
      images: [
        {
          url: visit.data.visit_image.url || "",
        },
      ],
    },
  };
}

/**
 * Visit detail page component
 * Blog-style layout with focus on image, title, institution and rich text content
 */
export default async function VisitPage({ params }: { params: Params }) {
  const client = createClient();
  const visit = await client
    .getByUID("visit_card", params.id)
    .catch(() => notFound());

  const visitDate = formactDate(visit.data.visit_date);

  // Rich text components with blog-style formatting
  const components_rich_text: JSXMapSerializer = {
    heading1: ({ children }) => (
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mt-12 mb-6 leading-tight">
        {children}
      </h1>
    ),
    heading2: ({ children }) => (
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mt-10 mb-5 leading-tight">
        {children}
      </h2>
    ),
    heading3: ({ children }) => (
      <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-900 mt-8 mb-4 leading-snug">
        {children}
      </h3>
    ),
    heading4: ({ children }) => (
      <h4 className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-800 mt-6 mb-3">
        {children}
      </h4>
    ),
    heading5: ({ children }) => (
      <h5 className="text-base md:text-lg lg:text-xl font-semibold text-gray-800 mt-5 mb-3">
        {children}
      </h5>
    ),
    heading6: ({ children }) => (
      <h6 className="text-sm md:text-base lg:text-lg font-semibold text-gray-800 mt-4 mb-2">
        {children}
      </h6>
    ),
    paragraph: ({ children }) => (
      <p className="text-base md:text-lg leading-relaxed text-gray-700 mb-6 text-justify">
        {children}
      </p>
    ),
    image: ({ node }) => (
      <figure className="my-8 lg:my-12">
        <img
          src={node.url}
          alt={node.alt || ""}
          className="w-full rounded-lg shadow-lg"
          loading="lazy"
        />
        {node.alt && (
          <figcaption className="text-sm text-gray-500 text-center mt-3 italic">
            {node.alt}
          </figcaption>
        )}
      </figure>
    ),
    list: ({ children }) => (
      <ul className="list-disc list-inside space-y-2 mb-6 text-gray-700 ml-4">
        {children}
      </ul>
    ),
    oList: ({ children }) => (
      <ol className="list-decimal list-inside space-y-2 mb-6 text-gray-700 ml-4">
        {children}
      </ol>
    ),
    listItem: ({ children }) => (
      <li className="text-base md:text-lg leading-relaxed">{children}</li>
    ),
    oListItem: ({ children }) => (
      <li className="text-base md:text-lg leading-relaxed">{children}</li>
    ),
    strong: ({ children }) => (
      <strong className="font-bold text-gray-900">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic text-gray-800">{children}</em>
    ),
    hyperlink: ({ children, node }) => (
      <a
        href={node.data.url || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary hover:text-primary/80 underline transition-colors"
      >
        {children}
      </a>
    ),
    preformatted: ({ node }) => (
      <pre className="bg-gray-100 rounded-lg p-4 overflow-x-auto mb-6 text-sm md:text-base">
        <code>{node.text}</code>
      </pre>
    ),
  };

  return (
    <article className="w-full">
      {/* Hero Section */}
      <header className="w-full mb-12 lg:mb-16">
        <div className="max-w-5xl mx-auto px-4 lg:px-8">
          {/* Date Badge */}
          <div className="mb-4">
            <time className="inline-block bg-primary text-white px-4 py-1.5 text-xs font-bold uppercase tracking-wider">
              {visitDate}
            </time>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight mb-3">
            {prismic.asText(visit.data.visit_title)}
          </h1>

          {/* Institution Name */}
          <div className="inline-flex items-center gap-2 mb-6 text-lg md:text-xl font-semibold text-primary">
            <svg
              className="w-5 h-5 md:w-6 md:h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10.5 1.5H3.75A2.25 2.25 0 001.5 3.75v12.5A2.25 2.25 0 003.75 18.5h12.5a2.25 2.25 0 002.25-2.25V9.5" />
              <path d="M6.5 8h7M6.5 11h7M6.5 14h3" stroke="currentColor" strokeWidth="1.5" fill="none" />
            </svg>
            {visit.data.visit_institution || "Visita"}
          </div>

          {/* Subtitle/Description */}
          <div className="text-lg md:text-xl text-gray-600 font-normal mb-8 leading-relaxed">
            {prismic.asText(visit.data.visit_description).substring(0, 250)}...
          </div>

          {/* Featured Image */}
          {visit.data.visit_image.url && (
            <figure className="w-full mb-6">
              <img
                src={visit.data.visit_image.url as string}
                alt={visit.data.visit_image.alt as string || prismic.asText(visit.data.visit_title)}
                className="w-full h-auto object-cover rounded-sm"
              />
              {visit.data.visit_image.alt && (
                <figcaption className="text-sm text-gray-500 mt-3 leading-relaxed">
                  {visit.data.visit_image.alt}
                </figcaption>
              )}
            </figure>
          )}
        </div>
      </header>

      {/* Content Section */}
      <main className="max-w-5xl mx-auto px-4 lg:px-8">
        {/* Activities Section */}
        {visit.data.visit_activities && (
          <section className="mb-12 pb-12 border-b border-gray-200">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Atividades Realizadas
            </h2>
            <div className="prose prose-lg max-w-none">
              <PrismicRichText
                field={visit.data.visit_activities}
                components={components_rich_text}
              />
            </div>
          </section>
        )}

        {/* Main Content */}
        {visit.data.visit_content && (
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Detalhes da Visita
            </h2>
            <div className="prose prose-lg max-w-none">
              <PrismicRichText
                field={visit.data.visit_content}
                components={components_rich_text}
              />
            </div>
          </section>
        )}

        {/* Slice Zone */}
        {visit.data.slices && visit.data.slices.length > 0 && (
          <section className="mb-12">
            <SliceZone
              slices={visit.data.slices}
              components={components}
              context={{ visit }}
            />
          </section>
        )}
      </main>
    </article>
  );
}
