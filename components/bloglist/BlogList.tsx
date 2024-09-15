import DeSlugify from "@/libs/DeSlugify";
import { Blogs } from "@prisma/client";
import Link from "next/link";
import { useEffect, useState } from "react";

type JsonValue = string | number | boolean | null;
interface posts {
  posts: Blogs[];
}

function BlogList({ posts }: posts) {
  return (
    <div className="  mx-auto mb-10   w-full px-4">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4 lg:gap-4   xl:max-w-[73rem] mx-auto w-full lg:gap-x-5 xl:gap-y-14">
        {posts.map((item, index) => (
          <div key={index} className="pt-4 ">
            <Link
              href={`/${
                item.section !== "null" ? item.section.toLowerCase() + "/" : ""
              }${
                item.subsection !== "null"
                  ? item.subsection.toLowerCase() + "/"
                  : ""
              }${
                item.subsubsection !== "null"
                  ? item.subsubsection.toLowerCase() + "/"
                  : ""
              }${item.title.toLowerCase()}`}
            >
              <img
                className="h-[75vw] object-cover w-full pb-4 lg:h-[12rem] xl:h-[13rem] md:h-[17rem] sm:h-[29rem]"
                src={item.imageurl}
                alt={item.imagealt}
              />
            </Link>
            <Link
              href={`/${item.section !== "null" ? item.section.toLowerCase() + "/" : ""}${
                item.subsection !== "null" ? item.subsection.toLowerCase() + "/" : ""
              }${
                item.subsubsection !== "null" ? item.subsubsection.toLowerCase() + "/" : ""
              }`}
            >
              <h1 className="text-sm text-blue-600 font-semibold pb-2 tracking-wider">
                {DeSlugify(item.subsection)}
              </h1>
            </Link>

            <Link
              href={`/${item.section !== "null" ? item.section.toLowerCase() + "/" : ""}${
                item.subsection !== "null" ? item.subsection.toLowerCase() + "/" : ""
              }${
                item.subsubsection !== "null" ? item.subsubsection.toLowerCase() + "/" : ""
              }${item.title.toLowerCase()}`}
            >
              <h2 className="font-semibold">{DeSlugify(item.title)}</h2>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlogList;
