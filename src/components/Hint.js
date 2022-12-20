import React from "react";

const Hint = ({ selectedWord, randIndex }) => {
  return (
    <div className="hint-letters-container">
      {selectedWord.split("").map((letter, i) => {
        return (
          <span className="hint-letters" key={i}>
            {randIndex.includes(i) ? letter : ""}
          </span>
        );
      })}
    </div>
  );
};

export default Hint;