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
      str = `${str}/${encodeURIComponent(item)}`;
    });
    return {
      url: `${process.env.NEXT_PUBLIC_BASE_API_URL}${str}`,
    };
  });
  const allblog = await GETBLOGALL();

  const titleslug: MetadataRoute.Sitemap = allblog?.map((item: Blogs) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_API_URL}/${encodeURIComponent(
      item.section
    )}/${encodeURIComponent(item.subsection)}/${encodeURIComponent(
      item.subsubsection
    )}/${encodeURIComponent(item.title)}`,
  }));

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
    ...blogslug,
    ...titleslug,
    ...categoryslug,
  ];
}

export default sitemap;
