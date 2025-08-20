# 🍕 Next Pizza Shop

A modern, full-featured e-commerce pizza ordering application built with Next.js 15, TypeScript, and OneEntry CMS. Experience the perfect blend of delicious pizzas and cutting-edge web technology!

![Next.js](https://img.shields.io/badge/Next.js-15.4.5-black)
![React](https://img.shields.io/badge/React-19.1.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4)
![OneEntry](https://img.shields.io/badge/OneEntry-CMS-orange)

## ✨ Features

### 🛒 Core E-commerce Features

- **Product Catalog**: Browse delicious pizzas with detailed descriptions
- **Product Details**: View high-quality images, prices, and ingredients
- **Shopping Cart**: Add, remove, and manage items with persistent state
- **Search Functionality**: Find your favorite pizzas quickly
- **Related Products**: Discover similar pizzas you might love

### 🎨 Modern UI/UX

- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Dark/Light Mode**: Toggle between themes with next-themes
- **Gradient Animations**: Beautiful CSS animations and transitions
- **Modern Components**: Built with Radix UI primitives
- **Toast Notifications**: User-friendly feedback with Sonner

### 🔧 Technical Features

- **TypeScript**: Fully typed for better development experience
- **Server Components**: Optimized performance with Next.js 15
- **State Management**: Zustand for cart and global state
- **Content Management**: OneEntry CMS integration
- **Authentication**: User login/signup with JWT tokens
- **API Routes**: RESTful API endpoints for data fetching

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- OneEntry CMS account (for content management)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/sahandghavidel/next-pizza-shop.git
   cd next-pizza-shop
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:

   ```bash
   ONEENTRY_TOKEN=your_oneentry_token_here
   ONEENTRY_PROJECT_URL=your_oneentry_project_url_here
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the magic! 🎉

## 📁 Project Structure

```
next-pizza-shop/
├── actions/               # Server actions for data fetching
│   ├── auth/             # Authentication actions
│   └── catalog/          # Product catalog actions
├── app/                  # Next.js 15 app directory
│   ├── (auth)/          # Authentication pages
│   ├── (main)/          # Main application pages
│   └── globals.css      # Global styles
├── components/           # Reusable React components
│   ├── ui/              # UI primitives (buttons, inputs, etc.)
│   ├── Navbar.tsx       # Navigation component
│   ├── Footer.tsx       # Footer component
│   └── productCard.tsx  # Product card component
├── lib/                 # Utility functions and configurations
├── stores/              # Zustand state management
├── types/               # TypeScript type definitions
└── public/              # Static assets
```

## 🛠️ Tech Stack

### Frontend

- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library with latest features
- **[TypeScript 5](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Radix UI](https://www.radix-ui.com/)** - Headless UI primitives

### State Management & UX

- **[Zustand](https://zustand-demo.pmnd.rs/)** - Lightweight state management
- **[Sonner](https://sonner.emilkowal.ski/)** - Toast notifications
- **[Lucide React](https://lucide.dev/)** - Beautiful icons
- **[next-themes](https://github.com/pacocoursey/next-themes)** - Theme switching

### Backend & CMS

- **[OneEntry](https://oneentry.cloud/)** - Headless CMS for content management
- **Next.js API Routes** - Backend functionality
- **JWT Authentication** - Secure user sessions

## 🎯 Key Pages & Features

### 🏠 Homepage (`/`)

- Hero section with featured pizzas
- Product catalog with filtering
- Special offers and promotions
- Responsive design for all devices

### 🍕 Product Details (`/product/[productId]`)

- High-quality product images
- Detailed descriptions and pricing
- Add to cart functionality
- Related products suggestions
- Availability status indicators

### 🛒 Shopping Cart (`/cart`)

- Item management (add/remove/quantity)
- Real-time price calculations
- Persistent cart state
- Checkout preparation

### 🔍 Search (`/search`)

- Real-time product search
- Filter by categories
- Search result highlighting

### 🔐 Authentication (`/auth`)

- User registration and login
- JWT-based authentication
- Secure session management

## 🎨 Design Philosophy

This project showcases modern web development principles:

- **Mobile-First**: Responsive design starting from mobile
- **Performance**: Optimized loading and rendering
- **Accessibility**: Screen reader friendly and keyboard navigation
- **User Experience**: Intuitive interface with smooth interactions
- **Scalability**: Modular architecture for easy expansion

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy automatically on every push!

### Other Platforms

- **Netlify**: Works seamlessly with static exports
- **Railway**: Great for full-stack applications
- **DigitalOcean**: App Platform deployment

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📚 Learn More

Want to build amazing projects like this? Check out **[100jsprojects.com](https://100jsprojects.com)** for:

🎯 **100+ JavaScript Projects** - From beginner to advanced  
💻 **Complete Source Code** - Download and learn from real projects  
📖 **Step-by-Step Tutorials** - Detailed guides and explanations  
🚀 **Modern Tech Stack** - React, Next.js, TypeScript, and more  
🎨 **Beautiful Designs** - UI/UX best practices and modern layouts  
🔧 **Production Ready** - Deploy-ready applications with best practices

Transform your coding skills with hands-on projects that matter!

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [OneEntry](https://oneentry.cloud/) for the headless CMS solution
- [Radix UI](https://www.radix-ui.com/) for accessible UI components
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework

---

<div align="center">

**Built with ❤️ by [Sahand Ghavidel](https://github.com/sahandghavidel)**

🌟 **Star this repo if you found it helpful!** 🌟

**Visit [100jsprojects.com](https://100jsprojects.com) for more amazing projects!**

</div>
