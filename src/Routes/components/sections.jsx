import React from "react";

const Section = ({title="Untitled",text="texto texto texto texto texto texto texto texto"}) => {
  return (
    <div className="submenu">
        <a href={title}>
            <h1>{title}</h1>
            <p>{text}</p>
        </a>
    </div>
  );
}

export default Section;