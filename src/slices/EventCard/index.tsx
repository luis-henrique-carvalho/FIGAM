import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import EventCardItem from "@/components/EventCardItem";

/**
 * Props for `EventCard`.
 */
export type EventCardProps = SliceComponentProps<Content.EventCardSlice, { events?: any[] }>;

/**
 * Component for "EventCard" Slices.
 * This slice displays a list of events passed from the page context.
 */
const EventCard = async ({ slice, context }: EventCardProps): Promise<JSX.Element> => {
  // Get events from context (passed from the page)
  const events = context?.events || [];

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="w-full"
    >
      {events.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">
            Nenhum evento disponível no momento.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-8">
          {events.map((event) => (
            <EventCardItem event={event} key={event.uid} />
          ))}
        </div>
      )}
    </section>
  );
};

export default EventCard;
