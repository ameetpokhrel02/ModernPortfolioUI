#!/bin/bash

# Local Development Setup Script
echo "🛠️ Setting up local development environment..."

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check prerequisites
echo "🔍 Checking prerequisites..."

if ! command_exists node; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

if ! command_exists python3; then
    echo "❌ Python 3 is not installed. Please install Python 3.9+ first."
    exit 1
fi

if ! command_exists redis-server; then
    echo "⚠️ Redis is not installed. Installing Redis..."
    if command_exists apt-get; then
        sudo apt-get update && sudo apt-get install -y redis-server
    elif command_exists brew; then
        brew install redis
    else
        echo "❌ Please install Redis manually."
        exit 1
    fi
fi

# Start Redis
echo "🔴 Starting Redis server..."
redis-server --daemonize yes --port 6379

# Setup Backend
echo "🐍 Setting up backend..."
cd backend

if [ ! -d "venv" ]; then
    echo "📦 Creating Python virtual environment..."
    python3 -m venv venv
fi

echo "🔧 Activating virtual environment and installing dependencies..."
source venv/bin/activate
pip install -r requirements.txt

# Create .env if it doesn't exist
if [ ! -f ".env" ]; then
    cat > .env << EOF
SECRET_KEY=your-secret-key-change-this-in-production
DEBUG=True
DATABASE_URL=sqlite:///db.sqlite3
REDIS_URL=redis://localhost:6379/0
OPENAI_API_KEY=your_openai_api_key_here
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
ALLOWED_HOSTS=localhost,127.0.0.1
EOF
    echo "✅ Created backend/.env"
fi

echo "🗄️ Running database migrations..."
python manage.py migrate

echo "👤 Creating superuser (optional)..."
echo "You can skip this by pressing Ctrl+C"
python manage.py createsuperuser || true

cd ..

# Setup Frontend
echo "⚛️ Setting up frontend..."
cd frontend

if [ ! -d "node_modules" ]; then
    echo "📦 Installing Node.js dependencies..."
    npm install
fi

# Create .env if it doesn't exist
if [ ! -f ".env" ]; then
    cat > .env << EOF
VITE_API_BASE_URL=http://localhost:8000/api
VITE_WS_BASE_URL=ws://localhost:8000/ws
EOF
    echo "✅ Created frontend/.env"
fi

cd ..

# Create start script
cat > start-dev.sh << 'EOF'
#!/bin/bash

echo "🚀 Starting development servers..."

# Start backend in background
echo "🐍 Starting Django backend..."
cd backend
source venv/bin/activate
python manage.py runserver 8000 &
BACKEND_PID=$!
cd ..

# Wait a moment for backend to start
sleep 3

# Start frontend in background
echo "⚛️ Starting React frontend..."
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

echo "✅ Development servers started!"
echo "   Frontend: http://localhost:5173"
echo "   Backend: http://localhost:8000"
echo ""
echo "Press Ctrl+C to stop all servers"

# Function to cleanup on exit
cleanup() {
    echo "🛑 Stopping servers..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    exit 0
}

# Set trap to cleanup on script exit
trap cleanup INT TERM

# Wait for processes
wait
EOF

chmod +x start-dev.sh

echo "🎉 Local development setup complete!"
echo ""
echo "🚀 To start development servers:"
echo "   ./start-dev.sh"
echo ""
echo "🔧 Manual commands:"
echo "   Backend: cd backend && source venv/bin/activate && python manage.py runserver"
echo "   Frontend: cd frontend && npm run dev"