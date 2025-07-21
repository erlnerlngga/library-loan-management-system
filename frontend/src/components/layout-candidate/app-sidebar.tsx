import * as React from "react";
import {
  IconHelp,
  IconInnerShadowTop,
  IconSearch,
  // IconSettings,
  IconFileText,
} from "@tabler/icons-react";

import { NavMain } from "@/components/layout-candidate/nav-main";
import { NavSecondary } from "@/components/layout-candidate/nav-secondary";
import { NavUser } from "@/components/layout-candidate/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  menuPatner: [
    {
      title: "Psikotest",
      url: "/psikotest",
      icon: IconFileText,
    },
  ],
  navSecondary: [
    // {
    //   title: "Settings",
    //   url: "/psikotest/settings",
    //   icon: IconSettings,
    // },
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "#",
      icon: IconSearch,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader className="mb-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">
                  Head Hunter Inc.
                </span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.menuPatner} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
