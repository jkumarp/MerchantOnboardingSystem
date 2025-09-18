/*
  # Seed initial users

  1. Admin User
    - Email: admin@example.com
    - Password: admin123
    - Role: Admin

  2. Merchant User
    - Email: merchant@example.com
    - Password: merchant123
    - Role: Merchant

  Note: These are sample users for development. Change passwords in production.
*/

-- Insert admin user metadata (user must be created via Supabase Auth first)
-- This is a placeholder - actual user creation should be done via the application
-- or Supabase dashboard for the initial admin user

-- Example of how to update an existing user's role to Admin:
-- UPDATE users_metadata SET role = 'Admin' WHERE id = 'user-uuid-here';