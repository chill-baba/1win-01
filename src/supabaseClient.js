import { createClient } from '@supabase/supabase-js';

// Fallback credentials ensure client initializes even if Vercel build missed env variables
const FALLBACK_SUPABASE_URL = 'https://unxyahuwogvsdlmdnslt.supabase.co';
const FALLBACK_SUPABASE_ANON_KEY = 'sb_publishable_XXEKWkjFZTknYoWd9PDL8w_KnuYpmkK';

// Support VITE_, NEXT_PUBLIC_, or plain SUPABASE_ environment variables
const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  import.meta.env.NEXT_PUBLIC_SUPABASE_URL ||
  import.meta.env.SUPABASE_URL ||
  FALLBACK_SUPABASE_URL;

const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  import.meta.env.SUPABASE_ANON_KEY ||
  FALLBACK_SUPABASE_ANON_KEY;

let supabase = null;

if (supabaseUrl && supabaseAnonKey && supabaseUrl !== 'YOUR_SUPABASE_URL') {
  try {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
    console.log('✅ Supabase initialized successfully:', supabaseUrl);
  } catch (err) {
    console.error('❌ Failed to initialize Supabase client:', err);
  }
} else {
  console.warn('⚠️ Supabase credentials missing or invalid.');
}

export { supabase, supabaseUrl, supabaseAnonKey };
export default supabase;
