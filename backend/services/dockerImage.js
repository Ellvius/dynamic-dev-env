import { logger } from '../utils/logger.js';
import docker from '../config/dockerClient.js';

export const checkImageExists = async (imageName) => {
    try {
      const images = await docker.listImages();
      return images.some((image) => image.RepoTags && image.RepoTags.includes(imageName));
    } catch (err) {
      console.error('Error checking image existence:', err);
      return false;
    }
};


export const buildImage = async (imageName, dockerfileDir) => {
    try {
      console.log(`Building image: ${imageName}`);
  
      const stream = await docker.buildImage({
        context: dockerfileDir, 
        src: ['.'], 
      }, {
        t: imageName, 
      });
  
      await new Promise((resolve, reject) => {
        docker.modem.followProgress(stream, (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        });
      });
  
      console.log(`Image ${imageName} built successfully.`);
    } catch (err) {
      console.error(`Error building image ${imageName}:`, err);
    }
  };


export const buildImages = async (dockerfileDirs) => {
    for (const dockerfileDir of dockerfileDirs) {
      const imageName = path.basename(dockerfileDir);
  
      const imageExists = await checkImageExists(imageName);
  
      if (!imageExists) {
        await buildImage(imageName, dockerfileDir);
      } else {
        console.log(`Image ${imageName} already exists, skipping build.`);
      }
    }
  };
  

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
    return containers;
  } catch (error) {
    logger.error(`Error listing containers: ${error.message}`);
    throw error;
  }
};
