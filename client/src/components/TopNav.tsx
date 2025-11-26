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
    <div className="flex flex-col md:flex-row justify-between my-2 py-3 md:py-5 border-y-1 border-y-gray-500/30 gap-4 md:gap-0">
      <div className="flex flex-col text-left ms-2 md:ms-4 lg:ms-10">
        <img src="vestr_icon.svg" alt="vestr_logo" className="mb-1 w-20 md:w-auto" />
        <div className="text-gray-400 text-xs md:text-sm">Financial literacy and</div>
        <div className="text-gray-400 text-xs md:text-sm">simulated investing.</div>
      </div>

      <div className="flex-1 md:flex-initial px-2 md:px-0">
        <SearchBar />
        <NavMenu />
      </div>

      <div className="me-2 md:me-4 lg:me-10">
        <Button className="w-full md:w-40 mb-2 cursor-pointer" variant="outline">
          Profile
        </Button>
        <div className="flex justify-between gap-1 md:gap-2 [&>*]:rounded-2xl *:cursor-pointer">
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
