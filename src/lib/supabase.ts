import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Stays null if the env vars are missing, so the page still loads and the form shows an error instead of crashing.
export const supabase = url && anonKey ? createClient(url, anonKey) : null;