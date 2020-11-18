const fs = require("fs");
fs.writeFileSync(
  "./.env",
  `GITHUB_KEY=${process.env.GITHUB_KEY}\n BASE_URL=${process.env.BASE_URL}\n`
);
