module.exports = {
  apps : [{
    script: './dist/index.js',
    watch: '.',
    env: {
      NODE_ENV: "production",
    }
  },
   ],
};
