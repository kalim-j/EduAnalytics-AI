export function validateEnv() {
  const required = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'GROQ_API_KEY',
  ];

  const missing = required.filter(
    (key) => !process.env[key]
  );

  if (missing.length > 0) {
    console.error('❌ Missing environment variables:', missing);
    throw new Error(`Missing: ${missing.join(', ')}`);
  }

  console.log('✅ All environment variables configured');
}
