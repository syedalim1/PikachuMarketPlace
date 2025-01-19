/**@type {import ("drizzle-kit").Config}*/

export default {
  schema: "./configs/schema.js",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://car-market-place_owner:xVTwEFoNG7P0@ep-falling-breeze-a5dwcjib.us-east-2.aws.neon.tech/car-market-place?sslmode=require",
  },
};
