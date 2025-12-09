
import AccountabillityCard from '@/components/AccountabillityCard';
import { createClient } from '@/prismicio';
import { PrismicRichText } from '@prismicio/react';
import Link from 'next/link';
import React from 'react'

const ITEMS_PER_PAGE = 9;

const Page = async ({
    searchParams,
}: {
    searchParams: { page?: string };
}) => {
    const prismic = createClient();
    const accountabilitiesPage = await prismic.getSingle("accountability");

    // Get current page from query params
    const currentPage = Number(searchParams.page) || 1;

    const accountabilitiesResponse = await prismic.getByType("accountability_card", {
        page: currentPage,
        pageSize: ITEMS_PER_PAGE,
        orderings: ["my.post.first_publication_date desc"]
    });

    const accountabilitiesCard = accountabilitiesResponse.results;
    const totalPages = accountabilitiesResponse.total_pages;

    return (
        <div>
            <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-4">
                    <h1 className='text-2xl font-bold text-center text-primary'>{accountabilitiesPage.data.accountability_title}</h1>
                    <PrismicRichText field={accountabilitiesPage.data.accountability_text} components={{
                        paragraph: ({ children }) => <p className='text-medium text-justify'>{children}</p>
                    }} />
                </div>

                <div className='flex flex-col sm:flex-row sm:flex-wrap gap-5 items-center justify-between'>
                    {accountabilitiesCard && accountabilitiesCard.map((card) => (
                        <AccountabillityCard card={card} key={card.id} />
                    ))}
                </div>

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
        </div>
    )
}

export default Page
