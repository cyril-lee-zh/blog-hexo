# /bin/bash

git pull

npm install
echo '-- package installed'

pm2 stop blog-hexo

hexo clean
hexo g
hexo s
