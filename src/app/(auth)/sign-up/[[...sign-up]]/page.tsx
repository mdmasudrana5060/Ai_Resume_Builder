import { SignUp } from "@clerk/nextjs";

const page = () => {
  return (
    <div className="flex h-screen items-center justify-center ">
      <SignUp appearance={{ baseTheme: undefined }} />
    </div>
  );
};
export default page;
