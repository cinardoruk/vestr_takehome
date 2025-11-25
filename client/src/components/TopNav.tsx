//- import {
//-   NavigationMenu,
//-   NavigationMenuContent,
//-   //- NavigationMenuIndicator,
//-   NavigationMenuItem,
//-   NavigationMenuLink,
//-   NavigationMenuList,
//-   NavigationMenuTrigger,
//-   //- NavigationMenuViewport,
//- } from "@/components/ui/navigation-menu";

import { Button } from "@/components/ui/button";
import SearchBar from "./SearchBar";
import NavMenu from "./NavMenu";

import { CiHeart } from "react-icons/ci";
import { GoGear } from "react-icons/go";

function TopNav() {
  return (
    <div className="flex justify-between my-2 py-5 border-y-1 border-y-gray-500/30">
      <div className="flex flex-col text-left ms-10">
        <img src="vestr_icon.svg" alt="vestr_logo" className="mb-1" />
        <div className="text-gray-400  ">Financial literacy and</div>
        <div className="text-gray-400 ">simulated investing.</div>
      </div>

      <div className="">
        <SearchBar />
        <NavMenu />
      </div>

      <div className="me-10">
        <Button className="w-40 mb-2 cursor-pointer" variant="outline">
          Profile
        </Button>
        <div className="flex justify-between [&>*]:rounded-2xl *:cursor-pointer">
          <Button variant="outline" size="icon">
            <CiHeart />
          </Button>
          <Button variant="outline" size="icon">
            <img src="vestr_logo_V.svg" alt="" />
          </Button>
          <Button variant="outline" size="icon">
            <GoGear />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default TopNav;
