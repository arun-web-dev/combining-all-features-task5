import React from "react";
import { useNavigate } from "react-router-dom";

export default function Nabvar() {
  const navLinks = ["Home", "RecipesNote", "ContactApp"];
  const navigate = useNavigate();

  return (
    <nav className=" flex pv3 justify-around items-end">
      <div>
        <a className="link dim black b f1  tc dib  logo" href="#" title="Home">
          FindRecipe
        </a>
      </div>
      <div>
        {navLinks.map((link, index) => (
          <a
            key={index}
            className="link dim gray f4 f4-ns dib mr4 pointer"
            title={link}
            onClick={(e) => {
              e.preventDefault();
              link === navLinks[0] && navigate("/");
              link === navLinks[1] && navigate(`/${link}Home`);
              link === navLinks[2] && navigate(`/${link}Home`);
            }}
          >
            {link}
          </a>
        ))}
      </div>
    </nav>
  );
}
