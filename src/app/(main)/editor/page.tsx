import { Metadata } from "next";
import ResumeEditor from "./ResumeEditor";

export const metaData: Metadata = {
  title: "Design your resume",
};
const Page = () => {
  return (
    <div>
      <ResumeEditor />
    </div>
  );
};
export default Page;
