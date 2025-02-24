// Description: Fixed navigation bar with proper styling
"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-blue-800 text-black p-4">
      <div className="container mx-auto">
        <div className="flex flex-wrap items-center justify-between">
          <div>
            <Link href="/" className="text-xl font-bold">
              New Generation High School
            </Link>
          </div>

          <div className="flex space-x-4 mt-0">
            <Link href="/" className="px-3 py-2 rounded hover:bg-blue-700">
              Home
            </Link>
            <Link href="#" className="px-3 py-2 rounded hover:bg-blue-700">
              About
            </Link>
            <Link href="#" className="px-3 py-2 rounded hover:bg-blue-700">
              Students
            </Link>
            <Link href="#" className="px-3 py-2 rounded hover:bg-blue-700">
              Faculty
            </Link>
            <Link href="#" className="px-3 py-2 rounded hover:bg-blue-700">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
