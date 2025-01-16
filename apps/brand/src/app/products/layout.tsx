import SidebarLayout from "@/shared/components/SidebarLayout";

interface ProductsLayoutProps {
  children: React.ReactNode;
}

export default function ProductsLayout({ children }: ProductsLayoutProps) {
  return <SidebarLayout>{children}</SidebarLayout>;
}
