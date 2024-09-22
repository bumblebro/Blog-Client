import Link from "next/link";

function Footer() {
  return (
    <div className="bg-black ">
      <div className="pt-11 pb-20 text-white text-center flex flex-col gap-14 px-4 mx-auto xl:max-w-[73rem] ">
        <div className="flex flex-col items-center gap-3 ">
          <h1 className="text-md font-medium">
            Want to join our exclusive community?
          </h1>
          <span className="w-1/12 border-b mb-1"></span>
          <form className="flex flex-col  gap-3 md:flex-row w-full md:w-[70%] md:gap-0   2xl:w-[50%]">
            <input
              className="  placeholder-slate-500 font-light w-full rounded-md py-2 text-center  md:text-start md:pl-4 md:rounded-r-none text-black"
              type="text"
              placeholder="Enter your email"
            />
            <button
              type="submit"
              className="bg-[#ee5631] text-black w-full rounded-md py-2 text-center font-semibold md:w-[50%]  2xl:w-[40%] md:rounded-l-none hover:bg-[#ff8769]"
            >
              Subscribe
            </button>
          </form>
        </div>
        <span className="w-full border-gray-600 border-[0.1px]"></span>
        <div className="flex flex-col  font-normal text-sm gap-4 md:flex-row md:justify-between md:items-center">
          {" "}
          <div className="gap-4 flex flex-col md:text-start">
            <Link className="hover:text-[#004ff2]" href={"/"}>
              Home
            </Link>
            <Link className="hover:text-[#004ff2]" href={"/about"}>
              About Us
            </Link>
            <Link className="hover:text-[#004ff2]" href={"/advertise"}>
              Advertise With Us
            </Link>
            <Link className="hover:text-[#004ff2]" href={"/contact"}>
              Contact Us
            </Link>
          </div>
          <div className="gap-4 flex flex-col md:text-end">
            <Link className="hover:text-[#004ff2]" href={"/privacy-policy"}>
              Privacy Policy
            </Link>
            <Link className="hover:text-[#004ff2]" href={"/website-disclaimer"}>
              Disclaimer
            </Link>
            <Link className="hover:text-[#004ff2]" href={"/terms"}>
              Terms and Conditions
            </Link>
          </div>
        </div>
        <p className="font-light text-sm italic px-4 text-center">
          WordofMany offers general content intended solely for informational
          purposes. The information provided is not a substitute for
          professional medical advice, diagnosis, treatment, or financial
          consultation. Always seek the advice of qualified professionals
          regarding any medical or financial decisions.
        </p>
        <p className="font-light text-sm text-[#757577] xl:w-[50%] text-center mx-auto">
          © 2024 Word of Many. All Rights Reserved.
        </p>
      </div>
    </div>
  );
}

export default Footer;
