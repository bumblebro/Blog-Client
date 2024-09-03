import Link from "next/link";
import { useEffect, useState } from "react";
import { subSections } from "../../libs/Section";

interface Category {
  decodedslug: string[];
  totalBlogs: number;
}

function Category({ decodedslug, totalBlogs }: Category) {
  let categoryList: string[] = [];

  const input = decodedslug[decodedslug.length - 1]?.trim().toLowerCase();

  for (const [category, subCategory] of Object.entries(subSections)) {
    if (input === category.toLowerCase()) {
      console.log(Object.keys(subCategory));
      categoryList = Object.keys(subCategory);
    }

    // Check if the input matches a sub-category
    for (const [subCategoryKey, items] of Object.entries(subCategory)) {
      if (input === subCategoryKey.toLowerCase()) {
        console.log(items);
        categoryList = items;
      }
    }
  }

  return (
    <div className=" text-center flex flex-col items-center gap-4 px-4 pb-3 mt-[90px] ">
      <nav
        className="flex tracking-wider justify-start w-full xl:max-w-[73rem]"
        aria-label="Breadcrumb"
      >
        <ul className="flex items-center text-xs md:text-[14px] ">
          <li className="inline-flex items-center">
            <Link
              className="inline-flex items-center  font-medium text-gray-500 hover:text-blue-600 "
              href="/"
            >
              {" "}
              Home
            </Link>
          </li>
          {decodedslug.map((item, i) => {
            const url = `/${decodedslug.slice(0, i + 1).join("/")}`;

            return (
              <li key={i} className="flex items-center">
                <svg
                  className="rtl:rotate-180 w-2 h-2 text-black mx-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>

                <a
                  href={url}
                  className="inline-flex capitalize items-center  font-medium text-gray-500 hover:text-blue-600 "
                >
                  {item}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      <h1 className="text-2xl font-semibold border-b border-black pb-4 capitalize sm:text-[25px] md:text-[30px] ">
        {decodedslug[decodedslug.length - 1]}
      </h1>
      <p className="text-sm text-gray-800  md:w-[70%] xl:w-[60%] 2xl:w-[50%]">
        The latest news and reviews of everything Apple. From AppleTV to
        AirPods, MacBooks to iPads, Apple Watches, accessories and more.
      </p>
      <div className="overflow-scroll  no-scrollbar w-full">
        <ul className="flex items-center text-xs  pt-8 gap-12 justify-center md:gap-16 ">
          {categoryList.map((item, i) => (
            <Link
              key={i}
              href={`${decodedslug[decodedslug.length - 1]}/${item}`}
            >
              {item}
            </Link>
          ))}
        </ul>
      </div>
      <h1 className="text-sm font-semibold tracking-wider  pt-8">
        {totalBlogs} {decodedslug[decodedslug.length - 1]} Articles Published
      </h1>
    </div>
  );
}

export default Category;
