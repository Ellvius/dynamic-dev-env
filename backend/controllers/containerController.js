import { startContainer } from "../services/dockerContainer.js";
import { findAvailablePort } from "../utils/availablePort.js";
import net from "net";

export const startnewContainer = async (req, res) => {
  try {
    const dynamicPort = await findAvailablePort(); // Find an available port
    await startContainer("node-dev", `test-${dynamicPort}`, 8080, dynamicPort); // Start the container with the dynamic port

    console.log(`Waiting for container to be ready at http://localhost:${dynamicPort}...`);

    // Wait for the container to start listening on the assigned port
    //await waitForPort(dynamicPort);

    console.log(`Container is now running at http://localhost:${dynamicPort}`);
    
    res.json({ redirectUrl: `http://localhost:${dynamicPort}` }); // Redirect only after container is ready
  } catch (error) {
    console.error("Error starting container:", error);
    res.status(500).send("Error starting container");
  }
};

// Utility function to wait until the port is available
