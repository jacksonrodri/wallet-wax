module.exports = {
  apps : [{
    script: './bin/www',
    watch: '.',
    ignore_watch: [".git", "node_modules", "public"],
  }],
};
