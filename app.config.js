import "dotenv/config";

export default ({ config }) => ({
  ...config,
  extra: {
    googleWebId: process.env.googleWebId,
    API_URL: process.env.API_URL,
    googleAndroidId: process.env.googleAndroidId,
  },
});
