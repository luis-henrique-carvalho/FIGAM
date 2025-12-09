import { Content } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `ContactCard`.
 */
export type ContactCardProps = SliceComponentProps<Content.ContactCardSlice>;

/**
 * Component for "ContactCard" Slices.
 */
const ContactCard = ({ slice }: ContactCardProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="flex flex-col gap-4 text-white
      hover:text-primarty bg-primary text-center
       rounded-xl p-4 border border-transparent hover:border-primary
        hover:bg-transparen">
        <h4>{slice.primary.title}</h4>
        <h5>{slice.primary.sub_title}</h5>
        <PrismicNextLink field={slice.primary.link} className="font-bold hover:bg-secondary">
          {slice.primary.button_text}
        </PrismicNextLink>
      </div>
    </section>

  );
};

export default ContactCard;
