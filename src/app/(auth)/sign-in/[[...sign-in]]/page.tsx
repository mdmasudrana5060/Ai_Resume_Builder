import { SignIn } from "@clerk/nextjs";

const page = () => {
  return (
    <main className="flex h-screen  justify-center p-3 mx-8">
      <SignIn appearance={{ baseTheme: undefined }} />
    </main>
  );
};
export default page;
