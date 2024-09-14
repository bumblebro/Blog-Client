import markdownit from "markdown-it";
import ReactMarkdown from "react-markdown";
import Markdown from "markdown-to-jsx";

// const options = {
//   overrides: {
//     p: {
//       component: (props: any) => (
//         <p style={{ marginBottom: "10px" }} {...props} />
//       ),
//     },
//     h2: {
//       component: (props: any) => (
//         <h2
//           style={{ marginBottom: "20px", fontSize: "18px", fontWeight: "500" }}
//           {...props}
//         />
//       ),
//     },
//     h3: {
//       component: (props: any) => (
//         <h3
//           style={{ marginBottom: "20px", fontSize: "17px", fontWeight: "500" }}
//           {...props}
//         />
//       ),
//     },
//     strong: {
//       component: (props: any) => (
//         <strong
//           style={{  fontWeight: "500" }}
//           {...props}
//         />
//       ),
//     },
//     ul: {
//       component: (props: any) => (
//         <ul style={{ marginBottom: "10px" }} {...props} />
//       ),
//     },
//     ol: {
//       component: (props: any) => (
//         <ol style={{ marginBottom: "10px" }} {...props} />
//       ),
//     },
//     li: {
//       component: (props: any) => (
//         <li style={{ marginBottom: "5px" }} {...props} />
//       ),
//     },
//   },
// };

import React from "react";

// const options = {
//   overrides: {
//     p: {
//       component: (props: any) => (
//         <p style={{ marginBottom: "10px" }} {...props} />
//       ),
//     },
//     h2: {
//       component: (props: any) => (
//         <h2
//           style={{ marginBottom: "20px", fontSize: "18px", fontWeight: "500" }}
//           {...props}
//         />
//       ),
//     },
//     h3: {
//       component: (props: any) => (
//         <h3
//           style={{ marginBottom: "20px", fontSize: "17px", fontWeight: "500" }}
//           {...props}
//         />
//       ),
//     },
//     strong: {
//       component: (props: any) => (
//         <strong style={{ fontWeight: "500" }} {...props} />
//       ),
//     },
//     ul: {
//       component: (props: any) => (
//         <ul style={{ marginBottom: "10px", paddingLeft: "20px" }} {...props} />
//       ),
//     },
//     ol: {
//       component: (props: any) => (
//         <ol style={{ marginBottom: "10px", paddingLeft: "20px" }} {...props} />
//       ),
//     },
//     li: {
//       component: (props: any) => (
//         <li style={{ marginBottom: '5px' }}>
//           {/* Apply custom styles to strong elements within list items */}
//           {React.Children.map(props.children, child =>
//             child.type === 'strong' ? (
//               <strong style={{ fontWeight: '500' }}>{child.props.children}</strong>
//             ) : (
//               child
//             )
//           )}
//         </li>
//       ),
//     },
//   },
// };

const options = {
  overrides: {
    p: {
      component: (props: any) => (
        <p style={{ marginBottom: "10px" }} {...props} />
      ),
    },
    h2: {
      component: (props: any) => (
        <h2
          style={{ marginBottom: "20px", fontSize: "18px", fontWeight: "500" }}
          {...props}
        />
      ),
    },
    h3: {
      component: (props: any) => (
        <h3
          style={{ marginBottom: "20px", fontSize: "17px", fontWeight: "500" }}
          {...props}
        />
      ),
    },
    strong: {
      component: (props: any) => (
        <strong style={{ fontWeight: "500" }} {...props} />
      ),
    },
    ul: {
      component: (props: any) => (
        <ul
          style={{
            marginBottom: "10px",
            paddingLeft: "20px",
            listStyleType: "disc",
          }}
          {...props}
        />
      ),
    },
    ol: {
      component: (props: any) => (
        <ol
          style={{
            marginBottom: "10px",
            paddingLeft: "20px",
            listStyleType: "decimal",
          }}
          {...props}
        />
      ),
    },
    li: {
      component: (props: any) => (
        <li style={{ marginBottom: "5px" }}>
          {React.Children.map(props.children, (child) =>
            child.type === "strong" ? (
              <strong style={{ fontWeight: "500" }}>
                {child.props.children}
              </strong>
            ) : (
              child
            )
          )}
        </li>
      ),
    },
  },
};

type Props = {
  text: string;
};
const md = markdownit();

function MarkdownComponent({ text }: Props) {
  const result = md.render(text);

  // return <div dangerouslySetInnerHTML={{ __html: result }}></div>;
  // return <ReactMarkdown>{text}</ReactMarkdown>;
  return <Markdown options={options}>{text}</Markdown>;
}

export default MarkdownComponent;
