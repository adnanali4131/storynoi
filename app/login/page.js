import Login from "@/components/login/Login";
const Page = () => {
  return (
    <div className="w-[100vw] h-[100vh] bg-crayola-sky-blue flex justify-between items-center">
      <div className="flex-1"></div>
      <div className="flex-1">
        <Login width="440px" />
      </div>
    </div>
  );
};

export default Page;
