import { startContainer } from "../services/dockerContainer.js";
import { findAvailablePort } from "../utils/availablePort.js";

export const startnewContainer = async (req, res) => {
  const username = req.body.username|| 'lishin';
  const dev = req.query.dev || 'python-dev';
  try {
    const dynamicPort = await findAvailablePort(); 
    await startContainer(dev, `${username}-${dev}-${dynamicPort}`, 8080, dynamicPort); 
    console.log(`Waiting for container to be ready at http://localhost:${dynamicPort}...`);

    console.log(`Container is now running at http://localhost:${dynamicPort}`);
    
    res.json({ redirectUrl: `http://localhost:${dynamicPort}` }); 
  } catch (error) {
    console.error("Error starting container:", error);
    res.status(500).send("Error starting container");
  }
};

