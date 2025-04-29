# FakeStore Assignment – Next.js App

This project is a modern, responsive **Next.js** application that fetches product data from a public API and displays it in a visually appealing, user-friendly interface. It demonstrates key features such as static site generation (SSG), dynamic routing, and optimized image handling using the Next.js Image component.

## 🧠 Features

- ✅ Product listing page with grid layout (`/products`)
- ✅ Individual product details page using dynamic routing (`/products/[id]`)
- ✅ Responsive design (mobile/tablet/desktop)
- ✅ Loading skeleton during data fetching
- ✅ Error handling for failed API responses
- ✅ Fully functional navigation
- ✅ Ready for deployment on Vercel or any Node.js server

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/fakestore-assignment.git
cd fakestore-assignment
npm install
# or
yarn install
```
```
src/
├── pages/
│   ├── index.tsx          # Home with personal info
│   ├── products/
│   │   ├── index.tsx      # Product listing
│   │   └── [id].tsx       # Product details
