import Header from "@/components/Header";
import FloatingButtons from "@/components/FloatingButtons";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-20">{children}</main>
      <FloatingButtons />
    </>
  );
}
