import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Document`.
 */
export type DocumentProps = SliceComponentProps<Content.DocumentSlice>;

/**
 * Component for "Document" Slices.
 */
const Document = ({ slice }: DocumentProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for document (variation: {slice.variation}) Slices
    </section>
  );
};

export default Document;
