import React from "react";
import Link from "next/link";
import { Divider } from "@nextui-org/react";
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
 */
const EventCardItem = ({ event }: Props) => {
    const eventDate = formactDate(event.data.event_date);

    return (
        <Link
            href={`/calendar/${event.uid}`}
            className="flex flex-col items-center justify-center w-10/12 lg:w-[48%]"
        >
            <div className="flex flex-col w-full shadow-xl min-h-[300px] lg:min-h-[420px] justify-between hover:scale-105 transition-transform duration-300 ease-in-out">
                <div className="w-full h-40 lg:h-60">
                    <CustomImage
                        src={event.data.event_image.url as string}
                        alt={event.data.event_image.alt as string}
                    />
                </div>

                <Divider />

                <div className="flex flex-col p-5 h-56 items-center text-center justify-center gap-5 lg:h-64">
                    <h3 className="text-3xl text-secondary lg:text-4xl xl:text-5xl lg:font-bold font-semibold line-clamp-3 xl:line-clamp-2">
                        {eventDate}
                    </h3>
                    <div className="flex flex-col gap-4">
                        <h4 className="text-xs lg:text-base font-light line-clamp-4">
                            {prismic.asText(event.data.event_title)}
                        </h4>
                        <p className="text-sm font-semibold text-primary hover:text-secondary">
                            Saiba mais!
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default EventCardItem;
