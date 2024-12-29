import { Button } from "@repo/ui/components/button";
import { createClient } from "@/utils/supabase/server.ts";

export default async function Home() {
  /* TEST - Supabase로부터 사용자 정보를 가져옵니다. */
  const supabase = await createClient();
  const { data: users } = await supabase.from("users").select();
  console.log(users)

  return (
    <div>
      <Button size="sm" variant="destructive">
        button
      </Button>
    </div>
  );
}
