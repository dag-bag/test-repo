import React from "react";

export default function Main() {
  return (
    <>
      <div className="flex  justify-between items-center bg-yellow-400 border-y border-black    max-w-7xl m-auto md:p-10 px-2 py-10">
        <div className="px-10 space-y-5">
          <h1 className="text-6xl font-serif max-w-xl">
            {" "}
            <span className="underline decoration-black decoration-4">
              Medium
            </span>{" "}
            is a place write, read, connect
          </h1>
          <h2>
            It's easy and free to post your thinking on any topic and con with
            millions of readers.
          </h2>
        </div>
        <h1 className="hidden sm:flex font-serif text-9xl font-extrabold lg:text-[15rem] pr-10">
          M
        </h1>
      </div>
    </>
  );
}
