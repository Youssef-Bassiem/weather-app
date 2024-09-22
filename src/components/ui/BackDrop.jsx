import { LoadingSpinner } from "./LoadingSpinner";

const BackDrop = () => {
  return (
    <div className="fixed z-10 my-auto flex h-full w-full place-content-center place-items-center bg-[#2b304c] opacity-85">
      <LoadingSpinner className="z-10 h-12 w-12 text-black" />
    </div>
  );
};

export default BackDrop;
