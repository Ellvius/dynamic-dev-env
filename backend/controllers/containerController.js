import { startContainer } from "../services/dockerContainer.js";
import { findAvailablePort } from "../utils/availablePort.js";
import { createAllContainers } from "../services/dockerContainer.js";

const userContainers = {}; 

export const initializeContainers = async (req, res) => {
  const username = req.body.username || 'lishin';

  try {
    userContainers[username] = await createAllContainers(username); 
    console.log(`Containers for all images initialized for ${username}`);
    res.status(200).json({ message: "Containers initialized successfully" });
  } catch (error) {
    console.error("Error initializing containers:", error);
    res.status(500).json({ message: "Failed to initialize containers" });
  }
};

export const startnewContainer = async (req, res) => {
  const username = req.body.username;
  const devEnv = req.body.dev || 'node-dev';

  try {
    if (!userContainers[username] || !userContainers[username][devEnv]) {
      return res.status(404).json({ message: "No pre-initialized container found" });
    }

    const { containerName, port, url } = userContainers[username][devEnv];

    console.log(`Serving pre-created container ${containerName} at ${url}`);

    setTimeout(async () => {
      try {
        const dynamicPort = await findAvailablePort();
        const newContainerName = `${username}-${devEnv}-${dynamicPort}`;

        await startContainer(devEnv, newContainerName, 8080, dynamicPort);
        console.log(`Created replacement container ${newContainerName} on port ${dynamicPort}`);

        userContainers[username][devEnv] = {
          containerName: newContainerName,
          port: dynamicPort,
          url: `http://localhost:${dynamicPort}`,
        };
      } catch (error) {
        console.error(`Error creating replacement container: ${error.message}`);
      }
    }, 1000); // Delay to ensure fast response before starting a new one

    res.json({ redirectUrl: url });

  } catch (error) {
    console.error("Error serving container:", error);
    res.status(500).json({ message: "Error serving container" });
  }
};
