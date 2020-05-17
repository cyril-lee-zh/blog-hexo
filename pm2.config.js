module.exports = {
    /**
     * Application configuration section
     * http://pm2.keymetrics.io/docs/usage/application-declaration/
     */
    apps : [

        //First application
        {
            name      : 'blog-hexo',
            script    : 'hexo s',
            log_date_format: "YYYY-MM-DD HH:mm:ss.SSS",
            watch:false,// 监控变化的目录，一旦变化，自动重启
            env: {
                NODE_ENV:'blog-hexo'
            },
            max_memory_restart: "1000M",
            out_file:'/dev/null'
        }
    ]
};

