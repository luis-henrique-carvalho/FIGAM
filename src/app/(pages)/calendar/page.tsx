import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SliceZone } from "@prismicio/react";
import * as prismic from "@prismicio/client";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

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
export default async function CalendarPage() {
    const client = createClient();
    const page = await client
        .getByUID("calendar", "calendar_page_1")
        .catch(() => notFound());

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

            <SliceZone slices={page.data.slices} components={components} />
        </div>
    );
}
