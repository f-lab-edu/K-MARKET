"use client";
import { FileUp, Search } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@repo/ui/components/sidebar";
import Link from "next/link";

interface SidebarLayoutProps {
  children: React.ReactNode;
}

const SidebarLayout = ({ children }: SidebarLayoutProps) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>{children}</main>
    </SidebarProvider>
  );
};

export default SidebarLayout;

const AppSidebar = () => {
  const productItems = [
    {
      icon: Search,
      url: "/products",
      title: "상품 조회/수정",
    },
    {
      icon: FileUp,
      url: "/products/register",
      title: "상품 등록",
    },
  ];
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>상품</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {productItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
};
