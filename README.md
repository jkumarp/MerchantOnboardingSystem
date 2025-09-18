# Merchant Onboarding Application

A full-stack React + Supabase web application for merchant onboarding with role-based access control.

## Features

- **Authentication**: Secure email/password login using Supabase Auth
- **Role-Based Access**: Admin and Merchant roles with different permissions
- **User Management**: Admins can add, edit, and delete users
- **Profile Management**: Users can view and update their profiles
- **Responsive Design**: Modern, mobile-friendly interface
- **Real-time Updates**: Automatic data synchronization

## Tech Stack

- **Frontend**: React 18 with functional components and hooks
- **Routing**: React Router v6
- **Authentication**: Supabase Auth
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite

## Project Structure

```
src/
├── components/
│   ├── Header.jsx
│   ├── LoadingSpinner.jsx
│   └── ProtectedRoute.jsx
├── contexts/
│   └── AuthContext.jsx
├── pages/
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Profile.jsx
│   └── Users/
│       ├── UserList.jsx
│       ├── AddUser.jsx
│       └── EditUser.jsx
├── services/
│   └── supabase.js
├── App.jsx
└── main.jsx
```

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
npm install
```

### 2. Set up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Settings > API to get your project URL and anon key
3. Copy `.env.example` to `.env` and fill in your Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Set up Database Schema

Run the SQL migrations in your Supabase SQL editor:

1. Execute `supabase/migrations/create_users_metadata.sql`
2. Execute `supabase/migrations/seed_initial_users.sql`

### 4. Create Initial Admin User

Since the trigger creates users automatically, you'll need to:

1. Sign up through the application or Supabase dashboard
2. Update the user's role to 'Admin' in the database:

```sql
UPDATE users_metadata SET role = 'Admin' WHERE id = 'your-user-id';
```

### 5. Run the Application

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## User Roles

### Admin
- Full access to user management
- Can add, edit, and delete users
- Can view all user profiles
- Access to admin dashboard

### Merchant
- Can only access their own profile
- Can update their personal information
- Limited to profile management

## Demo Credentials

After setting up your initial admin user, you can create these demo accounts:

**Admin Account:**
- Email: admin@example.com
- Password: admin123
- Role: Admin

**Merchant Account:**
- Email: merchant@example.com
- Password: merchant123
- Role: Merchant

## Database Schema

### users_metadata Table

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key, references auth.users(id) |
| name | text | User's full name |
| role | enum | 'Admin' or 'Merchant' |
| created_at | timestamptz | Account creation timestamp |

## Security Features

- **Row Level Security (RLS)**: Enabled on all tables
- **Role-based Policies**: Users can only access data based on their role
- **Protected Routes**: Client-side route protection
- **Secure Authentication**: Handled by Supabase Auth
- **Input Validation**: Form validation and sanitization

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Adding New Features

1. Create new components in `src/components/`
2. Add new pages in `src/pages/`
3. Update routes in `src/App.jsx`
4. Add database changes in `supabase/migrations/`

## Deployment

1. Build the application: `npm run build`
2. Deploy the `dist` folder to your hosting provider
3. Set up environment variables in your hosting platform
4. Ensure your Supabase project is configured for production

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.