import { Metadata } from "next";
import { PrismicRichText, SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle("contact");

  return (
    <div className="flex w-full justify-center">
      <div className="flex flex-col gap-5 w-10/12 lg:text-">
        <div className="flex flex-col gap-3">
          <h2 className='text-2xl font-bold text-center text-primary'>{page.data.text_1}</h2>
          <PrismicRichText field={page.data.text_2} components={{
            paragraph: ({ children }) => <p className='text-justify'>{children}</p>,
            heading3: ({ children }) => <strong className='text-center'>{children}</strong>
          }} />
        </div>

        <div className="flex flex-col lg:flex-row gap-3 lg:gap-10">
          <div className="flex flex-col gap-3">
            <SliceZone slices={page.data.slices} components={components} />
          </div>

          <div className="flex flex-col w-full gap-4">
            <div>
              <PrismicRichText field={page.data.endereco} components={{
                paragraph: ({ children }) => <p className='text-justify'>{children}</p>
              }} />
            </div>
            <iframe
              className="w-full h-96"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3900.590705022083!2d-38.43164372493728!3d-12.140132488104108!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x716bdbb17f2082f%3A0xc2da2d43a5aef0d3!2sFIGAM%20-%20FUNDA%C3%87%C3%83O%20IRACI%20GAMA%20DE%20CULTURA!5e0!3m2!1spt-BR!2sbr!4v1715904442837!5m2!1spt-BR!2sbr"
              style={{
                border: 0,
                borderRadius: '8px',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
              }}
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div >

  );
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("contact");

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}
