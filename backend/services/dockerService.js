import { logger } from '../utils/logger.js';
import docker from '../config/dockerClient.js';

export const startContainer = async (image, containerName, port) => {
  try {
    const container = await docker.createContainer({
      Image: image,
      name: containerName,
      ExposedPorts: {
        '80/tcp': {} 
      },
      HostConfig: {
        PortBindings: {
          '80/tcp': [
            {
              HostPort: port,  
            },
          ],
        },
      },
    });
    
    await container.start();
    logger.info(`Container ${containerName} started`);
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
    await container.remove();
    logger.info(`Container ${containerName} stopped and removed`);
  } catch (error) {
    logger.error(`Error stopping container: ${error.message}`);
    throw error;
  }
};

export const listContainers = async () => {
  try {
    const containers = await docker.listContainers();
    return containers;
  } catch (error) {
    logger.error(`Error listing containers: ${error.message}`);
    throw error;
  }
};


export const createCodeContainer = async () => {
//   // Docker login credentials
//   const username = process.env.DOCKER_USERNAME;
//   const password = process.env.DOCKER_PASSWORD;
  
  try {
    // // Log in to Docker
    // await docker.login({ username, password });
    // console.log('Docker login successful');
    
    // Pull the image after login
    await docker.pull('ghcr.io/coder/code-server', (err, stream) => {
      if (err) {
        console.error('Error pulling image:', err);
        return;
      }
      
      // Wait for the image to finish pulling
      docker.modem.followProgress(stream, async () => {
        // Now create and start the container
        const container = await docker.createContainer({
          Image: 'ghcr.io/coder/code-server',
          name: `dev-environment-code`,
          Env: ['PASSWORD=mysecurepassword'],
          ExposedPorts: {
            '8080/tcp': {},
          },
          HostConfig: {
            PortBindings: {
              '8080/tcp': [{
                HostPort: '0', 
              }],
            },
          },
        });

        await container.start();
        console.log('Container started successfully');
        return container;
      });
    });
  } catch (error) {
    console.error('Failed to login or create/start container:', error);
  }
};
