import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'placeholder-key'

// Validate that we have proper Supabase configuration
if (!supabaseUrl || supabaseUrl === 'https://placeholder.supabase.co') {
  console.warn('Supabase URL not configured. Please set REACT_APP_SUPABASE_URL in your .env file')
}

if (!supabaseAnonKey || supabaseAnonKey === 'placeholder-key') {
  console.warn('Supabase Anon Key not configured. Please set REACT_APP_SUPABASE_ANON_KEY in your .env file')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)