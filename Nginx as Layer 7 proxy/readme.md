# start 4 docker process

docker run -p 2222:9999 -e APPID=2222 -d nodeapp
docker run -p 3333:9999 -e APPID=3333 -d nodeapp

docker run -p 4444:9999 -e APPID=4444 -d nodeapp

docker run -p 5555:9999 -e APPID=5555 -d nodeapp

# idea is if someone go to my ebsite or page, I want to proxy it to my backend

will change the conf file.
