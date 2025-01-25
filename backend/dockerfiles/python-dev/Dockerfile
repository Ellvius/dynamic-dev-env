FROM python:3.10

# Step 1: Install required tools
RUN apt-get update && apt-get install -y \
  curl \
  git \
  unzip \
  && curl -fsSL https://code-server.dev/install.sh | sh

# Step 2: Create a directory for the development environment
WORKDIR /workspace

# Step 3: Set up code-server to start on container launch
RUN mkdir -p /root/.config/code-server && \
    echo "bind-addr: 0.0.0.0:8080" >> /root/.config/code-server/config.yaml && \
    echo "auth: password" >> /root/.config/code-server/config.yaml && \
    echo "password: mysecurepassword" >> /root/.config/code-server/config.yaml

# Step 4: Install Flask, NumPy, and Pandas
RUN pip install --upgrade pip \
    && pip install flask numpy pandas

# Step 5: Expose the port for code-server
EXPOSE 8080

# Step 6: Start code-server
CMD ["code-server", "--auth", "password", "--bind-addr", "0.0.0.0:8080"]