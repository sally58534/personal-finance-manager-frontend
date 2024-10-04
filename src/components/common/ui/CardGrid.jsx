import React from "react";

const CardGrid = ({ children, className }) => (
  <div className={`grid grid-cols-2 gap-6 ${className}`}>{children}</div>
);

export default CardGrid;
