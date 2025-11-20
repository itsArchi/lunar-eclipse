# 🌙 Lunar Eclipse — Job Portal

A modern job portal built with **Next.js**, **NextAuth**, and **Supabase**, featuring secure authentication and role-based dashboards for job seekers and employers.

---

## ✨ Features

- 🔐 **User Authentication** – Secure login & registration using NextAuth  
- 🧩 **Role-Based Access Control** – Different dashboards for job seekers & employers  
- 💼 **Job Listings** – Browse & search available openings  
- 📱 **Responsive Design** – Works seamlessly on desktop and mobile  
- ✔️ **Form Validation** – Formik & Yup for reliable validation  

---

## 🛠 Tech Stack

### **Frontend**
- Next.js 13+ (App Router)
- TypeScript
- Tailwind CSS
- Formik & Yup
- React Icons

### **Backend**
- Next.js API Routes
- NextAuth.js
- Supabase (Database & Auth)
- bcryptjs

### **Testing**
- Jest  
- React Testing Library  
- @testing-library/jest-dom  

---

## 🚀 Getting Started

### **Prerequisites**
- Node.js **18+**
- pnpm / npm / yarn
- Supabase project

---

## 📦 Installation

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/yourusername/lunar-eclipse.git
cd lunar-eclipse

### 2️⃣ Install Dependencies
pnpm install
# or
npm install
# or
yarn install

### 3️⃣ Setup Environment Variables
Create a file named .env.local in the root:
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

### 4️⃣ Run Development Server
pnpm start:dev
