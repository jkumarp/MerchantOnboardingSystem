/*
  # Create users metadata table

  1. New Tables
    - `users_metadata`
      - `id` (uuid, primary key, foreign key to auth.users)
      - `name` (text, not null)
      - `role` (enum: 'Admin', 'Merchant', default 'Merchant')
      - `created_at` (timestamp with timezone, default now())

  2. Security
    - Enable RLS on `users_metadata` table
    - Add policies for users to read/update their own data
    - Add policies for admins to manage all users

  3. Functions
    - Create function to handle user registration
    - Create trigger to automatically create metadata on user signup
*/

-- Create role enum type
CREATE TYPE user_role AS ENUM ('Admin', 'Merchant');

-- Create users_metadata table
CREATE TABLE IF NOT EXISTS users_metadata (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  role user_role DEFAULT 'Merchant',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE users_metadata ENABLE ROW LEVEL SECURITY;

-- Policies for users to read/update their own data
CREATE POLICY "Users can read own metadata"
  ON users_metadata
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own metadata"
  ON users_metadata
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Policies for admins to manage all users
CREATE POLICY "Admins can read all metadata"
  ON users_metadata
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users_metadata
      WHERE id = auth.uid() AND role = 'Admin'
    )
  );

CREATE POLICY "Admins can insert metadata"
  ON users_metadata
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users_metadata
      WHERE id = auth.uid() AND role = 'Admin'
    )
  );

CREATE POLICY "Admins can update all metadata"
  ON users_metadata
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users_metadata
      WHERE id = auth.uid() AND role = 'Admin'
    )
  );

CREATE POLICY "Admins can delete metadata"
  ON users_metadata
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users_metadata
      WHERE id = auth.uid() AND role = 'Admin'
    )
  );

-- Function to handle new user registration
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO users_metadata (id, name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', 'New User'),
    COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'Merchant')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create metadata on user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();