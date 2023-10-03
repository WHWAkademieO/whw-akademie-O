import Image from "next/image";

const LoadingOverlay = (props) => {
  return (
    <div id="globalLoader" className="w-screen h-screen bg-black fixed left-0 top-0 z-[999]">
      <div className="absolute top-1/2 left-1/2 z-[100] -translate-y-1/2 -translate-x-1/2 ">
        <Image src={"/logo.png"} width={200} height={200} alt="logo-loading" />
      </div>
    </div>
  );
};

export default LoadingOverlay;
