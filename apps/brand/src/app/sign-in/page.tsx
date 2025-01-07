import SignInForm from "@/features/auth/components/form/SignInForm.tsx";

export default async function Home() {
  return (
    <section className="flex items-center justify-center h-screen">
      <div>
        <h1 className="text-4xl font-bold text-center py-3">K-MARKET</h1>
        <SignInForm />
      </div>
    </section>
  );
}
