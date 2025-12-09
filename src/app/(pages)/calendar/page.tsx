import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SliceZone } from "@prismicio/react";
import * as prismic from "@prismicio/client";
import Link from "next/link";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

const ITEMS_PER_PAGE = 6;

/**
 * Generate metadata for the Calendar page
 */
export async function generateMetadata(): Promise<Metadata> {
    const client = createClient();
    const page = await client
        .getByUID("calendar", "calendar_page_1")
        .catch(() => notFound());

    return {
        title: prismic.asText(page.data.calendar_tilte),
        description: page.data.meta_description || prismic.asText(page.data.calendar_subtitle),
        openGraph: {
            title: page.data.meta_title || prismic.asText(page.data.calendar_tilte),
            images: [
                {
                    url: page.data.meta_image.url || "",
                },
            ],
        },
    };
}

/**
 * Calendar page component
 */
export default async function CalendarPage({
    searchParams,
}: {
    searchParams: { page?: string };
}) {
    const client = createClient();
    const page = await client
        .getByUID("calendar", "calendar_page_1")
        .catch(() => notFound());

    // Get current page from query params
    const currentPage = Number(searchParams.page) || 1;

    // Fetch events with pagination
    const eventsResponse = await client.getByType("events_card", {
        page: currentPage,
        pageSize: ITEMS_PER_PAGE,
        orderings: [
            { field: "my.events_card.event_date", direction: "desc" },
        ],
    });

    const events = eventsResponse.results;
    const totalPages = eventsResponse.total_pages;

    return (
        <div className="flex flex-col gap-8 w-full">
            <div className="flex flex-col gap-3">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-gray-900">
                    {prismic.asText(page.data.calendar_tilte)}
                </h1>
                <p className="text-center text-gray-600 text-base md:text-lg">
                    {prismic.asText(page.data.calendar_subtitle)}
                </p>
            </div>

            <SliceZone
                slices={page.data.slices}
                components={components}
                context={{ events }}
            />

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-8">
                    {/* Previous Button */}
                    {currentPage > 1 && (
                        <Link
                            href={`?page=${currentPage - 1}`}
                            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/80 transition-colors"
                        >
                            Anterior
                        </Link>
                    )}

                    {/* Page Numbers */}
                    <div className="flex gap-2">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                            <Link
                                key={pageNum}
                                href={`?page=${pageNum}`}
                                className={`px-4 py-2 rounded-md transition-colors ${pageNum === currentPage
                                    ? "bg-primary text-white"
                                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                    }`}
                            >
                                {pageNum}
                            </Link>
                        ))}
                    </div>

                    {/* Next Button */}
                    {currentPage < totalPages && (
                        <Link
                            href={`?page=${currentPage + 1}`}
                            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/80 transition-colors"
                        >
                            Próxima
                        </Link>
                    )}
                </div>
            )}
        </div>
    );
}
