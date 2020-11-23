import React from "react";

const PageHolder = (props) => {
  return <div {...props}>{props.children}</div>;
};

export default PageHolder;
