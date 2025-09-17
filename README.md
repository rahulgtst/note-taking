# 📝 Notes Frontend

A **Next + TypeScript** frontend for the Notes app.  
It interacts with the **FastAPI backend** to allow users to **register, login, and manage notes**.

---

## 🚀 Tech Stack
- **Framework:** Next 15
- **Language:** TypeScript
- **State Management:** Redux Toolkit (Will be added)
- **UI:** TailwindCSS

---

## ⚙️ Setup

### 1️⃣ Clone the repo
```bash
git clone https://github.com/rahulgtst/note-frontend.git
cd note-frontend
````

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Configure environment variables

Create `.env` file in root:

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

### 4️⃣ Run the app

```bash
npm run dev
```

App will be live at: **[http://127.0.0.1:3000](http://127.0.0.1:3000)**

---

## 📌 Features

* 🔑 User Registration & Login (JWT Auth)
* 📝 Create, Edit, Delete Notes
* 📋 View all user notes
* 🌙 Responsive UI
