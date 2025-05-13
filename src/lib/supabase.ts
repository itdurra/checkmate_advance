import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  'https://qhddaxndvqhiqdeazatg.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFoZGRheG5kdnFoaXFkZWF6YXRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgzODYyMjUsImV4cCI6MjA1Mzk2MjIyNX0.XsW8-pMWVpxJWSN22bx-U7I8ZJTV1fHld9frMfdkp-M'
);
