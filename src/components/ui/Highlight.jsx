import React from "react";

const Highlight = ({ icon, title, para }) => {
  //accept icon prop passed in Highlights.jsx when we call the Highlight.jsx component
  return (
    <div className="highlight">
      <div className="highlight__img">
        {/* <FontAwesomeIcon icon="bolt" /> Don't want to import FontAwesomeIcon here in Highlight.jsx. Want to keep import in Highlights.jsx*/}
        {icon}
        {/* use the icon prop that was passed from Highlights.jsx */}
      </div>
      <h3 className="highlight__subtitle">{title}</h3>
      <p className="highlight__para">
        {para}
      </p>
    </div>
  );
};

export default Highlight;
