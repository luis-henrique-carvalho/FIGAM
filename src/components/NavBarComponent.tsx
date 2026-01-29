import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import Image from "next/image";


const NavBar = () => {
  const menuItems = ["Inicio", "Sobre", "Noticias", "Agenda", "Visitas", "Contato"];

  const linkMenu = ["/", "/about", "/news", "/calendar", "/visits", "/contact"];

  return (
    <Navbar isBordered>
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <Image src={"/Figam.jpeg"} alt="FIGAM" width="150" height="150" unoptimized />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="start">
        <NavbarBrand>
          <Image src={"/Figam.jpeg"} alt="FIGAM" width="150" height="150" unoptimized />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/">
            Inicio
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="/about" aria-current="page" className="text-primary">
            Sobre
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/news">
            Notícias
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/calendar">
            Agenda
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/visits">
            Visitas
          </Link>
        </NavbarItem>
        {/* TODO: add transparency */}
        {/* <NavbarItem>
          <Link color="foreground" href="/accountability">
            Transparência
          </Link>
        </NavbarItem> */}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <Link color="foreground" href="/contact">
            Contato
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color="foreground"
              href={linkMenu[index]}
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};
export default NavBar;
