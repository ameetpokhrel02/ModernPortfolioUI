#!/bin/bash

echo "🛑 Stopping Portfolio Application..."

# Stop and remove containers
docker compose down

echo "✅ All services stopped!"