import { listContainers } from "./services/dockerContainer.js";
import { startContainer } from "./services/dockerContainer.js";
listContainers();
const containername = startContainer('node-dev', 'test4', 8080, "5000");