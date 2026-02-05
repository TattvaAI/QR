# Database Migration Instructions

## Step 1: Add photo_url Column to Database

You need to run this SQL in your Supabase SQL Editor:

1. Go to https://supabase.com/dashboard
2. Select your project (hscawdrcrpknowijwvsu)
3. Click on "SQL Editor" in the left sidebar
4. Click "New Query"
5. Paste and run this SQL:

```sql
-- Add photo_url column to students table
ALTER TABLE students ADD COLUMN IF NOT EXISTS photo_url TEXT;
```

## Step 2: Update Photo for Student 2024CS002

After adding the column, run this SQL to set the photo for student 2024CS002:

```sql
-- Update photo for student 2024CS002
UPDATE students 
SET photo_url = '/student-photos/2024CS002.jpg'
WHERE id = '2024CS002';

-- Verify the update
SELECT id, name, photo_url 
FROM students 
WHERE id = '2024CS002';
```

## Step 3: (Optional) Update All Students with Placeholder Photos

If you want to add placeholder photos for all other students:

```sql
-- Update all students without photos to use avatar placeholders
UPDATE students 
SET photo_url = 'https://api.dicebear.com/7.x/avataaars/svg?seed=' || name
WHERE photo_url IS NULL;
```

## What's Been Done

✅ Photo saved to: `/Users/creator/Downloads/projects/QR-main/public/student-photos/2024CS002.jpg`
✅ Code updated to display photos on student and guard pages
✅ Database schema files updated

## Next Steps

After running the SQL commands above:
1. Refresh your browser at http://localhost:3000/student
2. Login with roll number: **CS2024002**
3. You should see the custom photo displayed in the ID card!
