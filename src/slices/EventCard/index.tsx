import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { createClient } from "@/prismicio";
import EventCardItem from "@/components/EventCardItem";

/**
 * Props for `EventCard`.
 */
export type EventCardProps = SliceComponentProps<Content.EventCardSlice>;

/**
 * Component for "EventCard" Slices.
 * This slice fetches and displays a list of events from Prismic.
 */
const EventCard = async ({ slice }: EventCardProps): Promise<JSX.Element> => {
  const client = createClient();

  // Fetch all events ordered by date
  const events = await client.getAllByType("events_card", {
    orderings: [
      { field: "my.events_card.event_date", direction: "desc" },
    ],
  });

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="flex flex-col lg:flex-row lg:flex-wrap gap-5 items-center justify-between"
    >
      {events.map((event) => (
        <EventCardItem event={event} key={event.uid} />
      ))}
    </section>
  );
};

export default EventCard;
