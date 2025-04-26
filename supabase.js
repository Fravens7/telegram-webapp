import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://syjduliqdjdntuhmprbv.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsIn...'
const supabase = createClient(supabaseUrl, supabaseKey)

export async function getHorarios() {
  const { data, error } = await supabase
    .from('horarios')
    .select('*')
    .order('fecha', { ascending: true })

  if (error) {
    console.error('Error trayendo horarios:', error)
    return []
  }
  return data
}
