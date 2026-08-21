# CasitaCrew Supabase Setup Instructions

## 1. Create Tables

Go to your Supabase project → SQL Editor → Create a new query and paste this:

```sql
-- Provider profiles table
CREATE TABLE IF NOT EXISTS provider_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  trade TEXT NOT NULL CHECK (trade IN ('cleaning', 'handyman', 'electrician', 'plumber', 'snow-removal')),
  bio TEXT,
  location TEXT NOT NULL,
  service_area TEXT,
  hourly_rate DECIMAL(10, 2),
  price_range TEXT,
  years_experience INTEGER,
  verification_status TEXT NOT NULL DEFAULT 'pending' CHECK (verification_status IN ('pending', 'approved', 'rejected')),
  verification_date TIMESTAMP,
  rejection_reason TEXT,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  subscription_status TEXT DEFAULT 'inactive',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Verification documents table
CREATE TABLE IF NOT EXISTS verification_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_email TEXT NOT NULL,
  document_type TEXT NOT NULL CHECK (document_type IN ('id', 'license', 'insurance', 'wsib')),
  file_url TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_size INTEGER,
  uploaded_at TIMESTAMP DEFAULT NOW()
);

-- Admin logs table
CREATE TABLE IF NOT EXISTS admin_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  action TEXT NOT NULL,
  provider_email TEXT,
  admin_notes TEXT,
  rejection_reason TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_provider_profiles_status ON provider_profiles(verification_status);
CREATE INDEX idx_provider_profiles_email ON provider_profiles(user_email);
CREATE INDEX idx_verification_documents_email ON verification_documents(provider_email);
```

**Run this query**, then move to step 2.

---

## 2. Create Storage Bucket

1. Go to **Storage** in the left sidebar
2. Click **Create a new bucket**
3. Name it: `verification-documents`
4. **Uncheck** "Make it public" (we'll serve files via authenticated URLs)
5. Click **Create bucket**

---

## 3. Enable Row Level Security (RLS)

Go back to **SQL Editor** and run:

```sql
-- Enable RLS on all tables
ALTER TABLE provider_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE verification_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_logs ENABLE ROW LEVEL SECURITY;

-- Allow service role to bypass RLS (for API)
CREATE POLICY "Service role bypass" ON provider_profiles 
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role bypass" ON verification_documents 
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role bypass" ON admin_logs 
  FOR ALL USING (auth.role() = 'service_role');
```

---

## Done!

Your Supabase backend is ready. The APIs will now work with:
- Database tables for provider profiles and documents
- Storage bucket for file uploads
- Service role permissions for the API to write data

Next: Test the provider signup at `/provider/signup`
