import path from 'path';
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
      console.log(`Building image: ${imageName} from ${dockerfileDir}`);

      const stream = await docker.buildImage(
          { context: dockerfileDir, src: ['.'] },
          { t: imageName }
      );

      await new Promise((resolve, reject) => {
          docker.modem.followProgress(
              stream,
              (err, res) => {
                  if (err) {
                      reject(err);
                  } else {
                      resolve(res);
                  }
              },
              (event) => {
                  if (event.stream) {
                      process.stdout.write(event.stream); // Print logs in real-time
                  } else if (event.error) {
                      console.error(event.error);
                  }
              }
          );
      });

      console.log(`Image ${imageName} built successfully.`);
  } catch (err) {
      console.error(`Error building image ${imageName}:`, err);
  }
};


export const buildImages = async (dockerfileDirs) => {
    for (const dockerfileDir of dockerfileDirs) {
      const imageName = path.basename(dockerfileDir);
      console.log(imageName);
      const imageExists = await checkImageExists(imageName);
  
      if (!imageExists) {
        await buildImage(imageName, dockerfileDir);
      } else {
        console.log(`Image ${imageName} already exists, skipping build.`);
      }
    }
  };
  

