import React, { useState } from "react";
import "../../styles/Page.css";
const Page = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center  page-container">
      {children}
    </div>
  );
};

export default Page;
