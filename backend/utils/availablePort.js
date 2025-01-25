import { listContainers } from "../services/dockerContainer.js";

export const findAvailablePort = async (basePort = 5101) => {
    let port = basePort;
    while (true) {
      const containers = await listContainers();
      const isPortUsed = containers.some(container => {
        // Check if the container's ports contain the port in use
        return container.Ports.some(portInfo => portInfo.PublicPort === port);
      });
  
      if (!isPortUsed) {
        return port;
      }
  
      port++; 
    }
  };