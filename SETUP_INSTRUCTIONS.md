# Supabase Next.js Slack Clone Setup Instructions

This guide will help you set up a complete Slack clone application using Next.js and Supabase, similar to the official Supabase example.

## Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js) or yarn
- Supabase Account (free tier available) - [Sign up at Supabase](https://supabase.com/dashboard)

## Step-by-Step Setup

### 0. Clone repo

```bash
git clone git@github.com:3lviend/nextjs-slack.git
cd supabase-nextjs-slack-clone-2
```

### 1. Install Dependencies

Make sure all npm packages are installed:

```bash
npm install
```

### 2. Set Up Supabase Project

1. **Create a Supabase Project**
   - Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
   - Sign up or log in
   - Click "New Project"
   - Fill in your project details and wait for provisioning (takes a few minutes)

2. **Run the Database Schema**
   - Once your project is ready, go to the SQL Editor in your Supabase dashboard
   - Look for the "Slack Clone" quickstart template and run it, OR
   - Copy the contents of `full-schema.sql` from this project and run it in the SQL Editor

3. **Get Your API Credentials**
   - Go to **Project Settings** (gear icon) → **API**
   - Copy your **Project URL** and **anon/public key**

4. **Create Environment Variables File**
   - Create a file named `.env.local` in the root of the project:
   
   ```bash
   touch .env.local
   ```
   
   Add the following content:
   
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-project-url-here
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-anon-key-here
   ```
   
   Replace the placeholders with your actual Supabase credentials.

### 3. Start the Server

```bash
npm run dev
```

## Access Your Application

- **Application**: http://localhost:3000

## First Time Setup

### Creating Your First User

1. Open the app in your browser (http://localhost:3000)
2. Click on "Sign Up" or "Sign In"
3. Enter your email address and password
4. Check your email for the confirmation link (if email confirmation is enabled)
5. After confirming, you'll be logged in

### Role-Based Access Control - NOT TESTED YET

The app supports role-based access control using email plus addressing:

- **Admin users**: Can delete channels and messages
  - Sign up with: `yourname+supaadmin@example.com`
  
- **Moderator users**: Can delete messages
  - Sign up with: `yourname+supamod@example.com`

- **Regular users**: Can create channels and messages, delete their own messages

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [Supabase Slack Community](https://supabase.com/discord)
