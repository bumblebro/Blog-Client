import { NextRequest, NextResponse } from "next/server";
import { ImageResponse } from "@vercel/og";
import { url } from "inspector";
import DeSlugify from "@/libs/DeSlugify";

export const runtime = "experimental-edge";

async function loadGoogleFont() {
  // const url = "https://fonts.gogleapis.com/css2?family=Pacifico&display=swap";
  // const url = "https://fonts.googleapis.com/css2?family=Knewave&display=swap";
  // const url = "https://fonts.gogleapis.com/css2?family=Aclonica&display=swap";

  const url = "https://fonts.googleapis.com/css2?family=Anton+SC&display=swap";

  const css = await (await fetch(url)).text();
  const resource = css.match(
    /src: url\((.+)\) format\('(opentype|truetype)'\)/
  );

  if (resource) {
    const response = await fetch(resource[1]);
    if (response.status == 200) {
      return await response.arrayBuffer();
    }
  }

  throw new Error("failed to load font data");
}

async function loadFonts() {
  const regularFontData = await fetch(
    new URL("./SoinSansPro-Bold.ttf", import.meta.url)
  ).then((res) => res.arrayBuffer());

  const boldFontData = await fetch(
    new URL("./source-sans-pro.black.ttf", import.meta.url)
  ).then((res) => res.arrayBuffer());
  const lightFontData = await fetch(
    new URL("./source-sans-pro.extralight.ttf", import.meta.url)
  ).then((res) => res.arrayBuffer());

  return { regularFontData, boldFontData, lightFontData };
}

const phrases = [
  "The Most Amazing",
  "The Best",
  "Easy & Simple",
  "The Ultimate",
  "Simple & Easy",
];

export async function GET(req: NextRequest) {
  const { regularFontData, boldFontData, lightFontData } = await loadFonts();

  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") || "Default Title";
  // const description = searchParams.get("description") || "Default Description";
  const cover = searchParams.get("cover") || "";
  const num = searchParams.get("num") || "3";

  const templates = [
    <div
      key={"1"}
      style={{
        height: "100vh", // Fixed height for the container
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: "black",
        // backgroundImage: `url(${cover})`,
      }}
    >
      {/* <div
        style={{
          // height: "200px", // Fixed height for title
          // paddingTop: "5px",
          // paddingBottom: "25px",
          color: "white",
          textAlign: "center",
          paddingRight: "10px",
          paddingLeft: "10px",
          fontSize: "120px",
          fontWeight: "900",
          fontFamily: "source-sans-pro.black",
          textTransform: "uppercase",
        }}
      >
        {phrases[Math.floor(Math.random() * phrases.length)]}
      </div>{" "} */}
      <div
        style={{
          // height: "200px", // Fixed height for title
          paddingTop: "25px",
          paddingBottom: "25px",
          color: "white",
          textAlign: "center",
          paddingRight: "10px",
          paddingLeft: "10px",
          fontSize: "75px",
          fontFamily: "SoinSansPro-Bold",
          textTransform: "capitalize",
        }}
      >
        {DeSlugify(title)}
      </div>{" "}
      <div
        style={{
          // height: "60px", // Fixed height for footer text
          textAlign: "center",
          fontSize: "50px",
          color: "black",
          paddingRight: "30px",
          paddingLeft: "30px",
          fontStyle: "normal",
          backgroundColor: "#FFFFF7",
          fontWeight: 100,
          fontFamily: "source-sans-pro.extralight",
        }}
      >
        wordofmany.com
      </div>
      <img
        src={cover}
        alt="test"
        height={900}
        width={1000}
        style={{
          flexGrow: 1, // Ensures the image takes available space
          width: "100%",
          objectFit: "cover",
          objectPosition: "center",
        }}
      />
    </div>,
  ];

  const randomTemplate =
    templates[Math.floor(Math.random() * templates.length)];
  // const randomTemplate = templates[parseInt(0)];

  return new ImageResponse(randomTemplate, {
    width: 1000,
    height: 2000,

    fonts: [
      {
        name: "SoinSansPro-Bold",
        data: regularFontData,
        style: "normal",
        // weight: 900,
      },
      {
        name: "source-sans-pro.black",
        data: boldFontData,
        style: "normal",
        // weight: 900,
      },
      {
        name: "source-sans-pro.extralight",
        data: lightFontData,
        style: "normal",
        // weight: 900,
      },
      {
        name: "Geist",
        data: await loadGoogleFont(),
        weight: 500,
      },
    ],
  });
}
