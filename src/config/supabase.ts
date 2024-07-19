import { createClient } from "@supabase/supabase-js";

export const ebraiSupabase = createClient(
	import.meta.env.VITE_EBRAI_SUPABASE_URL as string,
	import.meta.env.VITE_EBRAI_ANON_KEY as string,
);

export const supabase = createClient(
	import.meta.env.VITE_SUPA_PROJECT_URL as string,
	import.meta.env.VITE_SUPA_ANON_KEY as string,
);
