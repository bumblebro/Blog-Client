import Link from "next/link";
import { useEffect, useState } from "react";
import { subSections } from "../../libs/Section";
import DeSlugify from "@/libs/DeSlugify";

interface CategoryPost {
  decodedslug: string[];
  totalBlogs: number;
}

function CategoryPost({ decodedslug, totalBlogs }: CategoryPost) {
  let categoryList: string[] = [];

  const input = decodedslug[decodedslug.length - 1].trim().toLowerCase();
  for (const [category, subCategory] of Object.entries(subSections)) {
    if (input === category.toLowerCase()) {
      categoryList = Object.keys(subCategory);
    }

    // Check if the input matches a sub-category
    for (const [subCategoryKey, items] of Object.entries(subCategory)) {
      if (input === subCategoryKey.toLowerCase()) {
        categoryList = items;
      }
    }
  }

  return (
    <div className=" text-center flex flex-col items-center pb-3  px-4 mt-[85px] md:mt-[91px] ">
      <nav
        className="flex tracking-wider justify-start w-full xl:max-w-[73rem]"
        aria-label="Breadcrumb"
      >
        <ul className="flex items-center text-xs md:text-[14px] overflow-auto no-scrollbar">
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
            if (i == decodedslug.length - 1) return;
            const url = `/${decodedslug.slice(0, i + 1).join("/")}`;

            return (
              <li key={i} className="flex items-center ">
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
                  href={url.toLowerCase()}
                  className="inline-flex capitalize items-center  font-medium text-gray-500 hover:text-blue-600 text-nowrap"
                >
                  {DeSlugify(item)}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

export default CategoryPost;
