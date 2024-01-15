import { configDotenv } from 'dotenv';

configDotenv({ path: '.env' });

// const StorageConfig = {
//   projectId: process.env.GOOGLE_PROJECT_ID,
//   privateKey: process.env.GOOGLE_PRIVATE_KEY.replaceAll(/\\n/g, '\n'),
//   clientEmail: process.env.GOOGLE_CLIENT_EMAIL,
//   mediaBucket: process.env.GOOGLE_MEDIA_BUCKET,
// };
// export default StorageConfig;
