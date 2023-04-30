"use client";

import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import Menu from "./Menu";

const Navbar = () => {
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm ">
      <div className="py-4 border-b ">
        <Container>
          <div className="flex items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Search />
            <Menu />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
