import BlogDisplay from "@/components/BlogDisplay/BlogDisplay";
import BlogList from "@/components/bloglist/BlogList";
import Category from "@/components/category/Category";
import CategoryPost from "@/components/category/CategoryPost";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import Paginationbloglist from "@/components/pagination/Paginationbloglist";
import Sidebar from "@/components/sidebar/Sidebar";
import Delay from "@/libs/Delay";
import { Blogs } from "@prisma/client";
import { Metadata } from "next";
import { useEffect, useState } from "react";
import GETBLOGSLAYER from "../api/blogslayer/GETBLOGSLAYER";
import GETBLOGPOST from "../api/blogpost/GETBLOGPOST";
import GETBLOGALL from "../api/blogsall/GETBLOGALL";
import GenerateSlugs from "../../libs/GenerateSlugs";
import { subSections } from "@/libs/Section";
import DeSlugify from "@/libs/DeSlugify";
import { notFound } from "next/navigation";

interface params {
  params: {
    slug: string[];
  };
}

interface JsonValue {
  [key: string]: any;
}

type SEOType = {
  ogDescription: string;
  metaDescription: string;
  ogTitle: string;
  ogImage: string;
  primaryKeywords: string[];
  secondaryKeywords: string[];
};

export const revalidate = 86400;

export async function generateStaticParams() {
  const sluglayer = await GenerateSlugs(subSections);

  let paramsArray: any = [];
  let page = 0;
  const pageSize = 100;

  try {
    while (true) {
      // Fetch paginated blogs
      const response = await GETBLOGALL(page, pageSize);

      if (response.length === 0) {
        break; // Break loop when no more records
      }

      const titleArray = response?.map((item: any) => {
        if (item.section && item.subsection && item.subsubsection) {
          return {
            slug: [
              item.section.toLowerCase(),
              item.subsection.toLowerCase(),
              item.subsubsection.toLowerCase(),
              item.title.toLowerCase(),
            ],
          };
        }
      });
      // Append to params array
      paramsArray = [...paramsArray, ...titleArray];
      page++; // Move to the next page
    }
    console.log(`sluglayer`, sluglayer.length);
    console.log(`paramsArray`, paramsArray.length);
    return [...sluglayer.slice(0, 10), ...paramsArray.slice(0, 10)];
  } catch (error) {
    // console.error("Error fetching blogs:", error);
    return [];
  }
}

export async function generateMetadata({ params }: params): Promise<Metadata> {
  let categoryList: string[] = [];

  // await Delay();
  let pageNumber: number = 1;
  let slugs: string[] = [];

  let { slug } = params;
  let decodedslug = slug.map((item: string) => decodeURIComponent(item));
  let pageIndex = decodedslug.indexOf("page");
  let page = 1;

  let currentPost: Blogs | null = null;

  const input = decodedslug[decodedslug.length - 1]?.trim().toLowerCase();

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

  if (pageIndex !== -1 && pageIndex < decodedslug.length - 1) {
    pageNumber = parseInt(decodedslug[pageIndex + 1]);
    page = parseInt(decodedslug[pageIndex + 1]);
    decodedslug.splice(pageIndex, 2);
    slugs = decodedslug;
  }
  console.log(
    `SLUUGGGGG`,
    `${decodedslug[0] && `/${decodedslug[0]}`}${
      decodedslug[1] && `/${decodedslug[1]}`
    }${decodedslug[2] && `/${decodedslug[2]}`}`
  );

  if (decodedslug.length < 3) {
    return {
      title: ` 
      ${
        DeSlugify(decodedslug[decodedslug.length - 1])[0].toUpperCase() +
        DeSlugify(decodedslug[decodedslug.length - 1]).slice(1)
      } - ${categoryList?.map((item) => DeSlugify(` ${item}`))} & More`,
      description: `Here are the latest on ${DeSlugify(
        decodedslug[decodedslug.length - 1]
      )}, ${categoryList?.map((item) => DeSlugify(` ${item}`))} & More`,
      metadataBase: new URL(`${process.env.NEXT_PUBLIC_BASE_API_URL}`),
      alternates: {
        canonical: `/${decodedslug[0] && `/${decodedslug[0]}`}${
          decodedslug[1] && `/${decodedslug[1]}`
        }`,
      },
    };
  } else if (decodedslug.length === 3) {
    return {
      title: `${
        DeSlugify(decodedslug[decodedslug.length - 1])[0].toUpperCase() +
        DeSlugify(decodedslug[decodedslug.length - 1]).slice(1)
      }`,
      description: `Here are the latest on ${
        decodedslug[decodedslug.length - 1]
      }`,
      metadataBase: new URL(`${process.env.NEXT_PUBLIC_BASE_API_URL}`),
      alternates: {
        canonical: `/${decodedslug[0] && `/${decodedslug[0]}`}${
          decodedslug[1] && `/${decodedslug[1]}`
        }${decodedslug[2] && `/${decodedslug[2]}`}`,
      },
    };
  } else {
    try {
      const response = await GETBLOGPOST({
        title: decodedslug[decodedslug.length - 1],
      });
      if (response) {
        currentPost = response;
      }

      return {
        title: DeSlugify(currentPost?.title || ""),
        description: (currentPost?.seo as SEOType)?.metaDescription,
        keywords: [
          ...((currentPost?.seo as SEOType)?.primaryKeywords
            ? (currentPost?.seo as SEOType)?.primaryKeywords
            : []),
          ...((currentPost?.seo as SEOType)?.secondaryKeywords
            ? (currentPost?.seo as SEOType)?.secondaryKeywords
            : []),
        ],
        openGraph: {
          images: [
            {
              url: currentPost?.imageurl || "",
            },
          ],
        },
        metadataBase: new URL(`${process.env.NEXT_PUBLIC_BASE_API_URL}`),

        alternates: {
          canonical: `/${decodedslug[0] && `/${decodedslug[0]}`}${
            decodedslug[1] && `/${decodedslug[1]}`
          }${decodedslug[2] && `/${decodedslug[2]}`}${
            decodedslug[3] && `/${decodedslug[3]}`
          }`,
        },
      };
    } catch (e) {
      console.log(`errrorr`, e);
      return {};
    }
  }
}

function validateCategoryPath(pathArray: string[], sections: object) {
  // Check if the length of the array is less than 4
  if (pathArray.length >= 4) {
    return false; // Invalid length
  }

  let currentSection: any = sections;

  // Iterate through each element in the path array
  for (let i = 0; i < pathArray.length; i++) {
    const currentCategory = pathArray[i];

    // Convert the section to lowercase and match it with lowercased keys
    const matchingKey = Object.keys(currentSection).find(
      (key) => key.toLowerCase() === currentCategory.toLowerCase()
    );

    if (matchingKey) {
      currentSection = currentSection[matchingKey]; // Go deeper into the next section
    } else if (
      Array.isArray(currentSection) &&
      // currentSection.includes(currentCategory)
      currentSection.some(
        (category: string) =>
          category.toLowerCase() === currentCategory.toLowerCase()
      )
    ) {
      return true; // If we reach the end and it's an array that contains the category
    } else {
      return false; // If the category is not found at any level
    }
  }

  // If the loop completes, it means the path exists
  return true;
}

async function BlogCategory({ params }: params) {
  let sidebar = false;
  let posts: Blogs[] = [];
  let relposts: Blogs[] = [];
  let latposts: Blogs[] = [];
  let totalPages = 1;
  let totalBlogs: number = 1;
  let hasNextPage = false;
  let pageNumber: number = 1;
  // let currentPost: {
  //   id: string;
  //   author: string;
  //   title: string;
  //   imageurl: string;
  //   imagealt: string;
  //   quote: string;
  //   section: string;
  //   subsection: string;
  //   subsubsection: string;
  //   content: JsonValue[];
  //   seo: JsonValue;
  //   creationDate: Date;
  // } | null = null;
  let currentPost: Blogs | null = null;

  let slugs: string[] = [];

  let page = 1;

  let { slug } = params;
  let decodedslug = slug.map((item: string) => decodeURIComponent(item));
  slugs = decodedslug;

  let pageIndex = decodedslug.indexOf("page");
  if (pageIndex !== -1 && pageIndex < decodedslug.length - 1) {
    // if (pageIndex !== -1 && decodedslug[decodedslug.length - 1] == "page") {
    pageNumber = parseInt(decodedslug[pageIndex + 1]);
    page = parseInt(decodedslug[pageIndex + 1]);
    decodedslug.splice(pageIndex, 2);
    slugs = decodedslug;
  }

  // if (decodedslug.length < 4) {
  //   console.log(`weferwfwe`, decodedslug);
  //   decodedslug.map((item) => {
  //     if (!isCategoryPresent(item, subSections)) {
  //       return notFound();
  //     }
  //   });
  // }
  const moddecodedslug = decodedslug.slice(0, 3);

  if (!validateCategoryPath(moddecodedslug, subSections)) {
    return notFound();
  }

  if (decodedslug.length === 1) {
    // if (!isCategoryPresent(decodedslug[0], subSections)) {
    //   return notFound();
    // }
    const response = await GETBLOGSLAYER({
      category: decodedslug[0],
      pageNo: page,
    });
    if (!response) {
      return notFound();
    }

    posts = response.blogs;
    totalPages = response.metaData.totalPages;
    hasNextPage = response.metaData.hasNextPage;
    totalBlogs = response.metaData.totalBlogs;
  } else if (decodedslug.length === 2) {
    // if (!isCategoryPresent(decodedslug[1], subSections)) {
    //   return notFound();
    // }
    const response = await GETBLOGSLAYER({
      subCategory: decodedslug[1],
      pageNo: page,
    });
    if (!response) {
      return notFound();
    }

    posts = response.blogs;
    totalPages = response.metaData.totalPages;
    hasNextPage = response.metaData.hasNextPage;
    totalBlogs = response.metaData.totalBlogs;
  } else if (decodedslug.length === 3) {
    const response = await GETBLOGSLAYER({
      subSubCategory: decodedslug[2],
      pageNo: page,
    });
    if (!response) {
      return notFound();
    }

    posts = response.blogs;
    totalPages = response.metaData.totalPages;
    hasNextPage = response.metaData.hasNextPage;
    totalBlogs = response.metaData.totalBlogs;
  } else if (decodedslug.length > 3) {
    const response = await GETBLOGPOST({
      title: decodedslug[decodedslug.length - 1],
    });
    if (!response) {
      return notFound();
    }

    currentPost = response;
  }
  // ----------------------------

  if (currentPost?.subsubsection) {
    const response = await GETBLOGSLAYER({
      subSubCategory: currentPost.subsubsection,
      pageNo: 1,
      pageSize: "24",
    });

    if (response) {
      relposts = response.blogs;
    }
  } else if (currentPost?.subsection) {
    const response = await GETBLOGSLAYER({
      subCategory: currentPost.subsection,
      pageNo: 1,
      pageSize: "24",
    });

    if (response) {
      relposts = response.blogs;
    }
  } else if (currentPost?.section) {
    const response = await GETBLOGSLAYER({
      category: currentPost.section,
      pageNo: 1,
      pageSize: "24",
    });

    if (response) {
      relposts = response.blogs;
    }
  }
  // ----------------------------

  if (currentPost?.subsection) {
    const response = await GETBLOGSLAYER({
      subCategory: currentPost.subsection,
      pageNo: 1,
      pageSize: "24",
    });

    if (response) {
      latposts = response.blogs;
    }
  } else if (currentPost?.section) {
    const response = await GETBLOGSLAYER({
      category: currentPost.section,
      pageNo: 1,
      pageSize: "24",
    });

    if (response) {
      latposts = response.blogs;
    }
  } else if (currentPost?.subsubsection) {
    const response = await GETBLOGSLAYER({
      subSubCategory: currentPost.subsubsection,
      pageNo: 1,
      pageSize: "24",
    });

    if (response) {
      latposts = response.blogs;
    }
  }
  return (
    <>
      {currentPost ? (
        <>
          <CategoryPost decodedslug={slugs} totalBlogs={totalBlogs} />
          <BlogDisplay
            decodedslug={decodedslug}
            currentPost={currentPost || []}
            posts={relposts}
            latposts={latposts}
          />
        </>
      ) : (
        <>
          <Category decodedslug={slugs} totalBlogs={totalBlogs} />
          <BlogList posts={posts} />{" "}
          <Paginationbloglist
            pageNo={pageNumber}
            totalPages={totalPages}
            hasNextPage={hasNextPage}
            slug={slugs}
          />
        </>
      )}
    </>
  );
}

export default BlogCategory;
