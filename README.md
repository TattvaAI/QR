# 🔐 GATEPASS - Secure Dynamic Access Control

A Next.js-based TOTP (Time-based One-Time Password) gate access system with QR code verification for educational institutions. Features real-time token generation, replay attack protection, and secure student authentication.

![Next.js](https://img.shields.io/badge/Next.js-16.1-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-green?style=flat-square&logo=supabase)

## ✨ Features

- 🔒 **TOTP-based Authentication**: Time-synchronized one-time passwords (30-second validity)
- 📱 **QR Code Generation**: Dynamic QR codes for seamless scanning
- 🎥 **Live QR Scanner**: Real-time camera-based verification
- 🛡️ **Replay Attack Protection**: Prevents token reuse
- 👤 **Student Profiles**: Photo integration and roll number management
- 📊 **Access Logging**: Complete audit trail of all access attempts
- ⚡ **Real-time Updates**: Instant token refresh with countdown timer
- 🎨 **Cyberpunk UI**: Modern, futuristic interface design

## 🏗️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Database**: Supabase (PostgreSQL)
- **Authentication**: TOTP (otplib)
- **Styling**: Tailwind CSS 4
- **QR Code**: qrcode.react, @yudiel/react-qr-scanner
- **Deployment**: Vercel

## 📋 Prerequisites

- Node.js 18+ and npm
- Supabase account ([Sign up here](https://supabase.com))
- Vercel account for deployment ([Sign up here](https://vercel.com))

## 🚀 Quick Start

### 1. Clone the Repository

\`\`\`bash
git clone <your-repo-url>
cd QR-main
\`\`\`

### 2. Install Dependencies

\`\`\`bash
npm install
\`\`\`

### 3. Set Up Supabase

1. Create a new Supabase project at [app.supabase.com](https://app.supabase.com)
2. Go to **Project Settings** → **API**
3. Copy your **Project URL** and **anon/public key**
4. In the SQL Editor, run the schema from \`supabase/schema.sql\`
5. (Optional) Run seed data from \`supabase/seed.sql\`

### 4. Configure Environment Variables

Create a \`.env.local\` file in the root directory:

\`\`\`bash
cp .env.example .env.local
\`\`\`

Then edit \`.env.local\` with your Supabase credentials:

\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
DATABASE_URL=postgresql://postgres:your-password@db.your-project-id.supabase.co:5432/postgres
\`\`\`

### 5. Run Development Server

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 📦 Deployment to Vercel

### Automatic Deployment (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your repository
4. Vercel will auto-detect Next.js configuration
5. Add environment variables:
   - \`NEXT_PUBLIC_SUPABASE_URL\`
   - \`NEXT_PUBLIC_SUPABASE_ANON_KEY\`
6. Click **Deploy**

### Manual Deployment

\`\`\`bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY

# Deploy to production
vercel --prod
\`\`\`

## 🔐 Environment Variables Reference

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| \`NEXT_PUBLIC_SUPABASE_URL\` | Your Supabase project URL | ✅ Yes | \`https://xxx.supabase.co\` |
| \`NEXT_PUBLIC_SUPABASE_ANON_KEY\` | Supabase anonymous/public key | ✅ Yes | \`eyJhbGc...\` |
| \`DATABASE_URL\` | PostgreSQL connection string | ⚠️ Scripts only | \`postgresql://postgres:...\` |

### How to Get Environment Variables

1. **Supabase URL & Anon Key**:
   - Go to your [Supabase Dashboard](https://app.supabase.com)
   - Select your project
   - Navigate to **Settings** → **API**
   - Copy **Project URL** → \`NEXT_PUBLIC_SUPABASE_URL\`
   - Copy **Project API keys** → **anon/public** → \`NEXT_PUBLIC_SUPABASE_ANON_KEY\`

2. **Database URL** (Optional, for scripts):
   - Go to **Settings** → **Database**
   - Find **Connection string** → **URI**
   - Copy the connection string (replace \`[YOUR-PASSWORD]\` with your database password)

## 📱 Application Routes

- \`/\` - Home page with role selection
- \`/student\` - Student portal (TOTP QR code generation)
- \`/guard\` - Guard portal (QR scanner and verification)

## 🛠️ Database Schema

\`\`\`sql
-- Students table
students (
  id UUID PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(255) UNIQUE,
  roll_number VARCHAR(20) UNIQUE,
  department VARCHAR(100),
  year INTEGER,
  totp_secret VARCHAR(32),  -- TOTP secret key
  photo_url TEXT,
  is_active BOOLEAN,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)

-- Access logs table
access_logs (
  id UUID PRIMARY KEY,
  student_id UUID REFERENCES students(id),
  status VARCHAR(10),  -- 'GRANTED' or 'DENIED'
  guard_note TEXT,     -- Stores token for replay protection
  scanned_at TIMESTAMP
)
\`\`\`

## 🔒 Security Features

1. **Environment Variable Validation**: Runtime checks for required configuration
2. **Security Headers**: XSS protection, frame options, content type sniffing prevention
3. **TOTP Algorithm**: Industry-standard RFC 6238 implementation
4. **Replay Protection**: Token-based duplicate entry prevention
5. **Session Management**: No persistent sessions, stateless authentication
6. **Input Validation**: Server-side validation for all inputs

## 🧪 Testing

Test the application locally:

1. Use the **Student Portal** (\`/student\`):
   - Enter a valid roll number
   - Generate TOTP QR code
   - Watch the 30-second countdown

2. Use the **Guard Portal** (\`/guard\`):
   - Scan the QR code with camera
   - Or use manual entry for testing
   - Verify access grant/denial

## 📝 Scripts

Located in \`/scripts\` directory:

- \`setup-db.js\` - Initialize database schema
- \`insert-students.js\` - Bulk insert student data
- \`debug-db.js\` - Database debugging utilities
- \`check-schema.js\` - Verify database structure

Run scripts:
\`\`\`bash
node scripts/setup-db.js
\`\`\`

## 🐛 Troubleshooting

### Camera Access Denied
- Ensure HTTPS is enabled (required for camera access)
- Check browser permissions for camera
- Vercel provides HTTPS by default

### Environment Variables Not Working
- Ensure variables are prefixed with \`NEXT_PUBLIC_\` for client-side access
- Restart development server after changing \`.env.local\`
- In Vercel, redeploy after adding environment variables

### Database Connection Issues
- Verify Supabase project is active
- Check firewall/network restrictions
- Ensure environment variables are correctly set

## 📄 License

This project is private and proprietary.

## 👥 Support

For issues and questions, please contact the development team.

---

Built with ❤️ using Next.js and Supabase
