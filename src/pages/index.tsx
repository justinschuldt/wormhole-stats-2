import { PageProps } from "gatsby";
import { tvb } from "../utils/urls";

const IndexPage = ({ navigate }: PageProps) => {
  navigate(tvb)
  return null
};

export default IndexPage;
