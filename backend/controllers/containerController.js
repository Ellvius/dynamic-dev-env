import app from "../app.js";
import { startContainer } from "../services/dockerContainer.js";
import { findAvailablePort } from "../utils/availablePort.js";
import { createProxyMiddleware } from "http-proxy-middleware";

export const startnewContainer = async (req, res) => {
  try {
    const dynamicPort = await findAvailablePort(); // Dynamically find an available port
    await startContainer('node-dev', 'test-2', 8080, dynamicPort); // Start the container with the dynamic port
    
    console.log(`Container started at http://localhost:${dynamicPort}`);

    // Set up the proxy middleware dynamically for CORS handling
    app.use('/dev-container', createProxyMiddleware({
      target: `http://localhost:${dynamicPort}`, // Target the dynamic port of the container
      changeOrigin: true,
      pathRewrite: { '^/dev-container': '' },
      onProxyReq: (proxyReq, req, res) => {
        // You can add any custom headers here if needed
        proxyReq.setHeader('Access-Control-Allow-Origin', '*');
        proxyReq.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        proxyReq.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      },
      onProxyRes: (proxyRes, req, res) => {
        // Ensure the response includes the correct CORS headers
        proxyRes.headers['Access-Control-Allow-Origin'] = '*';
        proxyRes.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
        proxyRes.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization';
      },
    }));

    res.redirect(`http://localhost:${dynamicPort}`); // Redirect to the dynamic port
  } catch (error) {
    console.error('Error starting container:', error);
    res.status(500).send('Error starting container');
  }
};
