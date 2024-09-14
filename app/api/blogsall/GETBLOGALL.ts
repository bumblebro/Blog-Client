import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

const prisma = new PrismaClient().$extends(withAccelerate());

export default async function GETBLOGALL(page = 0, pageSize = 100) {
  const blogs = await prisma.blogs.findMany({
    select: {
      section: true,
      subsection: true,
      subsubsection: true,
      title: true,
    },
    skip: page * pageSize,
    take: pageSize,
    cacheStrategy: { ttl: 60 },
  });
  return blogs;
}
