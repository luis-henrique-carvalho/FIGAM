import React from "react";
import Link from "next/link";
import * as prismic from "@prismicio/client";
import CustomImage from "./CustomImage";
import { formactDate } from "@/helpers/formactDate";
import type { EventsCardDocument } from "../../prismicio-types";

type Props = {
  event: EventsCardDocument;
};

/**
 * EventCardItem component
 * Displays a single event card with image, date and title
 * Optimized for 1080x1080 or 1080x1350 images
 */
const EventCardItem = ({ event }: Props) => {
  const eventDate = formactDate(event.data.event_date);

  return (
    <Link
      href={`/calendar/${event.uid}`}
      className="group flex flex-col bg-white shadow-md hover:shadow-2xl rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-2"
    >
      {/* Image */}
      <div className="relative w-full h-48 sm:h-52 md:h-56 lg:h-64 overflow-hidden bg-gray-200">
        <img
          src={event.data.event_image.url as string}
          alt={event.data.event_image.alt as string}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-4 md:p-5 gap-3">
        {/* Date badge */}
        <div className="inline-block bg-primary text-white px-3 py-1 text-xs font-bold uppercase tracking-wider w-fit">
          {eventDate}
        </div>

        {/* Title */}
        <h3 className="text-base md:text-lg lg:text-xl font-semibold text-gray-900 line-clamp-2 leading-tight group-hover:text-primary transition-colors duration-200">
          {prismic.asText(event.data.event_title)}
        </h3>

        {/* Description */}
        <p className="text-sm md:text-base text-gray-600 line-clamp-3 flex-grow leading-relaxed">
          {prismic.asText(event.data.event_text).substring(0, 150) || ""}...
        </p>

        {/* Footer */}
        <div className="flex items-center justify-end pt-3 mt-auto border-t border-gray-200">
          <span className="text-sm font-bold text-primary group-hover:text-primary/80 transition-colors flex items-center gap-1">
            Saiba mais
            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
};

export default EventCardItem;
