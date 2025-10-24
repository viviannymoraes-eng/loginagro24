//npm install @supabase/supabase-js
import { createClient } from "@supabase/supabase-js";

//Lendo as variavis do .env
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);