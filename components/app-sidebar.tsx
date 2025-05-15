"use client";

import * as React from "react";
import { BookOpen, Frame, Info, Map, PieChart, Settings2 } from "lucide-react";

import { PiStudent } from "react-icons/pi";
import { FaChalkboardTeacher } from "react-icons/fa";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import RuppLogo from "./rupp_logo";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Students Management",
      url: "/students",
      icon: PiStudent,
      isActive: true,
      items: [],
    },
    {
      title: "Professors Management",
      url: "#",
      icon: FaChalkboardTeacher,
      items: [],
    },
    {
      title: "Courses Management",
      url: "#",
      icon: BookOpen,
      items: [],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [],
    },
  ],
  projects: [
    {
      name: "About me",
      url: "https://portfolio-yannvanneths-projects.vercel.app/",
      icon: Info,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5 "
            >
              <RuppLogo />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <div className="font-bold text-xs px-3 text-neutral-700">
          Developed by <span className="text-primary">@Vanneth Yann</span>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
