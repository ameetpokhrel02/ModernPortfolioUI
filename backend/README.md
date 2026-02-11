# 🔧 Cyberpunk Portfolio - Backend

A robust Django backend with real-time WebSocket support, AI chat integration, and modern API architecture.

## 🛠️ Tech Stack

- **Django 4.2+** - Modern Python web framework
- **Django Channels** - WebSocket and async support
- **Redis** - Message broker and caching
- **PostgreSQL** - Primary database
- **Django REST Framework** - API development
- **Celery** - Background task processing

## 🎯 Features

### 🤖 AI Chat System
- **Real-time Chat**: WebSocket-based chat interface
- **AI Integration**: OpenAI GPT integration for intelligent responses
- **Message History**: Persistent chat history
- **User Sessions**: Session-based chat management

### 📡 API Endpoints
- **Contact Management**: Handle contact form submissions
- **Chat API**: RESTful chat endpoints
- **Health Checks**: System status monitoring
- **Admin Interface**: Django admin for content management

### 🔄 Real-time Features
- **WebSocket Support**: Real-time bidirectional communication
- **Channel Layers**: Redis-backed message routing
- **Async Views**: High-performance async request handling
- **Background Tasks**: Celery-based task processing

## 🚀 Quick Start

### Prerequisites
- Python 3.9+
- Redis server
- PostgreSQL (optional, SQLite for development)

### Installation

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Run migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Start development server
python manage.py runserver
```

### Redis Setup
```bash
# Install Redis (Ubuntu/Debian)
sudo apt-get install redis-server

# Start Redis
redis-server

# Or using Docker
docker run -d -p 6379:6379 redis:alpine
```

## 📁 Project Structure

```
backend/
├── backend/                # Django project settings
│   ├── settings.py        # Main settings
│   ├── urls.py           # URL routing
│   ├── asgi.py           # ASGI configuration
│   └── wsgi.py           # WSGI configuration
├── chat/                  # Chat application
│   ├── models.py         # Chat models
│   ├── views.py          # API views
│   ├── consumers.py      # WebSocket consumers
│   ├── routing.py        # WebSocket routing
│   └── admin.py          # Admin configuration
├── contact/              # Contact form application
│   ├── models.py         # Contact models
│   ├── views.py          # Contact views
│   └── management/       # Management commands
├── requirements.txt      # Python dependencies
└── manage.py            # Django management script
```

## 🔧 Configuration

### Environment Variables
```bash
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/dbname

# Redis
REDIS_URL=redis://localhost:6379/0

# AI Integration
OPENAI_API_KEY=your_openai_api_key

# Security
SECRET_KEY=your_secret_key
DEBUG=False
ALLOWED_HOSTS=localhost,127.0.0.1

# CORS
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
```

### Database Configuration
```python
# PostgreSQL (Production)
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'cyberpunk_portfolio',
        'USER': 'your_user',
        'PASSWORD': 'your_password',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}

# SQLite (Development)
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}
```

## 🌐 API Endpoints

### Chat API
```
POST /api/chat/send/          # Send chat message
GET  /api/chat/history/       # Get chat history
WS   /ws/chat/               # WebSocket chat connection
```

### Contact API
```
POST /api/contact/           # Submit contact form
GET  /api/contact/           # Get contact submissions (admin)
```

### Health Check
```
GET  /api/health/            # System health status
```

## 🔄 WebSocket Integration

### Chat Consumer
```python
class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()
    
    async def receive(self, text_data):
        # Handle incoming messages
        # Process with AI
        # Send response
```

### Frontend Integration
```javascript
const socket = new WebSocket('ws://localhost:8000/ws/chat/');
socket.onmessage = function(event) {
    const data = JSON.parse(event.data);
    // Handle chat message
};
```

## 🤖 AI Integration

### OpenAI Configuration
```python
import openai

openai.api_key = settings.OPENAI_API_KEY

async def get_ai_response(message):
    response = await openai.ChatCompletion.acreate(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": message}]
    )
    return response.choices[0].message.content
```

## 🚀 Deployment

### Docker Deployment
```bash
# Build image
docker build -t cyberpunk-backend .

# Run with docker-compose
docker-compose up -d
```

### Production Settings
```python
# settings/production.py
DEBUG = False
ALLOWED_HOSTS = ['your-domain.com']
SECURE_SSL_REDIRECT = True
SECURE_HSTS_SECONDS = 31536000
```

## 📊 Monitoring & Logging

### Health Checks
- Database connectivity
- Redis connectivity
- AI service availability
- System resource usage

### Logging Configuration
```python
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'file': {
            'level': 'INFO',
            'class': 'logging.FileHandler',
            'filename': 'django.log',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['file'],
            'level': 'INFO',
            'propagate': True,
        },
    },
}
```

## 🔒 Security

### Security Features
- CORS configuration
- CSRF protection
- SQL injection prevention
- XSS protection
- Rate limiting

### Authentication
```python
# JWT Authentication (if implemented)
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
}
```

## 🧪 Testing

```bash
# Run tests
python manage.py test

# Run with coverage
coverage run --source='.' manage.py test
coverage report
```

## 📈 Performance

### Optimization Features
- Database query optimization
- Redis caching
- Async view support
- Connection pooling
- Static file serving

### Monitoring
- Django Debug Toolbar (development)
- Performance profiling
- Database query analysis
- Memory usage tracking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Write tests for new features
4. Ensure all tests pass
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.