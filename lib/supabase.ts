import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://evkdxsjeuympuuhjavle.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY || process.env.NEXT_PUBLIC_SUPABASE_KEY || ''

if (!supabaseKey) {
  console.warn('Missing Supabase key. Please set SUPABASE_KEY or NEXT_PUBLIC_SUPABASE_KEY environment variable.')
}

export const supabase = createClient(supabaseUrl, supabaseKey)

