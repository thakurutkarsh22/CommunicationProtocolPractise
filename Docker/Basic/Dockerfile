FROM node:16
WORKDIR /app/lehsun
COPY app /app
RUN npm install
CMD npm run nginxapp
EXPOSE 9999



# RUN THIS in terminal (IMAGE CREATION )
# docker build -t nodeapp .


# RUN THE IMAGE IN THE CONTAINER 
#  docker run --name nodeapp -p 9999:9999 nodeapp 