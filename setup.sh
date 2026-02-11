#!/bin/bash

# Cyberpunk Portfolio Setup Script
echo "🚀 Setting up Cyberpunk Portfolio..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Create environment files if they don't exist
echo "📝 Creating environment files..."

# Frontend .env
if [ ! -f "frontend/.env" ]; then
    cat > frontend/.env << EOF
VITE_API_BASE_URL=http://localhost:8001/api
VITE_WS_BASE_URL=ws://localhost:8001/ws
EOF
    echo "✅ Created frontend/.env"
fi

# Backend .env
if [ ! -f "backend/.env" ]; then
    cat > backend/.env << EOF
SECRET_KEY=your-secret-key-change-this-in-production
DEBUG=True
DATABASE_URL=sqlite:///db.sqlite3
REDIS_URL=redis://localhost:6380/0
OPENAI_API_KEY=your_openai_api_key_here
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
ALLOWED_HOSTS=localhost,127.0.0.1
EOF
    echo "✅ Created backend/.env"
fi

# Build and start services
echo "🐳 Building and starting Docker containers..."
docker-compose up -d --build

# Wait for services to be ready
echo "⏳ Waiting for services to start..."
sleep 10

# Check if services are running
if docker-compose ps | grep -q "Up"; then
    echo "✅ Services are running!"
    echo ""
    echo "🌐 Access your application:"
    echo "   Frontend: http://localhost:3000"
    echo "   Backend API: http://localhost:8001"
    echo "   Redis: localhost:6380"
    echo ""
    echo "📊 View logs:"
    echo "   docker-compose logs -f"
    echo ""
    echo "🛑 Stop services:"
    echo "   docker-compose down"
else
    echo "❌ Some services failed to start. Check logs:"
    echo "   docker-compose logs"
fi

echo "🎉 Setup complete!"