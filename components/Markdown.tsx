import markdownit from "markdown-it";
import ReactMarkdown from "react-markdown";
import Markdown from "markdown-to-jsx";

type Props = {
  text: string;
};
const md = markdownit();

function MarkdownComponent({ text }: Props) {
  const result = md.render(text);

  // return <div dangerouslySetInnerHTML={{ __html: result }}></div>;
  // return <ReactMarkdown>{text}</ReactMarkdown>;
  return <Markdown>{text}</Markdown>;
}

export default MarkdownComponent;
