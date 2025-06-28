# XILEF Portfolio 🚀

A modern, interactive personal portfolio website built with Next.js 15, React 19, and Three.js. Features a sleek design with dark/light theme support, interactive 3D elements, and a functional terminal interface.

*💡 Fun fact: This portfolio was coded during a few hours of waiting at Madrid Atocha T4 airport! ✈️*

**Live Demo**: [https://www.felixbernal.es](https://www.felixbernal.es) | **LinkedIn**: [Felix Bernal Sierra](https://linkedin.com/in/felix-bernal-sierra)

![Portfolio Preview](https://img.shields.io/badge/Next.js-15.3.3-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.0.0-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

- **🎨 Modern Design**: Clean, responsive design with smooth animations
- **🌙 Dark/Light Theme**: Toggle between dark and light modes
- **🖥️ Interactive Terminal**: Functional terminal interface with custom commands
- **🎮 3D Elements**: Three.js powered refracting 3D visual effect (inspired by [Maxime Heckel's blog post](https://blog.maximeheckel.com/posts/refraction-dispersion-and-other-shader-light-effects/))
- **📱 Mobile Responsive**: Optimized for all device sizes
- **⚡ Performance**: Built with Next.js 15 and Turbopack for optimal performance
- **🔍 SEO Optimized**: Meta tags and structured data for better search visibility
- **📊 Analytics**: Vercel Analytics and Speed Insights integration

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Utility-first CSS framework
- **Three.js** - 3D graphics library

### UI/UX
- **Tailwind CSS 4** - Utility-first CSS framework
- **shadcn/ui** - Beautiful and accessible component library built on Radix UI

### Development
- **pnpm** - Fast, disk space efficient package manager
- **ESLint** - Code linting
- **Turbopack** - Fast bundler for development
- **Vercel** - Deployment platform

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/KrakenWagen/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Run the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the portfolio.

## 📁 Project Structure

```
portfolio/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main portfolio page
├── components/            # Reusable components
│   ├── ui/               # UI components (buttons, etc.)
│   ├── terminal.tsx      # Interactive terminal
│   ├── ray-marching.jsx  # 3D refractive effect
│   ├── map.tsx           # 3D map component
│   └── theme-provider.tsx # Theme context
├── config/               # Configuration files
│   └── portfolio.tsx     # Portfolio data and settings
├── sections/             # Portfolio sections
│   ├── Hero.tsx          # Hero section
│   ├── About.tsx         # About section
│   ├── Experience.tsx    # Work experience
│   ├── Education.tsx     # Education history
│   ├── Work.tsx          # Projects showcase
│   └── Contact.tsx       # Contact information
├── public/               # Static assets
│   ├── cob.png           # Project images
│   ├── scattering.png
│   ├── vr.png
│   └── *.svg             # Icons and graphics
└── lib/                  # Utility functions
    └── utils.ts          # Helper functions
```

## 🎯 Key Components

### Interactive Terminal
The portfolio features a fully functional terminal interface accessible via the "Terminal" button. It includes:
- Custom command system
- Portfolio information commands
- Navigation shortcuts

### 3D Visual Effects
- **Three.js Integration**: Interactive 3D refracting elements using WebGL

### Responsive Navigation
- Sticky navigation with smooth scrolling
- Mobile-friendly hamburger menu
- Active section highlighting
- Theme toggle integration

## 🚀 Deployment

### Vercel (Recommended)

```bash
pnpm run deploy
# or
npx vercel
```

### Manual Deployment

1. **Build the project**
   ```bash
   pnpm build
   ```

2. **Start production server**
   ```bash
   pnpm start
   ```

## 🎨 Customization

### Personal Information
Edit `config/portfolio.tsx` to update:
- Personal details (name, title, location)
- Contact information
- Work experience
- Education history
- Project showcase
- Skills and technologies

### Styling
- Modify `app/globals.css` for global styles
- Setup Tailwind configuration in `tailwind.config.js` (create file if not present)

### 3D Effects
- Adjust refraction parameters in `components/ray-marching.jsx`
- Modify Three.js scenes in `components/map.tsx`
- Update terminal commands in `components/terminal.tsx`

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Portfolio**: [Live Demo](https://www.felixbernal.es)
- **GitHub**: [@KrakenWagen](https://github.com/KrakenWagen)
- **LinkedIn**: [Felix Bernal Sierra](https://linkedin.com/in/felix-bernal-sierra)
- **Email**: felixbernalsierra@gmail.com

---

⭐ **Star this repository if you found it helpful!**
