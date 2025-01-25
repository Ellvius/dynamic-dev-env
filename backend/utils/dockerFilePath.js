import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PATH = path.resolve(__dirname);
console.log('Resolved path:', PATH);

const DOCKERFILES_DIR = path.join(PATH, '../dockerfiles');

// Correctly construct paths for dockerfile directories
export const dockerfileDirs = [
    path.join(DOCKERFILES_DIR, 'node-dev'),
    path.join(DOCKERFILES_DIR,'python-dev'),
];

console.log('Dockerfile directories:', dockerfileDirs);
