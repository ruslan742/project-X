import React from 'react';
import { NavLink } from 'react-router-dom';
import { lego, gallery, robot, card, cart } from "../../../public/navbar";
import { Navbar, MobileNav, Typography, Button, IconButton } from '@material-tailwind/react';
import { useSnapshot } from 'valtio';
import { signOut } from 'firebase/auth';
import state from '../../store';
import { auth } from '../../auth/firebase';
import { cybercloset } from "../../../public/assets";
import Cart from "./Bascet";

export default function NavbarDefault() {
  const [openNav, setOpenNav] = React.useState(false);
  const snap = useSnapshot(state);

  React.useEffect(() => {
    window.addEventListener('resize', () => window.innerWidth >= 960 && setOpenNav(false));
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        state.email = null;
      })
      .catch((error) => {
        console.error('Logout failed', error);
      });
  };

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography as="li" variant="small" color="blue-gray" className="flex items-center gap-x-2 p-1 font-medium">
        <img src={gallery} alt="cybercloset" width={28} height={36} />
        <NavLink to="/gallery" className="flex items-center">
          Галерея
        </NavLink>
      </Typography>
      <Typography as="li" variant="small" color="blue-gray" className="flex items-center gap-x-2 p-1  ">
        <img src={lego} alt="cybercloset" width={28} height={36} />
        <NavLink to="/constructor" className="flex items-center">
          Конструктор
        </NavLink>
      </Typography>
      {snap.email && ( 
        <Typography as="li" variant="small" color="blue-gray" className="flex items-center gap-x-2 p-1 font-medium">
          <img src={robot} alt="cybercloset" width={28} height={36} />
          <NavLink to="/favourites" className="flex items-center">
            Личный кабинет
          </NavLink>
        </Typography>
      )}
      {snap.email && ( 
        <>
          <Typography as="li" variant="small" color="blue-gray" className="flex items-center gap-x-2 p-1 font-medium">
            <img src={card} alt="cybercloset" width={28} height={36} />
            <NavLink to="/payment" className="flex items-center">
              Оплата
            </NavLink>
          </Typography>
          <Typography as="li" variant="small" color="blue-gray" className="flex items-center gap-x-2 p-1 font-medium cursor-pointer">
            <img src={cart} alt="cybercloset" width={28} height={36} onClick={() => (state.showCart = true)} />
          </Typography>
        </>
      )}
    </ul>
  );

  return (
    <Navbar className="mx-auto max-w-screen-xl px-4 py-2 lg:px-8 lg:py-4 shadow-none border-none bg-black">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <NavLink to="/" className="flex items-center">
          <img src={cybercloset} alt="cybercloset" width={56} height={72} />
        </NavLink>
        <div className="hidden lg:block">{navList}</div>
        <div className="flex items-center gap-x-1">
          {snap.email ? ( 
            <Button variant="gradient" size="sm" className="hidden lg:inline-block text-lg" onClick={handleLogout}>
              <span>Выйти</span>
            </Button>
          ) : (
            <>
              <NavLink to="/signin">
                <Button variant="gradient" size="sm" className="hidden lg:inline-block text-lg">
                  <span>Войти</span>
                </Button>
              </NavLink>
              <NavLink to="/signup">
                <Button variant="gradient" size="sm" className="hidden lg:inline-block text-lg">
                  <span>Зарегистрироваться</span>
                </Button>
              </NavLink>
            </>
          )}
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
            {snap.email ? (
              <Button fullWidth variant="gradient" size="sm" className="text-lg" onClick={handleLogout}>
                <span>Выйти</span>
              </Button>
            ) : (
              <>
                <NavLink to="/signin">
                  <Button fullWidth variant="gradient" size="sm" className="text-lg">
                    <span>Войти</span>
                  </Button>
                </NavLink>
                <NavLink to="/signup">
                  <Button fullWidth variant="gradient" size="sm" className="text-lg">
                    <span>Зарегистрироваться</span>
                  </Button>
                </NavLink>
              </>
            )}
          </div>
        </div>
      </MobileNav>
      {snap.showCart && <Cart />}
    </Navbar>
  );
}
