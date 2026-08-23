# Customer Profiles Setup

## Required Supabase Setup

Run this SQL in Supabase SQL Editor to create the customer_profiles table with RLS policies.

### SQL

```sql
-- Create customer_profiles table
CREATE TABLE customer_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  phone TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE customer_profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Allow users to read their own profile
CREATE POLICY "Users can read own profile" ON customer_profiles
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Allow users to update their own profile
CREATE POLICY "Users can update own profile" ON customer_profiles
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policy: Service role can insert (for signup API)
CREATE POLICY "Service role can insert" ON customer_profiles
  FOR INSERT
  WITH CHECK (auth.role() = 'service_role');

-- Policy: Service role can read all (for admin)
CREATE POLICY "Service role can read all" ON customer_profiles
  FOR SELECT
  USING (auth.role() = 'service_role');
```

### Enable Data API Access

1. Go to Supabase → Settings → Data API
2. Under "Exposed tables", toggle ON `public.customer_profiles`
3. Click Save

---

## Step-by-Step Instructions

1. Log into Supabase (https://supabase.com/dashboard)
2. Click on your CasitaCrew project
3. Click **SQL Editor** in the left sidebar
4. Click **New Query**
5. Copy the SQL above and paste it
6. Click **Run**
7. Check the **Data API** setting (see above)

You're done! Customer signups will now work. ✅
