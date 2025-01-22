import SignUpForm from "@/features/auth/components/form/SignUpForm";

export default async function Home() {
  return (
    <section className="max-w-screen-md m-auto py-4">
      <h2 className="text-2xl font-bold text-center py-3">회원가입</h2>
      <SignUpForm />
    </section>
  );
}
