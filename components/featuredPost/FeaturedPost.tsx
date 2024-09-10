import DeSlugify from "@/libs/DeSlugify";
import { Blogs } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface posts {
  posts: Blogs[];
}
function FeaturedPost({ posts }: posts) {
  let randomNum = Math.floor(Math.random() * posts.length) + 1;
  // let randomNum = 1;
  return (
    <div className="  mx-auto   px-4 mt-[100px] md:mt-[80px]">
      <div className="grid grid-cols-1 relative md:grid-cols-2   md:h-[25rem]  xl:h-[25rem] xl:max-w-[73rem] mx-auto ">
        <Link
          className="flex justify-center pt-4 h-64 relative md:h-full"
          href={`/${
            posts[randomNum]?.section !== "null"
              ? posts[randomNum]?.section + "/"
              : ""
          }${
            posts[randomNum]?.subsection !== "null"
              ? posts[randomNum]?.subsection + "/"
              : ""
          }${
            posts[randomNum]?.subsubsection !== "null"
              ? posts[randomNum]?.subsubsection + "/"
              : ""
          }${posts[randomNum]?.title}`}
        >
          <Image
            fill
            src={posts[randomNum]?.imageurl}
            objectFit="cover"
            quality={100}
            alt={posts[randomNum]?.imagealt}
          />{" "}
        </Link>{" "}
        <div className="bg-black text-white left-[5%]  text-center  w-[90%] py-6 absolute top-[80%] px-6 md:relative md:h-full md:top-0 md:flex md:flex-col md:justify-center md:left-0 md:w-full   ">
          {/* <h1 className="pb-3 text-blue-600 font-semibold md:text-lg md:pb-5">
            {posts[randomNum].section
              ? posts[randomNum].section
              : posts[randomNum].subsection
              ? posts[randomNum].subsection
              : posts[randomNum].subsubsection}
          </h1> */}
          {posts[randomNum]?.subsubsection ? (
            <Link
              href={`/${
                posts[randomNum].section !== "null"
                  ? posts[randomNum].section + "/"
                  : ""
              }${
                posts[randomNum].subsection !== "null"
                  ? posts[randomNum].subsection + "/"
                  : ""
              }${
                posts[randomNum].subsubsection !== "null"
                  ? posts[randomNum].subsubsection + "/"
                  : ""
              }`}
            >
              {" "}
              <h1 className="pb-3 text-blue-600 font-semibold md:text-lg md:pb-5">
                {posts[randomNum].subsubsection?.replace(/-/g, " ")}
              </h1>
            </Link>
          ) : posts[randomNum]?.subsection ? (
            <Link
              href={`/${
                posts[randomNum].section !== "null"
                  ? posts[randomNum].section + "/"
                  : ""
              }${
                posts[randomNum].subsection !== "null"
                  ? posts[randomNum].subsection + "/"
                  : ""
              }`}
            >
              <h1 className="pb-3 text-blue-600 font-semibold md:text-lg md:pb-5">
                {posts[randomNum].subsection?.replace(/-/g, " ")}
              </h1>
            </Link>
          ) : (
            <Link
              href={`/${
                posts[randomNum]?.section !== "null"
                  ? posts[randomNum]?.section + "/"
                  : ""
              }`}
            >
              {" "}
              <h1 className="pb-3 text-blue-600 font-semibold md:text-lg md:pb-5">
                {posts[randomNum]?.section?.replace(/-/g, " ")}
              </h1>
            </Link>
          )}
          <Link
            href={`/${
              posts[randomNum]?.section !== "null"
                ? posts[randomNum]?.section + "/"
                : ""
            }${
              posts[randomNum]?.subsection !== "null"
                ? posts[randomNum]?.subsection + "/"
                : ""
            }${
              posts[randomNum]?.subsubsection !== "null"
                ? posts[randomNum]?.subsubsection + "/"
                : ""
            }${posts[randomNum]?.title}`}
          >
            <h2 className="text-xl font-semibold md:text-3xl">
              {posts[randomNum]?.title?.replace(/-/g, " ")}
            </h2>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FeaturedPost;
