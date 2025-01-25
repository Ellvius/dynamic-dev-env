import { startContainer } from "../services/dockerContainer.js";
import { listContainers } from "../services/dockerContainer.js";
import { findAvailablePort } from "../utils/availablePort.js";



export  const startnewContainer = async(req, res) => {
    const port = await findAvailablePort();
    console.log(port)
    await startContainer('node-dev', 'test-2', 8080, port);
    console.log('redirected to node env');
    res.redirect(`http://localhost:${port}`);
}