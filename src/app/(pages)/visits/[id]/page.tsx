import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import * as prismic from "@prismicio/client";
import { PrismicRichText, PrismicLink, JSXMapSerializer } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { formactDate } from "@/helpers/formactDate";

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
        description: prismic.asText(visit.data.visit_content).substring(0, 160),
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
 * visit detail page component
 * Blog-style layout with focus on image, title and rich text content
 */
export default async function visitPage({ params }: { params: Params }) {
    const client = createClient();
    const visit = await client
        .getByUID("visit_card", params.id)
        .catch(() => notFound());

    const visitDate = formactDate(visit.data.visit_date);
    // Rich text components with blog-style formatting
    const components: JSXMapSerializer = {
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
                <Image
                    src={node.url}
                    alt={node.alt || ""}
                    className="w-full rounded-lg shadow-lg"
                    width={800}
                    height={600}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 900px"
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
                <div className="max-w-5xl mx-auto lg:px-8">
                    {/* Category/Date Badge */}
                    <div className="mb-4">
                        <time className="inline-block bg-primary text-white px-4 py-1.5 text-xs font-bold uppercase tracking-wider">
                            {visitDate}
                        </time>
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight mb-6">
                        {prismic.asText(visit.data.visit_title)}
                    </h1>

                    {/* Subtitle/Description - First paragraph from rich text if available */}
                    <div className="text-lg md:text-xl text-gray-600 font-normal mb-8 leading-relaxed">
                        {prismic.asText(visit.data.visit_content).substring(0, 200)}...
                    </div>

                    {/* Featured Image */}
                    <figure className="w-full mb-6">
                        <Image
                            src={visit.data.visit_image.url as string}
                            alt={visit.data.visit_image.alt as string}
                            className="w-full h-auto object-cover rounded-sm"
                            width={1200}
                            height={675}
                            priority
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                        />
                        {visit.data.visit_image.alt && (
                            <figcaption className="text-sm text-gray-500 mt-3 leading-relaxed">
                                {visit.data.visit_image.alt}
                            </figcaption>
                        )}
                    </figure>

                </div>
            </header>

            {/* Content Section */}
            <main className="max-w-5xl mx-auto px-4 lg:px-8">
                {/* Rich Text Content */}
                <div className="prose prose-lg max-w-none">
                    <PrismicRichText field={visit.data.visit_content} components={components} />
                </div>


            </main>
        </article>
    );
}
