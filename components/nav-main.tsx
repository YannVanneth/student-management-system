"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";
import UpComingFeatures from "@/components/feature-comming-soon";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { IconType } from "react-icons/lib";
import Link from "next/link";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon | IconType;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                {item.isActive ? (
                  item.url == "#" ? (
                    <UpComingFeatures>
                      <SidebarMenuButton className="bg-primary text-white cursor-pointer">
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                        {item.items?.length == 0 ? null : (
                          <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        )}
                      </SidebarMenuButton>
                    </UpComingFeatures>
                  ) : (
                    <Link href={item.url}>
                      <SidebarMenuButton
                        tooltip={item.title}
                        className="bg-primary text-white cursor-pointer"
                      >
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                        {item.items?.length == 0 ? null : (
                          <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        )}
                      </SidebarMenuButton>
                    </Link>
                  )
                ) : item.url == "#" ? (
                  <UpComingFeatures>
                    <SidebarMenuButton className="hover:bg-primary hover:text-white cursor-pointer">
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                      {item.items?.length == 0 ? null : (
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      )}
                    </SidebarMenuButton>
                  </UpComingFeatures>
                ) : (
                  <Link href={item.url}>
                    <SidebarMenuButton
                      tooltip={item.title}
                      className="hover:bg-primary hover:text-white cursor-pointer"
                    >
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                      {item.items?.length == 0 ? null : (
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      )}
                    </SidebarMenuButton>
                  </Link>
                )}
              </CollapsibleTrigger>
              {item.items?.length == 0 ? null : (
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild>
                          <Link href={subItem.url}>
                            <span>{subItem.title}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              )}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
