# 🚀 Cyberpunk Portfolio - Full Stack Application

A modern, cyberpunk-themed portfolio website with an interactive terminal interface, AI chat integration, and mobile-responsive design.

## 🏗️ Project Structure

```
cyberpunk-portfolio/
├── frontend/                 # React + TypeScript frontend
│   ├── src/                 # Source code
│   ├── public/              # Static assets
│   ├── package.json         # Frontend dependencies
│   └── README.md           # Frontend documentation
├── backend/                 # Django backend
│   ├── backend/            # Django project settings
│   ├── chat/               # Chat application
│   ├── contact/            # Contact form application
│   ├── requirements.txt    # Python dependencies
│   └── README.md          # Backend documentation
├── docker-compose.yml      # Multi-container setup
├── Dockerfile.frontend     # Frontend container
└── README.md              # This file
```

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Mobile-first responsive design**

### Backend
- **Django 4.2+** with Python
- **Django Channels** for WebSocket support
- **Redis** for message brokering
- **PostgreSQL** for production database
- **OpenAI API** integration

## 🚀 Quick Start

### Prerequisites
- Docker and Docker Compose
- Node.js 18+ (for local development)
- Python 3.9+ (for local development)

### Using Docker (Recommended)

```bash
# Clone the repository
git clone <repository-url>
cd cyberpunk-portfolio

# Start all services
docker-compose up -d

# View logs
docker-compose logs -f
```

**Access the application:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:8001
- Redis: localhost:6380

### Local Development

#### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

#### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

## 🎯 Features

### 🖥️ Interactive Terminal
- **Cyberpunk-themed interface** with glowing effects
- **Command execution** with real-time feedback
- **AI chat integration** for intelligent responses
- **Sound effects** and visual animations

### 📱 Mobile Experience
- **Touch gestures** (swipe, pinch, tap)
- **Virtual keyboard** for mobile devices
- **Responsive design** across all screen sizes
- **Progressive Web App** capabilities

### 🤖 AI Integration
- **Real-time chat** with AI assistant
- **WebSocket communication** for instant responses
- **Context-aware conversations**
- **Chat history persistence**

### 🎨 Visual Effects
- **Animated cyberpunk grid** background
- **Particle systems** and data streams
- **Responsive lighting effects**
- **Smooth transitions** and micro-interactions

## 🔧 Configuration

### Environment Variables

Create `.env` files in both frontend and backend directories:

#### Frontend (.env)
```bash
VITE_API_BASE_URL=http://localhost:8001/api
VITE_WS_BASE_URL=ws://localhost:8001/ws
```

#### Backend (.env)
```bash
SECRET_KEY=your_secret_key
DEBUG=True
DATABASE_URL=sqlite:///db.sqlite3
REDIS_URL=redis://localhost:6379/0
OPENAI_API_KEY=your_openai_api_key
CORS_ALLOWED_ORIGINS=http://localhost:3000
```

## 🚀 Deployment

### Production Docker Setup
```bash
# Build and start production containers
docker-compose -f docker-compose.prod.yml up -d

# Scale services if needed
docker-compose up --scale portfolio-frontend=2
```

### Manual Deployment

#### Frontend
```bash
cd frontend
npm run build
# Deploy dist/ folder to your static hosting service
```

#### Backend
```bash
cd backend
pip install -r requirements.txt
python manage.py collectstatic
python manage.py migrate
# Deploy to your Python hosting service
```

## 📊 Development Commands

### Frontend Commands
```bash
cd frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

### Backend Commands
```bash
cd backend
python manage.py runserver     # Start development server
python manage.py migrate       # Run database migrations
python manage.py test         # Run tests
python manage.py shell        # Django shell
python manage.py createsuperuser  # Create admin user
```

### Docker Commands
```bash
docker-compose up -d           # Start all services
docker-compose down           # Stop all services
docker-compose logs -f        # View logs
docker-compose build         # Rebuild containers
docker-compose exec portfolio-backend python manage.py shell
```

## 🧪 Testing

### Frontend Testing
```bash
cd frontend
npm run test         # Run unit tests
npm run test:e2e     # Run end-to-end tests
npm run coverage     # Generate coverage report
```

### Backend Testing
```bash
cd backend
python manage.py test
coverage run --source='.' manage.py test
coverage report
```

## 📈 Performance

### Frontend Optimizations
- **Code splitting** and lazy loading
- **Image optimization** and lazy loading
- **Bundle size optimization**
- **Caching strategies**

### Backend Optimizations
- **Database query optimization**
- **Redis caching**
- **Async view support**
- **Connection pooling**

## 🔒 Security

### Security Features
- **CORS configuration**
- **CSRF protection**
- **SQL injection prevention**
- **XSS protection**
- **Rate limiting**

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Add tests for new features
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Development Guidelines
- Follow TypeScript/Python best practices
- Write tests for new features
- Update documentation
- Follow the existing code style
- Ensure all tests pass

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Framer Motion** for smooth animations
- **Tailwind CSS** for utility-first styling
- **Django Channels** for WebSocket support
- **OpenAI** for AI integration
- **React** and **Django** communities

## 📞 Support

If you have any questions or need help, please:
1. Check the documentation in `frontend/README.md` and `backend/README.md`
2. Search existing issues
3. Create a new issue with detailed information

---

**Built with ❤️ and lots of ☕**