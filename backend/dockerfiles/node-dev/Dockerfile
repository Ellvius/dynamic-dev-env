# Step 1: Use the official Node.js image as the base
FROM node:16

# Step 2: Install required tools and code-server
# Update package lists
RUN apt-get update && apt-get install -y \
  curl \
  git \
  unzip \
  && curl -fsSL https://code-server.dev/install.sh | sh

# Step 3: Create a directory for the development environment
WORKDIR /workspace

# Step 4: Set up code-server to start on container launch
RUN mkdir -p /root/.config/code-server && \
    echo "bind-addr: 0.0.0.0:8080" >> /root/.config/code-server/config.yaml && \
    echo "auth: password" >> /root/.config/code-server/config.yaml && \
    echo "password: mysecurepassword" >> /root/.config/code-server/config.yaml

# Step 5: Expose the port for code-server and the Node.js application
EXPOSE 8080

# Step 6: Start code-server
CMD ["code-server", "--auth", "password", "--bind-addr", "0.0.0.0:8080"]
