/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ["**/.*"],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: "build/index.js",
  // publicPath: "/build/",
};

// remix.config.js
/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  future: {
    unstable_tailwind: true,
  },
};
