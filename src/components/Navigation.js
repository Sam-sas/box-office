import React from "react";
import { Link, Route } from "react-router-dom";

export default function Navigation() {
  const LINKS = [
    { to: "/", text: "Home" },
    { to: "/starred", text: "Starred" },
  ];
  return (
    <>
      <nav>
        <ul>
            {
                LINKS.map(item => <li key={item.to}><Link to={item.to}>{item.text}</Link></li>)
            }
        </ul>
      </nav>
    </>
  );
}
