import React, { useState } from "react";
import "../../styles/Page.css";
const Page = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center  page-container bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
      {children}
    </div>
  );
};

export default Page;
