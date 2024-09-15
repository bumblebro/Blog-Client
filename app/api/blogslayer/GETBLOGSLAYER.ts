import { Prisma, PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import { request } from "http";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient().$extends(withAccelerate());

export default async function GETBLOGSLAYER({
  category,
  subCategory,
  subSubCategory,
  pageSize,
  pageNo,
}: {
  category?: string;
  subCategory?: string;
  subSubCategory?: string;
  pageSize?: string;
  pageNo: number;
}) {
  try {
    // const { searchParams } = new URL(req.url);
    // const category = searchParams.get("category");
    // const subCategory = searchParams.get("subCategory");
    // const subSubCategory = searchParams.get("subSubCategory");
    const pagSize = parseInt(pageSize || "24");

    const pageNum = pageNo || 1;

    const take = pagSize;
    const skip = (pageNum - 1) * take;

    const whereClause: Prisma.BlogsWhereInput = {};

    if (category) {
      whereClause.section = {
        contains: category,
        mode: "insensitive",
      };
    }

    if (subCategory) {
      whereClause.subsection = {
        contains: subCategory,
        mode: "insensitive",
      };
    }

    if (subSubCategory) {
      whereClause.subsubsection = {
        contains: subSubCategory,
        mode: "insensitive",
      };
    }

    const blogs = await prisma.blogs.findMany({
      skip, // Number of records to skip
      take, // Number of records to take
      where: whereClause,
      cacheStrategy: { ttl: 60 },
    });

    const totalBlogs = await prisma.blogs.count({
      where: whereClause,
      cacheStrategy: { ttl: 60 },
    });
    return {
      blogs: blogs,
      metaData: {
        hasNextPage: take + skip < totalBlogs,
        totalPages: Math.ceil(totalBlogs / take),
        totalBlogs,
      },
    };
  } catch (error) {
    console.error("Database Error:", error);
    // throw new Error("Database Error");
  }
}
