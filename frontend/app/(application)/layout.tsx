import Middleware from "@/components/Middleware";
import React from "react";

interface Props {
  children: Readonly<React.ReactNode>;
}

export default function Layout({children}:Props) {
  return (
    <>
      <Middleware />
      {children}
    </>
  );
}
