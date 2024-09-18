import GETBLOG from "@/app/api/blogs/GETBLOG";
import BlogList from "@/components/bloglist/BlogList";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import Paginationblog from "@/components/pagination/Paginationblog";
import Sidebar from "@/components/sidebar/Sidebar";
import { Blogs } from "@prisma/client";
import { Metadata } from "next";
import { stringify } from "querystring";
import { useEffect, useState } from "react";

interface params {
  params: {
    pageNo: Number;
  };
}

// export const revalidate = 86400;

export async function generateStaticParams() {
  const response = await GETBLOG({ pageNo: "1" });
  const totalpage = response.metaData.totalPages;
  const arr = [];
  for (let i = 1; i <= totalpage; i++) {
    arr.push({
      slug: ["page", i],
    });
  }
  console.log(`blogpageslug`, arr.length);
  return arr.slice(0, 10);
}

export async function generateMetadata({ params }: params): Promise<Metadata> {
  return {
    metadataBase: new URL(`${process.env.NEXT_PUBLIC_BASE_API_URL}`),
    title: `Blog - Page ${params.pageNo}`,
    description:
      "Enjoy access to the complete Word of Many's archived articles—every post and every page we have ever published.",
    alternates: {
      canonical: `/blog/page/${params.pageNo}`,
    },
  };
}

async function BlogPage({ params }: params) {
  let sidebar = false;
  let posts: Blogs[] = [];
  // const [pageNo, setPageNo] = useState("1");
  let totalPages = 1;
  let hasNextPage = false;
  let totalBlogs = 0;

  if (params.pageNo) {
    // const res = await fetch(
    //   `${
    //     process.env.NEXT_PUBLIC_BASE_API_URL
    //   }/api/blogs?pageNo=${params.pageNo.toString()}`,
    //   {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   }
    // );
    // const response = await res.json();
    const response = await GETBLOG({ pageNo: params.pageNo.toString() });

    if (response) {
      posts = response.blogs;
      // setPageNo(pageNumber);
      totalPages = response.metaData.totalPages;
      hasNextPage = response.metaData.hasNextPage;
      totalBlogs = response.metaData.totalBlogs;
    }
  } else {
    // const res = await fetch(
    //   `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/blogs?pageNo=${"1"}`,
    //   {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   }
    // );
    // const response = await res.json();
    const response = await GETBLOG({ pageNo: "1" });

    if (response) {
      posts = response.blogs;
      // setPageNo(pageNumber);
      totalPages = response.metaData.totalPages;
      hasNextPage = response.metaData.hasNextPage;
      totalBlogs = response.metaData.totalBlogs;
    }
  }

  return (
    <>
      {/* <Navbar SetSideBar={SetSideBar} sidebar={sidebar} /> */}
      {sidebar ? (
        <Sidebar />
      ) : (
        <>
          <div className="mt-32 md:mt-22 lg:mt-13">
            <h1 className="text-center  text-2xl font-semibold tracking-wider pb-4">
              The Latest News - Page {params.pageNo.toString()}
            </h1>
            <h1 className="text-center  text-sm font-semibold tracking-wider">
              {totalBlogs} Latest Posts Articles Published
            </h1>
            <BlogList posts={posts || []} />
            <Paginationblog
              pageNo={params.pageNo.toString()}
              totalPages={totalPages}
              hasNextPage={hasNextPage}
            />
          </div>
        </>
      )}
    </>
  );
}

export default BlogPage;
