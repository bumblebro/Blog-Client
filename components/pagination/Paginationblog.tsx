import Link from "next/link";

interface Props {
  pageNo?: string;
  totalPages: number;
  hasNextPage: boolean;
  category?: string;
  subCategory?: string;
  subSubCategory?: string;
}

function Paginationblog({ pageNo = "1", totalPages, hasNextPage }: Props) {
  const currentPage = parseInt(pageNo);

  const getPageRange = () => {
    const range = [];
    const firstPagesToShow = 3;
    const lastPagesToShow = 1;

    // Show first pages
    for (let i = 1; i <= Math.min(firstPagesToShow, totalPages); i++) {
      range.push(i);
    }

    // Add dots if there is a gap between the first pages and current page
    if (currentPage > firstPagesToShow + 2) {
      range.push("...");
    }

    // Show pages around the current page
    const start = Math.max(firstPagesToShow + 1, currentPage - 1);
    const end = Math.min(totalPages - lastPagesToShow, currentPage + 1);
    for (let i = start; i <= end; i++) {
      if (!range.includes(i)) {
        range.push(i);
      }
    }

    // Add dots if there is a gap between the current page and last pages
    if (currentPage < totalPages - lastPagesToShow - 1) {
      range.push("...");
    }

    // Show last pages
    for (
      let i = Math.max(totalPages - lastPagesToShow + 1, 1);
      i <= totalPages;
      i++
    ) {
      if (!range.includes(i)) {
        range.push(i);
      }
    }

    return range;
  };

  const pages = getPageRange();

  if (totalPages === 1) return null;

  return (
    <div>
      <nav className="flex justify-between items-center mb-10  px-4 mx-auto xl:max-w-[73rem]">
        <Link
          className={`flex justify-start font-medium ${
            currentPage == 1 && "invisible"
          }`}
          href={`/blog/page/${currentPage - 1}`}
        >
          <div className="bg-black text-white py-3 px-4 rounded-lg flex  items-center gap-2  md:px-8 tracking-widest hover:bg-[#004ff2]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
              className="w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>{" "}
            <p>Prev</p>
          </div>
        </Link>
        {/* <div className="invisible md:visible md:w-[30%] flex justify-between">
          {pages.map((page, i) => {
            return (
              <Link key={i} href={`/blog/page/${page}`}>
                {page}
              </Link>
            );
          })}
        </div> */}
        <div className="hidden md:flex md:w-[30%]  justify-center gap-4">
          {pages.map((page, i) => (
            <div
              key={i}
              className={`py-2 px-4 rounded-lg ${
                page === currentPage ? "bg-black text-white" : "text-black"
              }`}
            >
              {page === "..." ? (
                <span className="text-gray-500">...</span>
              ) : (
                <Link
                  className="hover:text-[#004ff2]"
                  href={`/blog/page/${page}`}
                >
                  {page}
                </Link>
              )}
            </div>
          ))}
        </div>

        <Link
          className={`flex justify-end font-medium ${
            !hasNextPage && "invisible"
          }`}
          // href={`/blog/page/${currentPage + 1}`}
          href={`/blog/page/${currentPage + 1}`}
        >
          <div className="bg-black text-white py-3 px-4 rounded-lg flex  items-center gap-2 md:px-8 tracking-widest hover:bg-[#004ff2]">
            <p>Next</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
              className="w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </div>
        </Link>
      </nav>
    </div>
  );
}

export default Paginationblog;
