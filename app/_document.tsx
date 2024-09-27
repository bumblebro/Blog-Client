import Script from "next/script";

<Script
  id="partydown"
  data-partytown-config
  dangerouslySetInnerHTML={{
    __html: `
          partytown = {
            lib: "/_next/static/~partytown/",
            forward: ["gtag"]           
          };
        `,
  }}
/>;
