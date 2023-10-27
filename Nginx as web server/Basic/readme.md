# install nginx and then go to /usr/local/etc/nginx

# have to change nginx.conf file to the below thing

<!-- http {

	server {
	  listen 8080;
	}



}

events {}

 -->

# go to the localhost:port(8080) and see the default page. Its because the nginx takes the default things if path is nto specified.

# commands

## nginx -s stop (to stop the old process)

# add path of your folder to server

<!-- http {

	server {
	  listen 8081;
	  root /Users/uthkarshthakur/Desktop/CommunicationProtocolPractise/Nginx/Basic;
	}



}

events {} -->

# after this the page you are going to give will be served.

<!-- Now I have added site 1 and site 2 -->

<!-- -------- IIN THE SAME ROOT ------- -->
<!-- localhost:port(8080)/site1 -->
<!-- localhost:port(8080)/ -->

<!-- IN COMPLETLY DIFFERENT PATH  -->

<!-- localhost:port(8080)/images        ; this would be forbidden -->

<!-- localhost:port(8080)/images/abc.png -->
