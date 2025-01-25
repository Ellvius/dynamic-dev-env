# Step 1: Use the official Ubuntu image as the base
FROM ubuntu:22.04

# Step 2: Install required tools and code-server
RUN apt-get update && apt-get install -y \
  build-essential cmake gdb clang curl git unzip \
  && curl -fsSL https://code-server.dev/install.sh | sh

# Step 3: Create a directory for the development workspace
WORKDIR /workspace

# Step 4: Set up code-server to start on container launch
RUN mkdir -p /root/.config/code-server && \
    echo "bind-addr: 0.0.0.0:8080" >> /root/.config/code-server/config.yaml && \
    echo "auth: password" >> /root/.config/code-server/config.yaml && \
    echo "password: mysecurepassword" >> /root/.config/code-server/config.yaml

# Step 5: Expose the port for code-server
EXPOSE 8080

# Step 6: Start code-server
CMD ["code-server", "--auth", "password", "--bind-addr", "0.0.0.0:8080"]
