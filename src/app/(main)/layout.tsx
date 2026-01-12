import Navbar from "@/src/components/Shared/Navbar/Navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      {children}
    </div>
  );
};
export default Layout;
