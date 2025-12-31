#!/bin/bash

echo "🔄 Resetting Portfolio Application..."

# Stop containers and remove volumes
docker compose down -v

# Remove images
docker compose down --rmi all

# Rebuild everything
docker compose up --build -d

echo "✅ Application reset and restarted!"
echo "📱 Frontend: http://localhost:5174"
echo "🔧 Backend API: http://localhost:8001/api"
echo "⚙️  Django Admin: http://localhost:8001/admin"