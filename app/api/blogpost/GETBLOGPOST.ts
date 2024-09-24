import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { withAccelerate } from "@prisma/extension-accelerate";

// const prisma = new PrismaClient().$extends(withAccelerate());
const prisma = new PrismaClient();

export default async function GETBLOGPOST({ title }: { title: string }) {
  // const { searchParams } = new URL(req.url);
  try {
    const titlename = title || undefined;
    const blogs = await prisma.blogs.findFirst({
      where: {
        title: {
          equals: titlename,
          mode: "insensitive",
        },
      },

      // cacheStrategy: { ttl: 86400 },
    });
    return blogs;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch.");
  }
}
