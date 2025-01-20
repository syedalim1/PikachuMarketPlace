/**@type {import ("drizzle-kit").Config}*/

export default {
  schema: "./configs/schema.js",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://neondb_owner:yzjp0qMnkXN7@ep-green-morning-a8yuto4d.eastus2.azure.neon.tech/neondb?sslmode=require",
  },
};
