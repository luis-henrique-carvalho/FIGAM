import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import * as prismic from "@prismicio/client";
import { PrismicRichText, PrismicLink, JSXMapSerializer } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { formactDate } from "@/helpers/formactDate";

type Params = { id: string };

/**
 * Generate static paths for all events
 */
export async function generateStaticParams() {
    const client = createClient();
    const events = await client.getAllByType("events_card");

    return events.map((event) => ({
        id: event.uid,
    }));
}

/**
 * Generate metadata for the event page
 */
export async function generateMetadata({
    params,
}: {
    params: Params;
}): Promise<Metadata> {
    const client = createClient();
    const event = await client
        .getByUID("events_card", params.id)
        .catch(() => notFound());

    return {
        title: prismic.asText(event.data.event_title),
        description: prismic.asText(event.data.event_text).substring(0, 160),
        openGraph: {
            title: prismic.asText(event.data.event_title),
            images: [
                {
                    url: event.data.event_image.url || "",
                },
            ],
        },
    };
}

/**
 * Event detail page component
 * Blog-style layout with focus on image, title and rich text content
 */
export default async function EventPage({ params }: { params: Params }) {
    const client = createClient();
    const event = await client
        .getByUID("events_card", params.id)
        .catch(() => notFound());

    const eventDate = formactDate(event.data.event_date);

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

    const hasRegisterLink =
        event.data.register_link && event.data.register_link.link_type !== "Any";

    return (
        <article className="w-full">
            {/* Hero Section */}
            <header className="w-full mb-12 lg:mb-16">
                <div className="max-w-5xl mx-auto lg:px-8">
                    {/* Category/Date Badge */}
                    <div className="mb-4">
                        <time className="inline-block bg-primary text-white px-4 py-1.5 text-xs font-bold uppercase tracking-wider">
                            {eventDate}
                        </time>
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight mb-6">
                        {prismic.asText(event.data.event_title)}
                    </h1>

                    {/* Subtitle/Description - First paragraph from rich text if available */}
                    <div className="text-lg md:text-xl text-gray-600 font-normal mb-8 leading-relaxed">
                        {prismic.asText(event.data.event_text).substring(0, 200)}...
                    </div>

                    {/* Featured Image */}
                    <figure className="w-full mb-6">
                        <Image
                            src={event.data.event_image.url as string}
                            alt={event.data.event_image.alt as string}
                            width={1200}
                            height={800}
                            className="w-full h-auto object-cover rounded-sm"
                        />
                        {event.data.event_image.alt && (
                            <figcaption className="text-sm text-gray-500 mt-3 leading-relaxed">
                                {event.data.event_image.alt}
                            </figcaption>
                        )}
                    </figure>

                    {/* Register button */}
                    {hasRegisterLink && (
                        <div className="mb-8 pb-8 border-b border-gray-200">
                            <PrismicLink field={event.data.register_link}>
                                <button className="bg-primary hover:bg-primary/90 text-white font-bold text-base px-8 py-3 rounded-md shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2">
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    Inscreva-se neste evento
                                </button>
                            </PrismicLink>
                        </div>
                    )}
                </div>
            </header>

            {/* Content Section */}
            <main className="max-w-5xl mx-auto  lg:px-8">
                {/* Rich Text Content */}
                <div className="prose prose-lg max-w-none">
                    <PrismicRichText field={event.data.event_text} components={components} />
                </div>

                {/* Bottom Register CTA */}
                {hasRegisterLink && (
                    <div className="mt-12 mb-8 p-6 bg-gray-50 border-l-4 border-primary">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    Gostou do evento?
                                </h3>
                                <p className="text-gray-600">
                                    Não perca a oportunidade de participar!
                                </p>
                            </div>
                            <PrismicLink field={event.data.register_link}>
                                <button className="bg-primary hover:bg-primary/90 text-white font-bold px-8 py-3 rounded-md shadow-md hover:shadow-lg transition-all duration-300 whitespace-nowrap">
                                    Inscreva-se agora
                                </button>
                            </PrismicLink>
                        </div>
                    </div>
                )}
            </main>
        </article>
    );
}
