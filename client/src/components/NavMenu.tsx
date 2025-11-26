import {
  NavigationMenu,
  //- NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  //- NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

function NavMenu() {
  interface navItem {
    text: string;
    href: string;
  }

  // v declare nav items and their hrefs here v
  const navItems: navItem[] = [
    {
      text: "Home",
      href: "/home",
    },
    {
      text: "Portfolios",
      href: "/portfolio",
    },
    {
      text: "Markets",
      href: "/markets",
    },
    {
      text: "Leaderboards",
      href: "/leaderboards",
    },
    {
      text: "News",
      href: "/news",
    },
    {
      text: "Research",
      href: "/research",
    },
  ];

  return (
    <NavigationMenu className="overflow-x-auto">
      <NavigationMenuList className="flex-nowrap">
        {navItems.map((item, index) => {
          return (
            <NavigationMenuItem key={index}>
              <NavigationMenuLink
                href={item.href}
                className="px-2 py-1 md:px-3 md:py-2 font-bold text-xs md:text-sm whitespace-nowrap"
              >
                {item.text}
              </NavigationMenuLink>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export default NavMenu;
