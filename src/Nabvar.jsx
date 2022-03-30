import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Nabvar() {
  const navLinks = ["Home", "RecipesNote", "ContactApp"];
  const navigate = useNavigate();

  const navLinksLists = navLinks.map((link, index) => (
    <a
      key={index}
      className="link gray f4 f4-ns dib mr4 pointer nav-link"
      title={link}
      onClick={(e) => {
        e.preventDefault();
        link === navLinks[0] && navigate("/");
        link === navLinks[1] && navigate(`/${link}Home`);
        link === navLinks[2] && navigate(`/${link}Home`);
        activeClassToggler(e);
      }}
    >
      {link}
    </a>
  ));

  const navLinksSelector = document.querySelectorAll(".nav-link");

  useEffect(() => {
    const navLinksSelectors = document.querySelectorAll(".nav-link");
    navLinksSelectors[0].classList.add("nav-link-active");

    return () => {
      navLinksSelectors[0].classList.remove("nav-link-active");
    };
  }, []);

  const activeClassToggler = (e) => {
    for (let navLink of navLinksSelector) {
      navLink.classList.remove("nav-link-active");
    }
    e.target.classList.add("nav-link-active");
  };

  return (
    <nav className=" flex pv3 justify-around items-end">
      <div>
        <a className="link dim black b f1  tc dib  logo" href="#" title="Home">
          FindRecipe
        </a>
      </div>
      <div>{navLinksLists}</div>
    </nav>
  );
}
