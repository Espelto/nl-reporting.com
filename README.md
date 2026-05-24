# NL Reporting - Professional FP&A Consulting Website

A modern, web-app style portfolio site showcasing workflow optimization and responsible AI integration for finance teams.

## Features

- **Hero Section** - Compelling value proposition with clear CTAs
- **Problem/Solution** - Before/after comparison showing impact
- **N8N Workflow Visualization** - Step-by-step breakdown of invoice automation
- **Interactive Metrics Dashboard** - Real-time data visualizations with Recharts
- **Case Study Showcase** - Detailed implementation results
- **Professional Design** - Modern teal/dark color scheme, animations with Framer Motion
- **Responsive** - Mobile-optimized experience

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Deployment**: Vercel

## Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── app/
│   ├── layout.js           # Root layout
│   ├── page.js            # Home page
│   └── globals.css        # Global styles
├── components/
│   ├── Hero.js            # Hero section
│   ├── ProblemSolution.js # Before/after comparison
│   ├── N8NWorkflow.js     # Workflow diagram
│   ├── MetricsDashboard.js # Data visualizations
│   ├── CaseStudy.js       # Case study section
│   └── Footer.js          # Footer with CTAs
├── public/                # Static assets
├── package.json
├── tailwind.config.js
└── next.config.js
```

## Customization

### Brand Colors
Edit `tailwind.config.js` to change the color scheme:
- Primary (teal): `colors.primary`
- Dark (background): `colors.dark`

### Content
Update component content directly in the component files:
- Hero messaging: `components/Hero.js`
- Metrics data: `components/MetricsDashboard.js`
- Case study details: `components/CaseStudy.js`

### Metrics Data
Replace mock data in `MetricsDashboard.js` with your actual results:
```javascript
const timeData = [
  { name: 'Before', value: 45, fill: '#ef4444' },
  { name: 'After', value: 3, fill: '#1a7bae' },
]
```

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Connect repo to [Vercel](https://vercel.com)
3. Auto-deploys on push

**Environment Variables** (if needed):
```
NEXT_PUBLIC_SITE_URL=https://nl-reporting.com
```

### Deploy to Other Platforms

Build and start:
```bash
npm run build
npm run start
```

## Performance Optimization

- Server-side rendering (SSR) via Next.js
- Image optimization
- Code splitting via dynamic imports
- CSS-in-JS with Tailwind

## LinkedIn Integration

- Add case study snippets to LinkedIn posts
- Link to specific sections using anchor links
- Use dashboard metrics as proof points

## Future Enhancements

- [ ] Blog/Insights section for thought leadership
- [ ] Interactive "ROI Calculator" tool
- [ ] Live N8N workflow integration
- [ ] Client testimonials section
- [ ] YouTube video embeds of N8N demos
- [ ] Lead capture form with email integration
- [ ] Analytics tracking setup
- [ ] A/B testing framework

## Support & Feedback

For questions or to discuss improvements, reach out to Alexey at kobzev.work@gmail.com

---

Built for ambitious finance leaders scaling AI-driven workflows.
