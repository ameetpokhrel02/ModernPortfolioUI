#!/bin/bash

echo "🚀 Starting Portfolio Application with Docker..."

# Build and start services
docker compose up --build -d

echo "✅ Services started!"
echo "📱 Frontend: http://localhost:5174"
echo "🔧 Backend API: http://localhost:8001/api"
echo "⚙️  Django Admin: http://localhost:8001/admin"
echo "👤 Admin credentials: admin / admin123"

# Show logs
echo ""
echo "📋 Showing logs (Ctrl+C to stop viewing logs):"
docker compose logs -f