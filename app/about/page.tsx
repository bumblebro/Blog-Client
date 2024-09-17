import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_BASE_API_URL}`),
  alternates: {
    canonical: "/about",
  },
};

function page() {
  return (
    <div className="flex flex-col  gap-4 px-4 pb-3 my-[130px] md:my-[105px]   md:max-w-[45rem] mx-auto w-full leading-[1.7rem] font-[330] text-black ">
      <h1 className="text-center text-3xl font-semibold py-6">About Us</h1>
      <p>
        Welcome to WordofMany, a vibrant platform dedicated to exploring the
        vast expanse of knowledge through the art of storytelling. We&rsquo;re
        more than just a website&mdash;we&rsquo;re a community of curious minds,
        a destination where ideas meet exploration, and words turn into an
        ever-growing collection of insights, thoughts, and perspectives.
      </p>

      <p>
        At WordofMany, we believe that every story matters, and every word can
        spark a new thought or inspire a different way of looking at the world.
        Our mission is simple yet profound: to provide our readers with content
        that educates, informs, and ignites curiosity. We cover a diverse range
        of topics, from the latest trends in technology, health, and lifestyle,
        to deep dives into the intriguing and unexplored corners of history,
        culture, and science.
      </p>

      <p>
        What sets WordofMany apart is our commitment to quality. Our team is
        dedicated to crafting content that resonates with our readers, whether
        it&rsquo;s offering insightful guides, uncovering hidden gems in niche
        subjects, or providing thought-provoking commentary on current events.
        We believe that true engagement comes from delivering stories that not
        only entertain but also enrich the minds of our audience.
      </p>

      <p>
        But WordofMany is more than just about the words on the
        page&mdash;it&rsquo;s about the connections those words create. We aim
        to foster a community where readers can immerse themselves in content
        that sparks conversation, fuels inspiration, and broadens perspectives.
        Our platform is a space for those who seek more than just surface-level
        reading, for those who are eager to dive deep into knowledge, learn
        something new every day, and expand their horizons.
      </p>

      <p>
        Whether you&rsquo;re here to stay ahead of trends, get inspired by new
        ideas, or simply learn something you didn&rsquo;t know before,
        WordofMany is your partner in discovery. We are constantly evolving,
        bringing you fresh content that&rsquo;s designed to engage, inform, and,
        above all, inspire.
      </p>

      <p>
        Join us on this journey of endless discovery, where words become more
        than just letters&mdash;they become the gateway to understanding,
        learning, and inspiration. Welcome to WordofMany&mdash;where the power
        of words creates a world without limits.
      </p>
    </div>
  );
}

export default page;
