import { logger } from '../utils/logger.js';
import docker from '../config/dockerClient.js';

export const makeContainer = async (image, containerName, containerPort, hostPort) => {
    try {
        hostPort = String(hostPort);
        const container = await docker.createContainer({
        Image: image,              
        name: containerName,        
        ExposedPorts: {
          [`${containerPort}/tcp`]: {}, 
        },
        HostConfig: {
          PortBindings: {
            [`${containerPort}/tcp`]: [
              {
                HostPort: hostPort,   
              },
            ],
          },
        },
      });

      // await container.start();
      logger.info(`Container ${containerName} started with port ${hostPort}`);
      return container;
    } catch (error) {
      logger.error(`Error starting container: ${error.message}`);
      throw error;
    }
};

  
  export const stopContainer = async (containerName) => {
    try {
      const container = docker.getContainer(containerName);
      await container.stop();
      logger.info(`Container ${containerName} stopped`);
    } catch (error) {
      logger.error(`Error stopping container: ${error.message}`);
      throw error;
    }
  };

  export const startContainer = async (containerName) => {
    try {
      const container = docker.getContainer(containerName);
      await container.start();
      logger.info(`Container ${containerName} started`);
    } catch (error) {
      logger.error(`Error starting container: ${error.message}`);
      throw error;
    }
  }

  export const deleteContainer = async (containerName) => {
    try {
      const container = docker.getContainer(containerName);
      await container.remove();
      logger.info(`Container ${containerName} removed`);
    } catch (error) {
      logger.error(`Error removing container: ${error.message}`);
      throw error;
    }
  };
  
  export const listContainers = async () => {
    try {
      const containers = await docker.listContainers();
      console.log(containers);
      return containers;
    } catch (error) {
      logger.error(`Error listing containers: ${error.message}`);
      throw error;
    }
  };

  export const createAllContainers = async (username) => {
    try {
      const images = ["node-dev", "python-dev"]; 
      const userContainers = {}; 
  
      for (const devEnv of images) {
        const dynamicPort = await findAvailablePort(); 
        const containerName = `${username}-${devEnv}-${dynamicPort}`; 
  
        await makeContainer(devEnv, containerName, 8080, dynamicPort); 
        console.log(`Created container: ${containerName} on port ${dynamicPort}`);
  
        
        userContainers[devEnv] = {
          containerName,
          port: dynamicPort,
          url: `http://localhost:${dynamicPort}`,
        };
      }
  
      return userContainers; 
  
    } catch (error) {
      console.error(`Error creating containers: ${error.message}`);
      throw error;
    }
  };
  
  