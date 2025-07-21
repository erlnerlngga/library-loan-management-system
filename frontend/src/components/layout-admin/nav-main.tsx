import { type Icon } from "@tabler/icons-react";
import { useLocation, Link } from "react-router"; // Import useLocation and Link from "react-router"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: Icon;
  }[];
}) {
  const location = useLocation(); // Get the current location
  const activeLinkClass =
    "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear";

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => {
            // Determine if the current item's URL matches the current location's pathname
            const isActive = location.pathname === item.url;

            return (
              <SidebarMenuItem key={item.title}>
                {/* Use Link and manually apply class based on isActive */}
                <Link
                  to={item.url}
                  className={`flex items-center gap-2 rounded-md p-2 text-sm ${
                    isActive ? activeLinkClass : ""
                  }`}
                >
                  {item.icon && <item.icon className="h-4 w-4" />}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
