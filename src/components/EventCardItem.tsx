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
      className="group flex flex-col w-full lg:w-[48%] xl:w-[32%]"
    >
      <article className="flex flex-col w-full h-full bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-2">
        {/* Image container with aspect ratio */}
        <div className="relative w-full aspect-square overflow-hidden">
          <CustomImage
            src={event.data.event_image.url as string}
            alt={event.data.event_image.alt as string}
          />
          {/* Overlay gradient for better text readability if needed */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content section */}
        <div className="flex flex-col p-6 gap-4 flex-grow">
          {/* Date badge */}
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 text-primary px-4 py-2 rounded-full">
              <time className="text-sm font-semibold uppercase tracking-wide">
                {eventDate}
              </time>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl lg:text-2xl font-bold text-gray-900 line-clamp-2 leading-tight group-hover:text-primary transition-colors duration-300">
            {prismic.asText(event.data.event_title)}
          </h3>

          {/* Call to action */}
          <div className="flex items-center gap-2 mt-auto pt-4 text-primary group-hover:gap-3 transition-all duration-300">
            <span className="text-sm font-semibold uppercase tracking-wider">
              Saiba mais
            </span>
            <svg
              className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default EventCardItem;
