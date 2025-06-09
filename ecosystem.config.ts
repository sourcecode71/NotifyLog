// ecosystem.config.js
module.exports = {
  apps: [
    {
      name: 'notify-server',
      script: './dist/main.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '200M',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
module.exports = {
  apps: [
    {
      name: 'notify-server',
       script: './dist/main.js',
      instances: 1,              // or "max" for all CPUs
      autorestart: true,
      watch: false,             // Set true if you want hot reload in dev
      max_memory_restart: '200M',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
