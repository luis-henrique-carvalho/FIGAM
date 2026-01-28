import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SliceZone } from "@prismicio/react";
import * as prismic from "@prismicio/client";
import Link from "next/link";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { formactDate } from "@/helpers/formactDate";

const ITEMS_PER_PAGE = 9;

/**
 * Generate metadata for the Visits page
 */
export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client
    .getByUID("visits_page", "visits_page_1")
    .catch(() => notFound());

  return {
    title: page.data.meta_title || prismic.asText(page.data.visits_title),
    description:
      page.data.meta_description ||
      prismic.asText(page.data.visits_subtitle),
    openGraph: {
      title:
        page.data.meta_title || prismic.asText(page.data.visits_title),
      images: [
        {
          url: page.data.meta_image.url || "",
        },
      ],
    },
  };
}

/**
 * Visits page component
 */
export default async function VisitsPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const client = createClient();
  const page = await client
    .getByUID("visits_page", "visits_page_1")
    .catch(() => notFound());

  // Get current page from query params
  const currentPage = Number(searchParams.page) || 1;

  // Fetch visits with pagination
  const visitsResponse = await client.getByType("visit_card", {
    page: currentPage,
    pageSize: ITEMS_PER_PAGE,
    orderings: [
      { field: "my.visit_card.visit_date", direction: "desc" },
    ],
  });

  const visits = visitsResponse.results;
  const totalPages = visitsResponse.total_pages;

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Header */}
      <div className="flex flex-col gap-3">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-gray-900">
          {prismic.asText(page.data.visits_title)}
        </h1>
        <p className="text-center text-gray-600 text-base md:text-lg">
          {prismic.asText(page.data.visits_subtitle)}
        </p>
      </div>

      {/* Slice Zone */}
      <SliceZone
        slices={page.data.slices}
        components={components}
        context={{ visits }}
      />

      {/* Visits Grid */}
      <section className="w-full">
        {visits.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">
              Nenhuma visita disponível no momento.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-8">
            {visits.map((visit) => {
              const visitDate = formactDate(visit.data.visit_date);
              const title = prismic.asText(visit.data.visit_title);
              const description = prismic.asText(visit.data.visit_description);

              return (
                <Link
                  key={visit.uid}
                  href={`/visits/${visit.uid}`}
                  className="group flex flex-col bg-white shadow-md hover:shadow-2xl rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-2"
                >
                  {/* Image */}
                  {visit.data.visit_image.url && (
                    <div className="relative w-full h-48 sm:h-52 md:h-56 lg:h-64 overflow-hidden bg-gray-200">
                      <img
                        src={visit.data.visit_image.url as string}
                        alt={visit.data.visit_image.alt as string || title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  )}

                  {/* Content */}
                  <div className="flex flex-col flex-grow p-4 md:p-5 gap-3">
                    {/* Institution Badge */}
                    <div className="inline-flex items-center gap-2 text-xs md:text-sm font-medium text-primary bg-primary/10 rounded-full px-3 py-1 w-fit">
                      <svg
                        className="w-3 h-3 md:w-4 md:h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10.5 1.5H3.75A2.25 2.25 0 001.5 3.75v12.5A2.25 2.25 0 003.75 18.5h12.5a2.25 2.25 0 002.25-2.25V9.5" />
                        <path d="M6.5 8h7M6.5 11h7M6.5 14h3" stroke="currentColor" strokeWidth="1.5" fill="none" />
                      </svg>
                      {visit.data.visit_institution || "Visita"}
                    </div>

                    {/* Title */}
                    <h3 className="text-base md:text-lg lg:text-xl font-semibold text-gray-900 line-clamp-2 leading-tight group-hover:text-primary transition-colors duration-200">
                      {title || "Sem título"}
                    </h3>

                    {/* Description */}
                    <p className="text-sm md:text-base text-gray-600 line-clamp-3 flex-grow leading-relaxed">
                      {description.substring(0, 150) || ""}...
                    </p>

                    {/* Footer with Date */}
                    <div className="flex items-center justify-between pt-3 mt-auto border-t border-gray-200">
                      <span className="text-xs md:text-sm text-gray-500 font-medium">
                        {visitDate}
                      </span>
                      <span className="text-primary font-semibold text-sm group-hover:translate-x-1 transition-transform">
                        Saiba mais →
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>

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
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (pageNum) => (
                <Link
                  key={pageNum}
                  href={`?page=${pageNum}`}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    pageNum === currentPage
                      ? "bg-primary text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {pageNum}
                </Link>
              )
            )}
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
