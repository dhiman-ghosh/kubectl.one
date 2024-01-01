import menu from "@config/menu.json";
import { useHeaderContext } from "context/state";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Header = () => {
  // router
  const router = useRouter();

  //context
  const { categories } = useHeaderContext();

  //local state
  const [openMenu, setOpenMenu] = useState(false);
  const [navMenu, setNavMenu] = useState(
    menu.main.map((item) => ({ ...item, type: "main" }))
  );

  useEffect(() => {
    const matchRoute = menu.main.find((item) => item.url === router.asPath);
    const navList = [...menu.main];

    if (matchRoute) {
      if (matchRoute.url === "/") {
        const arr = [] // categories.slice(0, 4);
        navList.splice(1, 0, ...arr);
        setNavMenu(navList);
      } else {
        setNavMenu(menu.main);
      }
    } else {
      //if route not match
      // navList.splice(1, 0, ...categories);
      // navList.splice(navList.length - 2, menu.main.length - 1);
      setNavMenu(navList);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath, menu.main, categories]);

  return (
    <>
      <header className={`header mt-2 pt-12 pb-3`}>
        <nav className="navbar container text-center md:text-left">
          {/* navbar toggler */}
          <button
            className="btn btn-primary inline-flex items-center md:hidden"
            onClick={() => setOpenMenu(!openMenu)}
          >
            {openMenu ? (
              <svg className="mr-1 h-4 w-4 fill-current" viewBox="0 0 20 20">
                <title>Menu Close</title>
                <polygon
                  points="11 9 22 9 22 11 11 11 11 22 9 22 9 11 -2 11 -2 9 9 9 9 -2 11 -2"
                  transform="rotate(45 10 10)"
                />
              </svg>
            ) : (
              <svg className="mr-1 h-4 w-4 fill-current" viewBox="0 0 20 20">
                <title>Menu Open</title>
                <path d="M0 3h20v2H0V3z m0 6h20v2H0V9z m0 6h20v2H0V0z" />
              </svg>
            )}
            Menu
          </button>
          {/* /navbar toggler */}
          {router.asPath !== "/" && (
            <div className="hidden text-center md:block">
              <Link
                className="mb-6 inline-flex items-center text-primary hover:underline"
                href="/"
              >
                <span className="mr-1 text-4xl text-white" style={{userSelect: 'none'}}>kubectl</span>
                <svg
                  className="mr-2"
                  width="15"
                  height="30"
                  viewBox="0 0 15 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M 5 25 V 5 H 0 V 2.5 C 3 2.5 2.5 0 5 0 H 10 V 25 H 5 Z"
                    fill="currentcolor"
                  ></path>
                </svg>
              </Link>
            </div>
          )}

          <ul
            id="nav-menu"
            className={`navbar-nav order-3 ${
              !openMenu && "hidden"
            } w-full justify-center md:flex md:w-auto md:space-x-2 md:order-1`}
          >
            {navMenu.map((menu, i) => (
              <React.Fragment key={`menu-${i}`}>
                {menu.hasChildren ? (
                  <li className="nav-item nav-dropdown group relative">
                    <span className="nav-link inline-flex items-center">
                      {menu.name}
                      <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </span>
                    <ul className="nav-dropdown-list hidden group-hover:block md:invisible md:absolute md:block md:opacity-0 md:group-hover:visible md:group-hover:opacity-100">
                      {menu.children.map((child, i) => (
                        <li className="nav-dropdown-item" key={`children-${i}`}>
                          <Link
                            href={child.url}
                            className="nav-dropdown-link block"
                          >
                            {child.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ) : (
                  <li className="nav-item">
                    <Link
                      onClick={() => setOpenMenu(false)}
                      href={menu.url}
                      target={menu.url.startsWith("http") ? "_blank" : ""}
                      className={`nav-link inline-block ${
                        !menu.url.includes("/categories") && "text-dark"
                      } ${router.asPath === menu.url && "nav-link-active"}`}
                    >
                      {menu.name}
                    </Link>
                  </li>
                )}
              </React.Fragment>
            ))}
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;
