module.exports = {
    apps: [
        {
            name: 'portfolio',
            script: 'server.js',
            watch: '.',
            env: {
                NODE_ENV: 'development',
                // Path to .env file for development
                path: '/home/ec2-user/projects/portfolio/.env',
            },
            env_production: {
                NODE_ENV: 'production',
                // Path to .env file for production
                path: '/home/ec2-user/projects/portfolio/.env',
            },
        }
    ],

    deploy: {
        production: {
            user: 'SSH_USERNAME',
            host: 'SSH_HOSTMACHINE',
            ref: 'origin/master',
            repo: 'GIT_REPOSITORY',
            path: 'DESTINATION_PATH',
            'pre-deploy-local': '',
            'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
            'pre-setup': ''
        }
    }
};
