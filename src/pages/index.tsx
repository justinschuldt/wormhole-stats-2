import { PageProps } from "gatsby";
import { tvb } from "../utils/urls";

// Check if window is defined (so if in the browser or in node.js).
const isBrowser = typeof window !== "undefined";

const IndexPage = ({ navigate }: PageProps) => {
  if (isBrowser) {
    navigate(process.env.GATSBY_SITE_URL + tvb)
  }
  return null
};

export default IndexPage;
