import { logger } from '../utils/logger.js';
import docker from '../config/dockerClient.js';

export const startContainer = async (image, containerName, containerPort, hostPort) => {
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

      await container.start();
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
      // await container.remove();
      logger.info(`Container ${containerName} stopped and removed`);
    } catch (error) {
      logger.error(`Error stopping container: ${error.message}`);
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
  