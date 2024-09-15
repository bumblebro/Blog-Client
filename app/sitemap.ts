import { MetadataRoute } from "next";
import GETBLOG from "./api/blogs/GETBLOG";
import GenerateSlugs from "@/libs/GenerateSlugs";
import { subSections } from "@/libs/Section";
import GETBLOGALL from "./api/blogsall/GETBLOGALL";
import { Blogs } from "@prisma/client";
import { url } from "inspector";

async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const response = await GETBLOG({ pageNo: "1" });
  const totalpage = response.metaData.totalPages;
  const blogslug: MetadataRoute.Sitemap = [];

  for (let i = 1; i <= totalpage; i++) {
    blogslug.push({
      url: `${process.env.NEXT_PUBLIC_BASE_API_URL}/blog/page/${i}`,
    });
  }

  const sluglayer = await GenerateSlugs(subSections);
  const categoryslug: MetadataRoute.Sitemap = sluglayer.map((item: any) => {
    let str = "";
    item.slug.map((item: any) => {
      str = `${str.toLowerCase()}/${encodeURIComponent(item).toLowerCase()}`;
    });
    return {
      url: `${process.env.NEXT_PUBLIC_BASE_API_URL}${str.toLowerCase()}`,
    };
  });

  let paramsArray: any = [];
  let page = 0;
  const pageSize = 100;

  while (true) {
    // Fetch paginated blogs
    const response = await GETBLOGALL(page, pageSize);

    if (response.length === 0) {
      break; // Break loop when no more records
    }

    const titleslug: MetadataRoute.Sitemap = response?.map((item: any) => ({
      url: `${process.env.NEXT_PUBLIC_BASE_API_URL}/${encodeURIComponent(
        item.section
      ).toLowerCase()}/${encodeURIComponent(
        item.subsection
      ).toLowerCase()}/${encodeURIComponent(
        item.subsubsection
      ).toLowerCase()}/${encodeURIComponent(item.title).toLowerCase()}`,
    }));

    // Append to params array
    paramsArray = [...paramsArray, ...titleslug];
    page++; // Move to the next page
  }

  // const allblog = await GETBLOGALL();

  // const titleslug: MetadataRoute.Sitemap = allblog?.map((item: any) => ({
  //   url: `${process.env.NEXT_PUBLIC_BASE_API_URL}/${encodeURIComponent(
  //     item.section
  //   )}/${encodeURIComponent(item.subsection)}/${encodeURIComponent(
  //     item.subsubsection
  //   )}/${encodeURIComponent(item.title)}`,
  // }));

  return [
    {
      url: `${process.env.NEXT_PUBLIC_BASE_API_URL}/about`,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_API_URL}/privacy-policy`,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_API_URL}/website-disclaimer`,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_API_URL}/terms`,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_API_URL}`,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_API_URL}/blog`,
    },
    ...paramsArray,
    ...categoryslug,
    ...blogslug,
  ];
}

export default sitemap;
