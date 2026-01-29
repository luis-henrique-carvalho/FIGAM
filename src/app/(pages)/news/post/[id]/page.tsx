import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import * as prismic from "@prismicio/client";
import { PrismicRichText, JSXMapSerializer } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { formactDate } from "@/helpers/formactDate";

type Params = { id: string };

/**
 * Generate static paths for all posts
 */
export async function generateStaticParams() {
    const client = createClient();
    const posts = await client.getAllByType("post");

    return posts.map((post) => ({
        id: post.uid,
    }));
}

/**
 * Generate metadata for the post page
 */
export async function generateMetadata({
    params,
}: {
    params: Params;
}): Promise<Metadata> {
    const client = createClient();
    const post = await client
        .getByUID("post", params.id)
        .catch(() => notFound());

    return {
        title: prismic.asText(post.data.title),
        description: prismic.asText(post.data.description).substring(0, 160),
        openGraph: {
            title: prismic.asText(post.data.title),
            images: [
                {
                    url: post.data.cover.url || "",
                },
            ],
        },
    };
}

/**
 * Post detail page component
 * Blog-style layout with focus on readability
 */
export default async function PostPage({ params }: { params: Params }) {
    const client = createClient();
    const post = await client
        .getByUID("post", params.id)
        .catch(() => notFound());

    const postDate = formactDate(post.last_publication_date);

    // Author defaults
    const authorName = post.data.author_name || "FIGAM";
    const authorTitle = post.data.author_title || "Fundação Iraci Gama de Cultura";
    const authorPhoto = post.data.author_photo?.url || "/Figam.jpeg"; // Você pode ajustar o caminho da logo padrão

    // Rich text components with blog-style formatting for better readability
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
            <h6 className="text-sm md:text-base lg:text-lg font-medium text-gray-600 italic mt-4 mb-2">
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
                    width={800}
                    height={600}
                    className="w-full rounded-lg shadow-lg"
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
                    {/* Date Badge */}
                    <div className="mb-4">
                        <time className="inline-block bg-primary text-white px-4 py-1.5 text-xs font-bold uppercase tracking-wider">
                            {postDate}
                        </time>
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight mb-6">
                        {prismic.asText(post.data.title)}
                    </h1>

                    {/* Excerpt/Description */}
                    <div className="text-lg md:text-xl text-gray-600 font-normal mb-8 leading-relaxed">
                        {prismic.asText(post.data.description).substring(0, 200)}...
                    </div>

                    {/* Featured Image */}
                    <figure className="w-full mb-6">
                        <Image
                            src={post.data.cover.url as string}
                            alt={post.data.cover.alt as string}
                            width={1200}
                            height={800}
                            className="w-full h-auto object-cover rounded-sm"
                        />
                        {post.data.cover.alt && (
                            <figcaption className="text-sm text-gray-500 mt-3 leading-relaxed">
                                {post.data.cover.alt}
                            </figcaption>
                        )}
                    </figure>

                    {/* Author Section */}
                    <div className="flex items-center gap-4 py-6 border-y border-gray-200">
                        <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                            <Image
                                src={authorPhoto}
                                alt={authorName}
                                width={80}
                                height={80}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <p className="text-xs md:text-sm text-gray-500 uppercase tracking-wider">
                                Escrito por
                            </p>
                            <h3 className="text-base md:text-lg font-bold text-gray-900">
                                {authorName}
                            </h3>
                            <p className="text-sm md:text-base text-gray-600">
                                {authorTitle}
                            </p>
                        </div>
                    </div>
                </div>
            </header>

            {/* Content Section */}
            <main className="max-w-5xl mx-auto px-4 lg:px-8 mb-16">
                {/* Rich Text Content with improved readability */}
                <div className="prose prose-lg max-w-none">
                    <PrismicRichText field={post.data.description} components={components} />
                </div>
            </main>
        </article>
    );
}
