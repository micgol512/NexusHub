// import Image from "next/image";

export const Logo = () => {
  return (
    <div className="h-max flex flex-row justify-center items-center align-middle text-center gap-0 p-0 m-0 text-[var(--foreground)] font-semibold text-[32px] leading-[44px] tracking-[-0.01em]">
      <div className=" text-[var(--primary)]">Cyber</div>
      <div className="">Tech</div>
      {/* <Image
        src="https://i.ibb.co/LXYkp5PS/Cyber-Tech-removebg-preview.png"
        width={100}
        height={100}
        alt="logo"
      /> */}
    </div>
  );
};
