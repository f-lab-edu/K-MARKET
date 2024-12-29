import { createClient } from '@supabase/supabase-js';

// 환경변수에서 Supabase URL과 Key를 불러옵니다.
const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseKey = process.env.SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseKey);
