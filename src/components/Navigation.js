import React from "react";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { NavList, LinkStyled } from "./Navigation.styled";

export default function Navigation() {
  const LINKS = [
    { to: "/", text: "Home" },
    { to: "/starred", text: "Starred" },
  ];

  const location = useLocation();


  return (
    <>
      <nav>
        <NavList>
            {
                LINKS.map(item => <li key={item.to}>
                  <LinkStyled
                  to={item.to} 
                  className={item.to === location.pathname ? 'active' : ''}>{item.text}</LinkStyled>
                </li>)
            }
        </NavList>
      </nav>
    </>
  );
}
