import { startContainer, stopContainer, createCodeContainer } from './services/dockerImage.js';

// // Test starting a container with a Node.js environment
// startContainer('node:14', 'dev-container-1', '8080').then(container => {
//   console.log('Container started');
//   // You can test stopping the container later:
//   // stopContainer('dev-container-1');
// }).catch(console.error);

createCodeContainer().then(container => {
    console.log("code server started");
}).catch(console.error);