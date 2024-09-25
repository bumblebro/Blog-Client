"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Footer from "../footer/Footer";
import DeSlugify from "@/libs/DeSlugify";
import { subSections } from "@/libs/Section";

const Tech = ["Apple", "Audio", "Cameras", "Computers", "Smartphones", "TVs"];
const Fashion = [
  "Men's-Fashion-Advice",
  "Men's-Fashion-Trends",
  "Men's-Fragrances",
  "Men's-Hairstyles",
  "Sneakers-&-Shoes",
  "Watches",
];
const Rides = ["Boats", "Cars", "Cycling", "Flying", "Motorcycles"];
const Lifestyle = [
  "Advice",
  "Drinks",
  "Fitness",
  "Finance",
  "Food",
  "Grooming",
  "Sex-&-Dating",
  "Travel",
];
const Entertainment = [
  "Art",
  "Books",
  "Gaming",
  "Movies-&-TV",
  "Music",
  "Sport",
];
const Living = ["Appliances", "Architecture", "Furniture", "Homewares"];
const Outdoors = ["Camping", "Snow", "Surfing", "Skate", "Hiking"];
const News = ["World-News", "Tech-News", "Sports-News", "Entertainment-News"];

function Navbar({
  decodedslug,
  home,
  ispost,
}: {
  decodedslug: any;
  home?: boolean;
  ispost?: boolean;
}) {
  const [sidebar, setSideBar] = useState(false);
  const [categoryList, setCategoryList] = useState<string[]>([]);
  const [lastElement, setLastElement] = useState(false);

  useEffect(() => {
    console.log(`SLUGGGGG`, decodedslug);
    setLastElement(false);

    if (decodedslug.length == 3) {
      setLastElement(true);
      // setLen(decodedslug.length);
    } else setLastElement(false);

    if (home == true) {
      setCategoryList(decodedslug);
      return;
    }

    if (Array.isArray(decodedslug) && decodedslug.length > 0) {
      const input = decodedslug[decodedslug.length - 1]?.trim().toLowerCase();
      for (const [category, subCategory] of Object.entries(subSections)) {
        if (input === category.toLowerCase()) {
          setCategoryList(Object.keys(subCategory));
        }

        // Check if the input matches a sub-category
        for (const [subCategoryKey, items] of Object.entries(subCategory)) {
          if (input === subCategoryKey.toLowerCase()) {
            setCategoryList(items);
          }
        }
        if (categoryList.length == 0) {
          // setLastElement(true);

          for (const [subCategoryKey, items] of Object.entries(subCategory)) {
            if (
              decodedslug[decodedslug.length - 2]?.trim().toLowerCase() ===
              subCategoryKey.toLowerCase()
            ) {
              setCategoryList(items);
            }
          }

          // decodedslug.pop();
        }
      }
    }
    console.log(`lastElement`, lastElement);
  }, []);

  const handleSidebar = () => {
    setSideBar(false);
  };

  return (
    <nav className="  w-full z-20 top-0 start-0 fixed bg-black h-[72px] md:h-[80px]">
      <div className="  items-center justify-between mx-auto  py-2 md:py-3 ">
        <div className="bg-black  grid grid-cols-3 px-3 xl:px-0 xl:max-w-[73rem] mx-auto  my-auto h-full text-white w-full ">
          {" "}
          <div className="flex items-center gap-2 ">
            {sidebar ? (
              <button type="submit" title="Button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className={`w-8 transform-gpu  duration-500 ${
                    sidebar ? "rotate-180  " : "rotate-0 "
                  }`}
                  onClick={() => {
                    setSideBar((prev: boolean) => !prev);
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            ) : (
              <button type="submit" title="Button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className={`w-8 transform-gpu  duration-500 ${
                    sidebar ? "rotate-180  " : "rotate-0 "
                  }`}
                  onClick={() => {
                    setSideBar((prev: boolean) => !prev);
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </button>
            )}
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg> */}
          </div>
          <div className="flex justify-center items-center">
            <Link href="/" onClick={handleSidebar}>
              <h1 className="uppercase font-[650] tracking-[4px] text-xl   lg:text-[1.4rem] xl:text-[1.7rem] text-center  ">
                WordofMany
              </h1>
            </Link>
          </div>
          {/* <div className="flex justify-end items-center">
            <h1 className="bg-[#0c50e6] w-fit   uppercase tracking-wider text-xs font-semibold py-1 px-1 rounded-full md:text-base md:px-4 md:py-0 2xl:py-2 2xl:px-6 ">
              Subscribe
            </h1>
          </div> */}
          <button
            type="button"
            title="SearchBtn"
            aria-label="Search"
            className="flex justify-end items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </button>
        </div>
        <div className="overflow-scroll mx-3 no-scrollbar w-full xl:max-w-[73rem] text-white text-xs tracking-widest font-light py-2 pt-2">
          <ul className="flex items-center text-xs gap-2  text-nowrap justify-around sm:justify-center">
            {home == true
              ? categoryList.map((item, i) =>
                  i === 0 ? (
                    <>
                      <Link
                        className="hover:text-[#004ff2] "
                        key={i}
                        href={`/${item.toLowerCase()}`}
                      >
                        {DeSlugify(item)}
                      </Link>
                    </>
                  ) : (
                    <>
                      <h1>|</h1>{" "}
                      <Link
                        className=" hover:text-[#004ff2]"
                        key={i}
                        href={`/${item.toLowerCase()}`}
                      >
                        {DeSlugify(item)}
                      </Link>
                    </>
                  )
                )
              : ispost == true
              ? categoryList.map((item, i) => {
                  const url = `/${decodedslug.slice(0, 2).join("/")}`;
                  return i === 0 ? (
                    <>
                      {" "}
                      <Link
                        className="hover:text-[#004ff2] "
                        key={i}
                        href={`${url}/${item.toLowerCase()}`}
                      >
                        {DeSlugify(item)}
                      </Link>
                    </>
                  ) : (
                    <>
                      <h1>|</h1>
                      <Link
                        className="hover:text-[#004ff2] "
                        key={i}
                        href={`${url}/${item.toLowerCase()}`}
                      >
                        {DeSlugify(item)}
                      </Link>
                    </>
                  );
                })
              : categoryList.map((item, i) => {
                  // const url = `/${decodedslug.join("/")}`;
                  return (
                    // <Link
                    //   className=" "
                    //   key={i}
                    //   href={`${url}/${item.toLowerCase()}`}
                    // >
                    //   {DeSlugify(item)}
                    // </Link>

                    i === 0 ? (
                      <>
                        {" "}
                        <Link
                          className=" hover:text-[#004ff2]"
                          key={i}
                          href={
                            lastElement == true
                              ? `${item.toLowerCase()}`
                              : `
                  ${decodedslug[decodedslug.length - 1]}/${item.toLowerCase()}`
                          }
                        >
                          {DeSlugify(item)}
                        </Link>
                      </>
                    ) : (
                      <>
                        <h1>|</h1>
                        <Link
                          className="hover:text-[#004ff2] "
                          key={i}
                          href={
                            lastElement == true
                              ? `${item.toLowerCase()}`
                              : `
                    ${
                      decodedslug[decodedslug.length - 1]
                    }/${item.toLowerCase()}`
                          }
                        >
                          {DeSlugify(item)}
                        </Link>
                      </>
                    )
                  );
                })}

            {/* <h1>TRAILBLAZERS</h1>
            <h1>Tech</h1>
            <h1>Watches</h1>
            <h1>Cars</h1>
            <h1>Drinks</h1>
            <h1>Entertainment</h1> */}
          </ul>
        </div>
        <div className="bg-black w-full px-4">
          <div
            className={`  w-full ${
              !sidebar && "hidden"
            }    text-white  tracking-wider 2xl:px-44 lg:pt-8 mx-auto  xl:max-w-[73rem] px-3"
          id="navbar-sticky overflow-y-auto h-screen animate-fadein bg-black`}
          >
            <h1 className="text-2xl font-semibold py-6">Sections</h1>
            <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 ">
              <div>
                <Link
                  onClick={handleSidebar}
                  href={"/tech"}
                  className="font-semibold hover:text-[#004ff2] "
                >
                  Tech
                </Link>
                <ul className="font-light flex flex-col gap-3 pt-4">
                  {Tech.map((item, index) => (
                    <li key={index}>
                      <Link
                        onClick={handleSidebar}
                        href={`/tech/${item.toLowerCase()}`}
                        key={index}
                        className="hover:text-[#004ff2]"
                      >
                        {DeSlugify(item)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <Link
                  onClick={handleSidebar}
                  href={"/fashion"}
                  className="font-semibold hover:text-[#004ff2]"
                >
                  Fashion
                </Link>
                <ul className="font-light flex flex-col gap-3  pt-4">
                  {Fashion.map((item, index) => (
                    <li key={index}>
                      <Link
                        onClick={handleSidebar}
                        href={`/fashion/${item.toLowerCase()}`}
                        key={index}
                        className="hover:text-[#004ff2]"
                      >
                        {DeSlugify(item)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <Link
                  onClick={handleSidebar}
                  href={"/rides"}
                  className="font-semibold hover:text-[#004ff2]"
                >
                  Rides
                </Link>
                <ul className="font-light flex flex-col gap-3   pt-4">
                  {Rides.map((item, index) => (
                    <li key={index}>
                      <Link
                        onClick={handleSidebar}
                        href={`/rides/${item.toLowerCase()}`}
                        key={index}
                        className="hover:text-[#004ff2]"
                      >
                        {DeSlugify(item)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <Link
                  onClick={handleSidebar}
                  href={"/lifestyle"}
                  className="font-semibold  hover:text-[#004ff2]"
                >
                  Lifestyle
                </Link>
                <ul className="font-light flex flex-col gap-3   pt-4">
                  {Lifestyle.map((item, index) => (
                    <li key={index}>
                      <Link
                        onClick={handleSidebar}
                        href={`/lifestyle/${item.toLowerCase()}`}
                        key={index}
                        className="hover:text-[#004ff2]"
                      >
                        {DeSlugify(item)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <Link
                  onClick={handleSidebar}
                  href={"/entertainment"}
                  className="font-semibold  hover:text-[#004ff2]"
                >
                  Entertainment
                </Link>
                <ul className="font-light flex flex-col gap-3   pt-4">
                  {Entertainment.map((item, index) => (
                    <li key={index}>
                      <Link
                        onClick={handleSidebar}
                        href={`/entertainment/${item.toLowerCase()}`}
                        key={index}
                        className="hover:text-[#004ff2]"
                      >
                        {DeSlugify(item)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <Link
                  onClick={handleSidebar}
                  href={"/living"}
                  className="font-semibold hover:text-[#004ff2]"
                >
                  Living
                </Link>
                <ul className="font-light flex flex-col gap-3  pt-4 ">
                  {Living.map((item, index) => (
                    <li key={index}>
                      <Link
                        onClick={handleSidebar}
                        href={`/living/${item.toLowerCase()}`}
                        key={index}
                        className="hover:text-[#004ff2]"
                      >
                        {DeSlugify(item)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <Link
                  onClick={handleSidebar}
                  href={"/outdoors"}
                  className="font-semibold hover:text-[#004ff2]"
                >
                  Outdoors
                </Link>
                <ul className="font-light flex flex-col gap-3   pt-4">
                  {Outdoors.map((item, index) => (
                    <li key={index}>
                      <Link
                        onClick={handleSidebar}
                        href={`/outdoors/${item.toLowerCase()}`}
                        key={index}
                        className="hover:text-[#004ff2]"
                      >
                        {DeSlugify(item)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <Link
                  onClick={handleSidebar}
                  href={"/news"}
                  className="font-semibold hover:text-[#004ff2]"
                >
                  News
                </Link>
                <ul className="font-light flex flex-col gap-3   pt-4">
                  {News.map((item, index) => (
                    <li key={index}>
                      <Link
                        onClick={handleSidebar}
                        href={`/news/${item.toLowerCase()}`}
                        key={index}
                        className="hover:text-[#004ff2]"
                      >
                        {DeSlugify(item)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>{" "}
            <Footer />
          </div>{" "}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
