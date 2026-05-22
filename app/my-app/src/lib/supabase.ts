import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://lucekbmcnixltklncgtt.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_lSAv6iyXKkE5IoHCUcsQUw_wsT8-S7x';

export const supabase = createClient(supabaseUrl, supabaseKey);
