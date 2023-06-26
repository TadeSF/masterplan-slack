"use client";
import React from "react";
import Image from "next/image";
import { Button } from "primereact/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex align-center justify-center h-screen w-screen bg-primary">
        <div className="flex flex-col items-center justify-center">
          <Image
            src="/logo.png"
            alt="Logo"
            width={400}
            height={128}
            className="mb-10"
          />
          <p className="text-white text-9xl mb-3 mt-10">500</p>
          <p className="text-white text-1xl mb-10">Server Error</p>
          <Link href="/">
            <Button severity="warning" label="Back to Home" icon="pi pi-link" />
          </Link>
        </div>
      </div>
    </>
  );
}
