module.exports = {
  apps: [
    {
      name: 'myapp',
      script: 'npm run start:ecomm-development',
      watch: true,
      env: {
        PORT: 3000,
        NODE_ENV: 'development',
        PRIVATE_KEY: 'prismalink123',
        HMAC: 'prismalink2020'
      },
      env_production: {
        PORT: 3000,
        NODE_ENV: 'production',
        PRIVARTE_KEY: 'prismalink123!',
        HMAC: 'prismalink2020'
      }
    }
  ]
}
