import SidebarLayout from "@/shared/components/SidebarLayout.tsx";


interface ProductsLayoutProps {
  children: React.ReactNode
}

export default function ProductsLayout({children}: ProductsLayoutProps) {
  return (
    <SidebarLayout>{children}</SidebarLayout>
  );
}
