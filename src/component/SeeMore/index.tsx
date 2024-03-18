import React from "react";
import ReactShowMoreText from "react-show-more-text";
import "./style.css";

interface SeeMoreProps {
  children: String;
}

const SeeMore = ({ children }: SeeMoreProps) => {
  return (
    <ReactShowMoreText
      lines={2}
      more="Show more"
      less="Show less"
      className="content-css"
      anchorClass="show-more-less"
      expanded={false}
      truncatedEndingComponent={"... "}
    >
      {children}
    </ReactShowMoreText>
  );
};

export default SeeMore;
