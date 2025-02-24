# filepath: build-and-check.sh
#!/bin/bash
set -e

echo "Building Docker images..."
docker-compose build

# You could add commands here to run tests or health checks

echo "Build successful. You can now pull new changes."