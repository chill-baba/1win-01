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

/**
 * Inserts a record into Supabase, automatically pruning any columns that don't
 * exist in the database table schema (e.g. PGRST204: Could not find 'xyz' column).
 */
export async function safeInsert(table, initialPayload) {
  if (!supabase) {
    console.warn('⚠️ Supabase client not initialized.');
    return { success: false, error: 'Supabase client not initialized' };
  }

  let payload = { ...initialPayload };

  // Strip undefined/null keys from initial payload
  Object.keys(payload).forEach((k) => {
    if (payload[k] === undefined) delete payload[k];
  });

  for (let attempt = 0; attempt < 8; attempt++) {
    try {
      const { data, error } = await supabase.from(table).insert([payload]);
      if (!error) {
        console.log(`✅ Successfully saved to Supabase (${table}):`, payload);
        return { success: true, data, payload };
      }

      // Check if error is due to a column not existing in the schema cache
      const match = error.message && error.message.match(/Could not find the '([^']+)' column/i);
      if (match && match[1] && Object.prototype.hasOwnProperty.call(payload, match[1])) {
        const missingCol = match[1];
        console.warn(`Column '${missingCol}' does not exist in table '${table}'. Pruning and retrying...`);
        delete payload[missingCol];
        continue;
      }

      console.error(`Error inserting into ${table}:`, error);
      return { success: false, error, payload };
    } catch (err) {
      console.error(`Unexpected exception inserting into ${table}:`, err);
      return { success: false, error: err, payload };
    }
  }

  return { success: false, error: 'Max retries reached', payload };
}

export { supabase, supabaseUrl, supabaseAnonKey };
export default supabase;
