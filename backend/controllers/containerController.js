import { startContainer } from "../services/dockerContainer.js";
import { findAvailablePort } from "../utils/availablePort.js";
import net from "net";

export const startnewContainer = async (req, res) => {
  try {
    const dynamicPort = await findAvailablePort(); // Find an available port
    await startContainer("node-dev", `test-${dynamicPort}`, 8080, dynamicPort); // Start the container with the dynamic port

    console.log(`Waiting for container to be ready at http://localhost:${dynamicPort}...`);

    // Wait for the container to start listening on the assigned port
    await waitForPort(dynamicPort);

    console.log(`Container is now running at http://localhost:${dynamicPort}`);
    
    res.redirect(`http://localhost:${dynamicPort}`); // Redirect only after container is ready
  } catch (error) {
    console.error("Error starting container:", error);
    res.status(500).send("Error starting container");
  }
};

// Utility function to wait until the port is available
const waitForPort = (port, host = "localhost", timeout = 20000) => {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();

    const checkPort = () => {
      const socket = new net.Socket();
      socket.setTimeout(1000);

      socket.on("connect", () => {
        socket.destroy();
        resolve();
      });

      socket.on("error", () => {
        socket.destroy();
        if (Date.now() - startTime > timeout) {
          reject(new Error(`Timeout waiting for port ${port}`));
        } else {
          setTimeout(checkPort, 500); // Retry every 500ms
        }
      });

      socket.connect(port, host);
    };

    checkPort();
  });
};
