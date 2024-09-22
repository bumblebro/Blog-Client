import { shimmer, toBase64 } from "@/libs/Shimmer";
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
          {/* <img src={posts[randomNum]?.imageurl} alt="" /> */}
          <Image
            fill
            sizes="(min-width: 640px) 608px,(min-width: 768px) 368px,(min-width: 1024px) 496px,(min-width: 1280px) 584px,(min-width: 1536px) 584px, 328px"
            src={posts[randomNum]?.imageurl}
            style={{ objectFit: "cover" }}
            quality={75}
            alt={posts[randomNum]?.imagealt}
            // priority
            placeholder={`data:image/svg+xml;base64,${toBase64(
              shimmer(300, 300)
            )}`}
          />{" "}
        </Link>{" "}
        <div className="bg-black text-white left-[5%]  text-center  w-[90%] py-6 absolute top-[80%] px-6 md:relative md:h-full md:top-0 md:flex md:flex-col md:justify-center md:left-0 md:w-full   ">
          {/* <h1 className="pb-3 text-[#6594F1] font-semibold md:text-lg md:pb-5">
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
              <h1 className="pb-3 text-[#6594F1] font-semibold md:text-lg md:pb-5 hover:text-[#3a8cfb]">
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
              <h1 className="pb-3 text-[#6594F1] font-semibold md:text-lg md:pb-5 hover:text-[#3a8cfb]">
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
              <h1 className="pb-3 text-[#6594F1] font-semibold md:text-lg md:pb-5 hover:text-[#3a8cfb]">
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
            <h2 className="text-xl font-semibold md:text-3xl hover:text-[#004ff2]">
              {posts[randomNum]?.title?.replace(/-/g, " ")}
            </h2>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FeaturedPost;
