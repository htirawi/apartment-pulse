# 🏠 Apartment Pulse

> **A modern, full-stack apartment rental platform built with Next.js 14 and TypeScript**

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=flat-square&logo=mongodb)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-blue?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)

**Live Demo:** [apartment-pulse.vercel.app](https://apartment-pulse.vercel.app/)

## ✨ Features

### 🔐 **Authentication & Authorization**
- **Google OAuth** integration with NextAuth.js
- **Protected routes** and user authorization
- **User profiles** with personalized dashboards

### 🏠 **Apartment Management**
- **Full CRUD operations** for apartment listings
- **Multiple image uploads** with Cloudinary integration
- **Advanced search** with location, type, and price filters
- **Interactive maps** powered by Mapbox
- **Apartment bookmarking** and saved listings

### 💬 **Communication**
- **Internal messaging system** between users
- **Real-time notifications** for unread messages
- **Contact forms** for apartment inquiries

### 🎨 **User Experience**
- **Responsive design** optimized for all devices
- **Professional form validation** with Formik + Yup
- **Loading skeletons** for smooth UX
- **Toast notifications** for user feedback
- **Social media sharing** integration
- **Photo gallery** with Photoswipe
- **Custom 404 page**

### 🛠️ **Developer Experience**
- **100% TypeScript** with enterprise-level type safety
- **Clean architecture** with proper interface organization
- **Custom hooks** for data management
- **Error boundaries** for graceful error handling
- **ESLint + Prettier** for code quality
- **Professional validation** patterns

## 🚀 Tech Stack

### **Frontend**
- **[Next.js 14](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[React 18](https://reactjs.org/)** - UI library with latest features
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Formik](https://formik.org/)** + **[Yup](https://github.com/jquense/yup)** - Form handling and validation

### **Backend & Database**
- **[MongoDB Atlas](https://www.mongodb.com/)** - Cloud database
- **[Mongoose](https://mongoosejs.com/)** - MongoDB object modeling
- **[NextAuth.js](https://next-auth.js.org/)** - Authentication solution

### **External Services**
- **[Cloudinary](https://cloudinary.com/)** - Image upload and optimization
- **[Mapbox](https://www.mapbox.com/)** - Interactive maps and geocoding
- **[Google APIs](https://console.cloud.google.com/)** - OAuth and Geocoding

### **UI & Utilities**
- **[React Icons](https://react-icons.github.io/react-icons/)** - Icon library
- **[Photoswipe](https://photoswipe.com/)** - Image gallery
- **[React Map GL](https://visgl.github.io/react-map-gl/)** - Mapbox React integration
- **[React Spinners](https://www.npmjs.com/package/react-spinners)** - Loading indicators
- **[React Toastify](https://fkhadra.github.io/react-toastify/)** - Toast notifications
- **[React Share](https://www.npmjs.com/package/react-share)** - Social media sharing

## 📋 Prerequisites

- **Node.js** 18.0 or higher
- **npm** or **yarn** package manager
- **MongoDB Atlas** account and cluster
- **Cloudinary** account for image management
- **Google Cloud Console** account for OAuth and APIs
- **Mapbox** account for maps and geocoding

## 🛠️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/apartment-pulse.git
cd apartment-pulse
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Environment Variables

Create a `.env.local` file in the root directory:

```env
# Database
MONGODB_URI=your_mongodb_connection_string

# Authentication
NEXTAUTH_SECRET=your_nextauth_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXTAUTH_URL=http://localhost:3000

# Image Upload
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Maps & Geocoding
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token
NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY=your_google_geocoding_api_key

# API Domain (for production)
NEXT_PUBLIC_API_DOMAIN=http://localhost:3000
```

### 4. Generate NextAuth Secret
```bash
openssl rand -base64 32
```

### 5. Run the Development Server
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Project Structure

```
apartment-pulse/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── apartments/        # Apartment-related pages
│   └── ...
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── skeletons/        # Loading skeletons
│   └── ...
├── types/                # TypeScript type definitions
│   ├── components/       # Component prop types
│   ├── forms/           # Form-related types
│   ├── hooks/           # Hook return types
│   └── ...
├── hooks/               # Custom React hooks
├── lib/                 # Utility libraries
├── utils/               # Helper functions
├── config/              # Configuration files
└── models/              # Database models
```

## 🧪 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
```

## 🌐 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy automatically on every push

### Other Platforms
The application can be deployed on any platform that supports Next.js:
- **Netlify**
- **Railway**
- **DigitalOcean App Platform**
- **AWS Amplify**

## 🔧 Configuration

### Database Setup
1. Create a MongoDB Atlas cluster
2. Add your IP address to the whitelist
3. Create a database user
4. Get the connection string

### Google OAuth Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs

### Cloudinary Setup
1. Sign up at [Cloudinary](https://cloudinary.com/)
2. Get your cloud name, API key, and API secret
3. Configure upload presets if needed

### Mapbox Setup
1. Sign up at [Mapbox](https://www.mapbox.com/)
2. Create an access token
3. Configure token permissions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js team** for the amazing framework
- **Vercel** for hosting and deployment
- **MongoDB** for the database solution
- **All open-source contributors** who made this project possible

---

<div align="center">
  <strong>Built with ❤️ by Hussein Tirawi using Next.js and TypeScript</strong>
</div>