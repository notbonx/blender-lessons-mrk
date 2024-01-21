import path from 'path';

const rootDirectory = '.';
const buildDirectory = path.join(rootDirectory, 'build');
const workDirectory = path.join(rootDirectory, 'src/data');

const buildFile = 'index.json';
const additionalInfoFile = 'index.json';

export { rootDirectory, buildDirectory, buildFile, additionalInfoFile, workDirectory };
