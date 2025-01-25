# Step 1: Use the official Node.js image as the base
FROM node:16

# Step 2: Install required tools and code-server
RUN apt-get update && apt-get install -y \
  curl git unzip \
  && curl -fsSL https://code-server.dev/install.sh | sh \
  && ln -s /usr/bin/code-server /usr/local/bin/code-server  
  # Ensure it is in PATH

# Step 3: Create a directory for the development environment
WORKDIR /workspace

# Step 4: Set up code-server configuration
RUN mkdir -p /root/.config/code-server && \
    echo "bind-addr: 0.0.0.0:8080" > /root/.config/code-server/config.yaml && \
    echo "auth: password" >> /root/.config/code-server/config.yaml && \
    echo "password: mysecurepassword" >> /root/.config/code-server/config.yaml

# Step 5: Configure VS Code settings (Dark theme, font size)
RUN mkdir -p /root/.local/share/code-server/User && \
    echo '{ \
      "workbench.colorTheme": "Default Dark+", \
      "editor.fontSize": 14, \
      "window.zoomLevel": 1, \
      "terminal.integrated.fontSize": 14 \
    }' > /root/.local/share/code-server/User/settings.json

# Step 6: Create a sample Node.js project with an index.js file
RUN mkdir -p /workspace/project && \
    echo 'console.log("Hello, Node.js!");' > /workspace/project/index.js

# Step 7: Expose the port for code-server
EXPOSE 8080

# Step 8: Start code-server with the workspace and open index.js
CMD ["code-server", "--auth", "password", "--bind-addr", "0.0.0.0:8080", "/workspace/project"]
