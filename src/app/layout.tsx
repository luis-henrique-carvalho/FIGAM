import type { Metadata } from "next";
import { Inter, Noto_Serif } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import NavBar from "@/components/NavBarComponent";
import Container from "@/components/Container";
import Footer from "@/components/Footer";
const inter = Inter({ subsets: ["latin"] });
const notoSerif = Noto_Serif({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fundação Iraci Gama",
  description:
    "Descubra como a Fundação Iraci Gama está impactando positivamente vidas através de iniciativas educacionais e sociais. Saiba mais sobre nossos projetos e como você pode fazer a diferença.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={notoSerif.className}>
        <Providers>
          <NavBar />
          <Container>
            {children}
            <Footer />
          </Container>
        </Providers>
      </body>
    </html>
  );
}
