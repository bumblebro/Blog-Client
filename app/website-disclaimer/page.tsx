import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer",
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_BASE_API_URL}`),
  alternates: {
    canonical: "/website-disclaimer",
  },
};

function page() {
  return (
    <div className="flex flex-col  gap-4 px-4 pb-3 my-[130px] md:my-[105px]   md:max-w-[45rem] mx-auto w-full leading-[1.7rem] font-[330] text-black ">
      <h1 className="text-center text-3xl font-semibold py-6">
        Website Disclaimer
      </h1>
      <p>Last updated: 2024-09-10</p>
      <p className="text-lg  font-semibold">Website Disclaimer</p>
      <p>
        The information provided by <b>Word of Many</b> (“Company”, “we”, “our”,
        “us”) on <b>https://www.wordofmany.com</b> (the “Site”) is for general
        informational purposes only. All information on the Site is provided in
        good faith, however we make no representation or warranty of any kind,
        express or implied, regarding the accuracy, adequacy, validity,
        reliability, availability, or completeness of any information on the
        Site.
      </p>
      <p>
        UNDER NO CIRCUMSTANCE SHALL WE HAVE ANY LIABILITY TO YOU FOR ANY LOSS OR
        DAMAGE OF ANY KIND INCURRED AS A RESULT OF THE USE OF THE SITE OR
        RELIANCE ON ANY INFORMATION PROVIDED ON THE SITE. YOUR USE OF THE SITE
        AND YOUR RELIANCE ON ANY INFORMATION ON THE SITE IS SOLELY AT YOUR OWN
        RISK.
      </p>
      <p className="text-lg  font-semibold capitalize">
        External Links Disclaimer
      </p>
      <p>
        The Site may contain (or you may be sent through the Site) links to
        other websites or content belonging to or originating from third parties
        or links to websites and features. Such external links are not
        investigated, monitored, or checked for accuracy, adequacy, validity,
        reliability, availability or completeness by us.
      </p>
      <p>
        For example, the outlined{" "}
        <a href="https://policymaker.io/disclaimer/">Disclaimer</a> has been
        created using <a href="https://policymaker.io/">PolicyMaker.io</a>, a
        free web application for generating high-quality legal documents.
        PolicyMaker’s{" "}
        <a href="https://policymaker.io/disclaimer/">disclaimer generator</a> is
        an easy-to-use tool for creating an excellent sample Disclaimer template
        for a website, blog, eCommerce store or app.
      </p>
      <p>
        WE DO NOT WARRANT, ENDORSE, GUARANTEE, OR ASSUME RESPONSIBILITY FOR THE
        ACCURACY OR RELIABILITY OF ANY INFORMATION OFFERED BY THIRD-PARTY
        WEBSITES LINKED THROUGH THE SITE OR ANY WEBSITE OR FEATURE LINKED IN ANY
        BANNER OR OTHER ADVERTISING. WE WILL NOT BE A PARTY TO OR IN ANY WAY BE
        RESPONSIBLE FOR MONITORING ANY TRANSACTION BETWEEN YOU AND THIRD-PARTY
        PROVIDERS OF PRODUCTS OR SERVICES.
      </p>
      <p className="text-lg  font-semibold capitalize">
        Professional Disclaimer
      </p>
      <p>
        The Site can not and does not contain legal advice. The information is
        provided for general informational and educational purposes only and is
        not a substitute for professional legal advice. Accordingly, before
        taking any actions based upon such information, we encourage you to
        consult with the appropriate professionals. We do not provide any kind
        of legal advice.
      </p>{" "}
      <p>
        Content published on https://www.wordofmany.com is intended to be used
        and must be used for informational purposes only. It is very important
        to do your own analysis before making any decision based on your own
        personal circumstances. You should take independent legal advice from a
        professional or independently research and verify any information that
        you find on our Website and wish to rely upon.{" "}
      </p>
      <p>
        THE USE OR RELIANCE OF ANY INFORMATION CONTAINED ON THIS SITE IS SOLELY
        AT YOUR OWN RISK.
      </p>
      <p className="text-lg  font-semibold capitalize">
        Errors and Omissions Disclaimer
      </p>
      <p>
        While we have made every attempt to ensure that the information
        contained in this site has been obtained from reliable sources, Word of
        Many is not responsible for any errors or omissions or for the results
        obtained from the use of this information. All information in this site
        is provided “as is”, with no guarantee of completeness, accuracy,
        timeliness or of the results obtained from the use of this information,
        and without warranty of any kind, express or implied, including, but not
        limited to warranties of performance, merchantability, and fitness for a
        particular purpose.
      </p>{" "}
      <p>
        In no event will Word of Many, its related partnerships or corporations,
        or the partners, agents or employees thereof be liable to you or anyone
        else for any decision made or action taken in reliance on the
        information in this Site or for any consequential, special or similar
        damages, even if advised of the possibility of such damages.
      </p>
      <p className="text-lg  font-semibold capitalize">
        Logos and Trademarks Disclaimer
      </p>
      <p>
        All logos and trademarks of third parties referenced on
        https://www.wordofmany.com are the trademarks and logos of their
        respective owners. Any inclusion of such trademarks or logos does not
        imply or constitute any approval, endorsement or sponsorship of Word of
        Many by such owners.
      </p>
      <p className="text-lg  font-semibold capitalize">Contact Us</p>
      <p>
        Should you have any feedback, comments, requests for technical support
        or other inquiries, please contact us by email:{" "}
        <b>wordofmany@gmail.com</b>.
      </p>
    </div>
  );
}

export default page;
