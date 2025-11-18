// src/data/projects.ts
export const projects = [
  {
    title: 'IoT Smart Home Dashboard',
    description: 'A React-based dashboard integrating Arduino sensors for real-time home monitoring.',
    image: '/images/iot-dashboard.jpg',  // Add your image to public/images/
    live: 'https://iot-dashboard.pokhrelamit.com.np',
    github: 'https://github.com/amitpokhrel/iot-dashboard',
    tech: ['React', 'Tailwind', 'Arduino'],
  },
  {
    title: 'Creative Portfolio App',
    description: 'Modern frontend showcase with animations and responsive design.',
    image: '/images/portfolio-app.jpg',
    live: 'https://portfolio.pokhrelamit.com.np',
    github: 'https://github.com/amitpokhrel/portfolio-app',
    tech: ['TypeScript', 'Framer Motion', 'shadcn/ui'],
  },
  {
    title: 'E-Commerce Frontend',
    description: 'Full-stack inspired React shop with cart functionality and payments.',
    image: '/images/ecommerce.jpg',
    live: null,  // No live demo
    github: 'https://github.com/amitpokhrel/ecommerce-frontend',
    tech: ['Next.js', 'Node.js', 'Stripe'],
  },
  // Add more (aim for 3-6 total)
];