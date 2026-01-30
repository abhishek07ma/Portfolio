# Animated Portfolio

A fully animated, modern portfolio website built with React and Framer Motion.

## Features

- ✨ Smooth animations with Framer Motion
- 🎨 Modern, gradient-based design
- 📱 Fully responsive layout
- 🎯 Sections for:
  - Hero/Introduction
  - About Me with skills
  - Work Experience timeline
  - Achievements showcase
  - CV/Resume with downloadable option
  - Contact form
- 🌈 Beautiful color scheme with animated backgrounds
- ⚡ Fast performance with Vite

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## Customization

### Update Your Information

1. **Hero Section** (`src/components/Hero.jsx`):
   - Change "Your Name" to your actual name
   - Update the title/role
   - Modify social links (GitHub, LinkedIn, Email)

2. **About Section** (`src/components/About.jsx`):
   - Update the bio text
   - Modify skills array with your actual skills

3. **Experience Section** (`src/components/Experience.jsx`):
   - Replace the experiences array with your work history
   - Update technologies for each position

4. **Achievements Section** (`src/components/Achievements.jsx`):
   - Add your own achievements and awards
   - Customize icons and colors

5. **CV Section** (`src/components/CV.jsx`):
   - Update education details
   - Add your certifications
   - Modify languages section
   - Connect the download button to your actual CV file

6. **Contact Section** (`src/components/Contact.jsx`):
   - Update contact information (email, phone, location)
   - Configure form submission to your backend or email service

### Color Scheme

Colors are defined as CSS variables in `src/index.css`:
- `--primary-color`: Main purple/blue color
- `--secondary-color`: Secondary purple
- `--accent`: Pink accent color
- `--bg-dark`: Dark background
- `--bg-light`: Lighter background sections

## Technologies Used

- React 18
- Vite
- Framer Motion (animations)
- React Icons
- CSS3 with CSS Variables

## License

MIT License - feel free to use this template for your own portfolio!
