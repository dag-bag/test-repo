import React from "react";
import Link from "next/link";
export default function Header() {
  return (
    <header className="flex justify-between p-5 max-w-7xl m-auto">
      <div className="flex space-x-5">
        <Link href={"/"}>
          <img
            className="w-44 object-contain cursor-pointer"
            src="https://miro.medium.com/max/8978/1*s986xIGqhfsN8U--09_AdA.png"
            alt=""
          />
        </Link>
        <div className="hidden sm:flex justify-center items-center space-x-4 ">
          <h3 className="cursor-pointer hover:text-white rounded-full px-4 py-1 transition-colors duration-200 ease-out hover:bg-green-700">
            About
          </h3>
          <h3 className="cursor-pointer hover:text-white rounded-full px-4 py-1 transition-colors duration-200 ease-out hover:bg-green-700">
            Contact
          </h3>
          <h3 className="cursor-pointer bg-green-600 px-4 py-1 rounded-full text-white hover:border-2 hover:border-green-600 hover:bg-white hover:text-black transition-colors duration-200 ease-out">
            Follow
          </h3>
        </div>
      </div>
      <div className="flex space-x-5 text-green-600 justify-center items-center">
        <h3 className="cursor-pointer hover:bg-green-700 hover:text-white rounded-full px-4 py-1 transition-colors duration-200 ease-out">
          Sign In
        </h3>
        <h3 className=" border-2 border-green-600 rounded-full px-4 py-1 cursor-pointer hover:bg-green-700 hover:text-white transition-colors duration-200 ease-out">
          Get Started
        </h3>
      </div>
    </header>
  );
}
