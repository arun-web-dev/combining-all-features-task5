import React from "react";

const SearchBox = ({ searchChange, submitRecipe }) => {
  return (
    <div className="pa2 flex justify-around flex-wrap">
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          onChange={searchChange}
          className="pa3 dib ba b--green bg-lightest-blue f5 "
          type="search"
          placeholder="search recipes locally"
        />
      </form>
    </div>
  );
};

export default SearchBox;
