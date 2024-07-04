import React from "react";
import { cybercloset } from "../../public/assets";
import { navLists } from "../../src/config/constants";

export default function Navbar() {
  return (
    <header className="w-full py-5 sm:px-18 px-5 flex justify-between items-center">
      <nav className="flex w-full screen-max-width items-center">
        <img src={cybercloset} alt="cybercloset" width={56} height={72} />
        <div className="flex flex-1 justify-center max-sm:hidden">
          {navLists.map((nav, i) => (
            <div key={nav} className="px-5 text-xl   cursor-pointer text-gray hover:text-white transition-all ">
              {nav}
            </div>
          ))}
        </div>
        <div className="flex items-baseline gap-7 max-sm:justify-end max-sm:flex-1">
          {/* <img src={searchImg} alt="search" width={18} height={18} />
          <img src={bagImg} alt="bag" width={18} height={18} /> */}
          <div className="px-5 text-xl   cursor-pointer text-gray hover:text-white transition-all ">{"Зарегистрироваться"}</div>
        </div>
      </nav>
    </header>
  );
}
