import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Advertise with Us",
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_BASE_API_URL}`),
  alternates: {
    canonical: "/advertise",
  },
};

function page() {
  return (
    <div className="flex flex-col  gap-4 px-4 pb-3 my-[130px] md:my-[105px]   md:max-w-[45rem] mx-auto w-full leading-[1.7rem] font-[330] text-black h-[50vh]">
      <h1 className="text-center text-3xl font-semibold py-6">
        Advertise With Us
      </h1>
      <p className="text-center">Please Come Back Later</p>
    </div>
  );
}

export default page;
