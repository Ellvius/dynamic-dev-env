# Step 1: Use the official Ubuntu image as the base
FROM ubuntu:22.04

# Step 2: Install required tools and code-server
RUN apt-get update && apt-get install -y \
  build-essential cmake gdb clang lld curl git unzip \
  && curl -fsSL https://code-server.dev/install.sh | sh \
  && ln -s /usr/bin/code-server /usr/local/bin/code-server  # Ensure it is in PATH

# Step 3: Create a directory for the development workspace
WORKDIR /workspace

# Step 5: Set up code-server configuration
RUN mkdir -p /root/.config/code-server && \
    echo "bind-addr: 0.0.0.0:8080" > /root/.config/code-server/config.yaml && \
    echo "auth: password" >> /root/.config/code-server/config.yaml && \
    echo "password: mysecurepassword" >> /root/.config/code-server/config.yaml

# Step 6: Create a sample C++ file
RUN mkdir -p /workspace/project && \
    echo '#include <iostream>\nusing namespace std;\nint main() {\n    cout << "Hello, C++!" << endl;\n    return 0;\n}' \
    > /workspace/project/main.cpp

# Step 7: Configure VS Code settings (Dark theme, font size)
RUN mkdir -p /root/.local/share/code-server/User && \
    echo '{ \
      "workbench.colorTheme": "Default Dark+", \
      "editor.fontSize": 14, \
      "window.zoomLevel": 1, \
      "terminal.integrated.fontSize": 14 \
    }' > /root/.local/share/code-server/User/settings.json

# Step 8: Expose the port for code-server
EXPOSE 8080

# Step 9: Start code-server with the workspace and open main.cpp
CMD ["code-server", "--auth", "password", "--bind-addr", "0.0.0.0:8080", "/workspace/project"]
