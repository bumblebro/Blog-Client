import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

// const prisma = new PrismaClient().$extends(withAccelerate());
const prisma = new PrismaClient();

export default async function BLOGCOMPLETE() {
  const blogs = await prisma.blogs.findMany({
    select: {
      author: true, // Name of the author
      section: true,
      subsection: true,
      subsubsection: true,
      title: true, // Title of the page
      slug: true, // URL-friendly slug for the blog
      imageurl: true, // URL of the main image
      content: true, // Short and detailed description of the recipe
      seo: true,
      creationDate: true, // Date the blog was created
    },
    orderBy: {
      // Replace 'createdAt' with the actual name of your date field
      creationDate: "desc",
    },

    // cacheStrategy: { ttl: 86400 },
  });
  return blogs;
}
