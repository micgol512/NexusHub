import { Button } from "../ui/button";

export const Header = () => {
  return (
    <div className="flex flex-col text-nowrap justify-evenly  items-center p-10 pt-8 bg-gray-200 w-full  max-h-[224px] ">
      <div className="bg-yellow-50 w-full max-w-[1920px]">
        LOGO INPUT <Button variant={"destructive"}>SIGN IN</Button> albo dane
        urzytkownika
      </div>
      <div className="bg-cyan-800 w-full max-w-[1920px]">navigation</div>
      <hr />
    </div>
  );
};
