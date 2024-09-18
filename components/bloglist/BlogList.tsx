import DeSlugify from "@/libs/DeSlugify";
import { shimmer, toBase64 } from "@/libs/Shimmer";
import { Blogs } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

type JsonValue = string | number | boolean | null;
interface posts {
  posts: Blogs[];
}

function BlogList({ posts }: posts) {
  return (
    <div className="  mx-auto mb-10   w-full px-4">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4 lg:gap-4   xl:max-w-[73rem] mx-auto w-full lg:gap-x-5 xl:gap-y-14">
        {posts.map((item, index) => {
          // const myBlurDataUrl = await getBase64(item.imageurl);

          return (
            <div key={index} className="pt-4 ">
              <Link
                href={`/${
                  item.section !== "null"
                    ? item.section.toLowerCase() + "/"
                    : ""
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
                <div className="h-[75vw] w-full  lg:h-[12rem] xl:h-[13rem] md:h-[17rem] sm:h-[29rem] relative">
                  <Image
                    fill
                    sizes="(min-width: 640px) 608px,(min-width: 768px) 362px,(min-width: 1024px) 233px,(min-width: 1280px) 277px,(min-width: 1536px) 277px, 358px"
                    src={item.imageurl}
                    style={{ objectFit: "cover" }}
                    // quality={1}
                    alt={item.imagealt}
                    priority
                    placeholder={`data:image/svg+xml;base64,${toBase64(
                      shimmer(300, 300)
                    )}`}

                    // blurDataURL={myBlurDataUrl}
                  />{" "}
                </div>
                {/* <img
                className="h-[75vw] object-cover w-full pb-4 lg:h-[12rem] xl:h-[13rem] md:h-[17rem] sm:h-[29rem]"
                src={item.imageurl}
                alt={item.imagealt}
              /> */}
              </Link>
              <Link
                href={`/${
                  item.section !== "null"
                    ? item.section.toLowerCase() + "/"
                    : ""
                }${
                  item.subsection !== "null"
                    ? item.subsection.toLowerCase() + "/"
                    : ""
                }${
                  item.subsubsection !== "null"
                    ? item.subsubsection.toLowerCase() + "/"
                    : ""
                }`}
              >
                <h1 className="text-sm text-blue-600 font-semibold pb-2 tracking-wider pt-4">
                  {DeSlugify(item.subsection)}
                </h1>
              </Link>

              <Link
                href={`/${
                  item.section !== "null"
                    ? item.section.toLowerCase() + "/"
                    : ""
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
                <h2 className="font-semibold">{DeSlugify(item.title)}</h2>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BlogList;
