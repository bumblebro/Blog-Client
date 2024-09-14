import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import { request } from "http";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient().$extends(withAccelerate());

const pageSize = 24;

export default async function GETBLOG({ pageNo }: { pageNo: string }) {
  const pageNum = parseInt(pageNo || "1");
  const take = pageSize;
  const skip = (pageNum - 1) * pageSize;

  const blogs = await prisma.blogs.findMany({
    skip,
    take,
    cacheStrategy: { ttl: 60 },
  });

  const totalBlogs = await prisma.blogs.count();
  return {
    blogs: blogs,
    metaData: {
      hasNextPage: take + skip < totalBlogs,
      totalPages: Math.ceil(totalBlogs / take),
      totalBlogs: totalBlogs,
    },
  };
}
