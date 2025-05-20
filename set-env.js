const fs = require('fs');
const path = require('path');

// Access environment variables directly from process.env
const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
console.log(process.env)
console.log(process.env.GOOGLE_MAPS_API_KEY)

if (!GOOGLE_MAPS_API_KEY) {
  console.error('❌ Missing required environment variables.');
  process.exit(1);
}

const prodEnvPath = path.resolve(__dirname, 'src/environments/environment.prod.ts');

const fileContent = `export const environment = {
  production: true,
  googleMapsApiKey: "${GOOGLE_MAPS_API_KEY}"
};
`;

fs.writeFileSync(prodEnvPath, fileContent);
console.log('✔️ environment.prod.ts generated from system environment variables.');
