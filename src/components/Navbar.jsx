// import React from "react";
import { cybercloset } from "../../public/assets";
import { constructor, gallery, like } from "../../public/navbar";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
// import { navLists } from "../../src/config/constants";

// export default function Navbar() {
//   return (
//     <header className="w-full py-5 sm:px-18 px-5 flex justify-between items-center">
//       <nav className="flex w-full screen-max-width items-center">
//         <img src={cybercloset} alt="cybercloset" width={56} height={72} />
//         <div className="flex flex-1 justify-center max-sm:hidden">
//           {navLists.map((nav, i) => (
//             <div key={nav}  className="px-5 text-xl   cursor-pointer text-gray hover:text-white transition-all ">
//               {nav}
//             </div>
//           ))}
//         </div>
//         <div className="flex items-baseline gap-7 max-sm:justify-end max-sm:flex-1">
//           {/* <img src={searchImg} alt="search" width={18} height={18} />
//           <img src={bagImg} alt="bag" width={18} height={18} /> */}
//           <div className="px-5 text-xl   cursor-pointer text-gray hover:text-white transition-all ">{"Зарегистрироваться"}</div>
//         </div>
//       </nav>
//     </header>
//   );
// }
import React from "react";
import { Navbar, MobileNav, Typography, Button, IconButton } from "@material-tailwind/react";

export default function NavbarDefault() {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener("resize", () => window.innerWidth >= 960 && setOpenNav(false));
  }, []);

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography as="li" variant="small" color="blue-gray" className="flex items-center gap-x-2 p-1 font-medium">
        <img src={gallery} alt="cybercloset" width={28} height={36} />

        <NavLink to="/gallery" className="flex items-center">
          Галерея
        </NavLink>
      </Typography>
      <Typography as="li" variant="small" color="blue-gray" className="flex items-center gap-x-2 p-1  ">
        <img src={constructor} alt="cybercloset" width={28} height={36} />
        <NavLink to="/constructor" className="flex items-center">
          Конструктор
        </NavLink>
      </Typography>
      <Typography as="li" variant="small" color="blue-gray" className="flex items-center gap-x-2 p-1 font-medium">
        <img src={like} alt="cybercloset" width={28} height={36} />
        <NavLink to="/favorites" className="flex items-center">
          Избранное
        </NavLink>
      </Typography>
      {/* <Typography as="li" variant="small" color="blue-gray" className="flex items-center gap-x-2 p-1 font-medium">
        <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M0 2.5C0 1.96957 0.210714 1.46086 0.585786 1.08579C0.960859 0.710714 1.46957 0.5 2 0.5H14C14.5304 0.5 15.0391 0.710714 15.4142 1.08579C15.7893 1.46086 16 1.96957 16 2.5V12.5C16 13.0304 15.7893 13.5391 15.4142 13.9142C15.0391 14.2893 14.5304 14.5 14 14.5H2C1.46957 14.5 0.960859 14.2893 0.585786 13.9142C0.210714 13.5391 0 13.0304 0 12.5V2.5ZM3.293 3.793C3.48053 3.60553 3.73484 3.50021 4 3.50021C4.26516 3.50021 4.51947 3.60553 4.707 3.793L7.707 6.793C7.89447 6.98053 7.99979 7.23484 7.99979 7.5C7.99979 7.76516 7.89447 8.01947 7.707 8.207L4.707 11.207C4.5184 11.3892 4.2658 11.49 4.0036 11.4877C3.7414 11.4854 3.49059 11.3802 3.30518 11.1948C3.11977 11.0094 3.0146 10.7586 3.01233 10.4964C3.01005 10.2342 3.11084 9.9816 3.293 9.793L5.586 7.5L3.293 5.207C3.10553 5.01947 3.00021 4.76516 3.00021 4.5C3.00021 4.23484 3.10553 3.98053 3.293 3.793ZM9 9.5C8.73478 9.5 8.48043 9.60536 8.29289 9.79289C8.10536 9.98043 8 10.2348 8 10.5C8 10.7652 8.10536 11.0196 8.29289 11.2071C8.48043 11.3946 8.73478 11.5 9 11.5H12C12.2652 11.5 12.5196 11.3946 12.7071 11.2071C12.8946 11.0196 13 10.7652 13 10.5C13 10.2348 12.8946 9.98043 12.7071 9.79289C12.5196 9.60536 12.2652 9.5 12 9.5H9Z"
            fill="#90A4AE"
          />
        </svg>
        <a href="#" className="flex items-center">
          Docs
        </a>
      </Typography> */}
    </ul>
  );

  return (
    <Navbar className="mx-auto max-w-screen-xl px-4 py-2 lg:px-8 lg:py-4">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <NavLink to="/" className="flex items-center">
          <img src={cybercloset} alt="cybercloset" width={56} height={72} />
        </NavLink>
        <div className="hidden lg:block">{navList}</div>
        <div className="flex items-center gap-x-1">
          <Button variant="text" size="sm" className="hidden lg:inline-block text-lg">
            <span>Войти</span>
          </Button>
          <Button variant="gradient" size="sm" className="hidden lg:inline-block text-lg">
            <span>Зарегестрироваться</span>
          </Button>
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="h-6 w-6" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </IconButton>
      </div>
      <MobileNav open={openNav}>
        <div className="container mx-auto">
          {navList}
          <div className="flex items-center gap-x-1">
            <Button fullWidth variant="text" size="sm" className="text-lg">
              <span>Зарегестрироваться</span>
            </Button>
            <Button fullWidth variant="gradient" size="sm" className="text-lg">
              <span>Войти</span>
            </Button>
          </div>
        </div>
      </MobileNav>
    </Navbar>
  );
}
