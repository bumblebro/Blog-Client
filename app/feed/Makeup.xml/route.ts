import GETBLOGBYSECTION from "@/app/api/blogbysection/GETBLOGBYSECTION";
import BLOGCOMPLETE from "@/app/api/blogscomplete/BLOGCOMPLETE";
import DeSlugify from "@/libs/DeSlugify";
import { Blogs } from "@prisma/client";
import { Feed } from "feed";

export const revalidate = 0; // revalidate at most every Sec

const domain =
  process.env.NEXT_PUBLIC_BASE_API_URL?.replace(/^https:/, "http:") || "";

export async function GET(request: Request, response: Response) {
  const recipes = await GETBLOGBYSECTION({ subCategory: "Makeup" });
  // console.log(`rec`, recipes);

  const rss = generateRSSFeed(recipes);

  return new Response(rss, {
    status: 200,
    headers: { "Content-Type": "text/xml" },
  });
}

function generateRSSFeed(recipes: any) {
  const siteURL = process.env.NEXT_PUBLIC_BASE_API_URL || "";
  const date = new Date();
  const author = {
    name: "WordOfMany",
    link: "https://wordofmany.com",
  };

  const feed = new Feed({
    title: "WordOfMany",
    description:
      "Welcome to WordofMany, your go-to destination for all things women's lifestyle, fashion, beauty, wellness, and inspiration. More than just a website, we're a thriving community of modern women who celebrate self-expression, confidence, and creativity. From the latest style trends and beauty tips to heartfelt life moments and empowering advice, WordofMany is where your lifestyle finds its voice.",
    id: siteURL,
    link: siteURL,
    image: `${siteURL}/opengraph-image.png`,
    favicon: `${siteURL}/favicon.ico`,
    copyright: `All rights reserved ${date.getFullYear()}`,
    updated: date, // today's date
    generator: "Feed",
    feedLinks: {
      rss2: `${siteURL}/rss/feed.xml`, // xml format
      json: `${siteURL}/rss/feed.json`, // json fromat
    },
    author,
    language: "en-us",
  });

  recipes.map((r: any, i: any) => {
    const imageUrl =
      process.env.NEXT_PUBLIC_BASE_API_URL +
      `/api/og?` +
      `title=${r.title}` +
      `&cover=${r.imageurl}`;

    // console.log(`urllll`, imageUrl);

    const url = siteURL + "/" + r.slug;

    const cat1 = {
      name: r.section,
    };
    const cat2 = {
      name: r.subsection,
    };
    const cat3 = {
      name: r.subsubsection,
    };

    // if (imageUrl) {
    feed.addItem({
      title: DeSlugify(r.title),
      id: url,
      link: url,
      description: r.seo.ogDescription,
      // content: r.recipedescription,
      author: [author],
      contributor: [author],
      date: r.creationDate,
      category: [cat1, cat2, cat3],
      image: {
        type: "image/png",
        url:
          domain +
          `/api/og?title=${r.title}&amp;cover=${encodeURIComponent(
            r.imageurl
          )}`,
      },
    });
    // }
  });

  return feed.rss2();
}
