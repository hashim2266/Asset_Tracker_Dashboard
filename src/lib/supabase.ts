/// <reference types="vite/client" />
import { createClient } from '@supabase/supabase-js';

// We fetch the keys implicitly from .env.local without exposing them here
const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL as string) || 'https://placeholder.supabase.co';
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY as string) || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);