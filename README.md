# web-sockets-form

## Nginx as a web socket load balancer 
1. [ Install Nginx ](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-20-04#:~:text=user%20to%20begin.-,Step%201%20%E2%80%93%20Installing%20Nginx,sbin/nginx%20%2Dg%20daemon%20on%3B%20master_process%20on%3B%0A%20%20%20%20%20%20%20%20%20%20%20%E2%94%94%E2%94%802380%20nginx%3A%20worker%20process,-As%20confirmed%20by) 
2. Go to /etc folder and paste the following commands. These commands are used to edit the nginx.conf file as a root user. [Stackoverflow](https://stackoverflow.com/questions/51004206/vscode-always-ask-for-permission-to-save#:~:text=Using%20chown%20command,up%20to%20you)
   1. ```sudo chown <lowercase_linux_username> nginx``` => Eg : sudo chown praveen nginx
   2. ```sudo chown <lowercase_linux_username> nginx/nginx.conf```
3. In the /etc/nginx/nginx.conf file remove all the contents and paste the below code [Websocket Nginx](https://www.nginx.com/blog/websocket-nginx/)
4. Here my backend servers are running in port 8080 and have been mapped to 1111 and 2222 ports using the following commands
   1. ```sudo docker build . -t web-sockets-backend-v2.0.1```
   2. ```docker run -p 1111:8080 -it web-sockets-backend-v2.0.1```
   3. ```docker run -p 2222:8080 -it web-sockets-backend-v2.0.1```
```
http {

	include mime.types;

	map $http_upgrade $connection_upgrade {
        default upgrade;
        '' close;
    }

	upstream backendserver {
		server localhost:1111;
		server localhost:2222;
	}

	server {
		listen 8080;
		location / {
			proxy_pass http://backendserver/;
			proxy_http_version 1.1;
    		proxy_set_header Upgrade $http_upgrade;
    		proxy_set_header Connection "Upgrade";
			proxy_set_header Host $host;
		}
	}
}
```
1. Nginx commands
   1. sudo systemctl start nginx
   2. sudo systemctl stop nginx
   3. sudo systemctl restart nginx


## Redis server
Install redis => ```sudo snap install redis```  
Start redis server => ```sudo snap start redis```   
Stop redis server => ```sudo snap stop redis```  

(or) ```redis-server --port 6380 --slaveof 127.0.0.1 6379``` (if 6379 is occupied) 
(or) 6379 was made free using the following command```/etc/init.d/redis-server stop```
  
Can't handle RDB format version 10
197461:M 30 Jun 2023 18:57:58.089 # Fatal error loading the DB: Invalid argument. Exiting.  
The following error was solved using the below command
```sudo find / -name *.rdb```
Remove all the dump files returned from the above command
```sudo rm /home/praveen/dump.rdb```

## Kafka setup
[Install kafka Ubuntu](https://www.conduktor.io/kafka/how-to-install-apache-kafka-on-linux-without-zookeeper-kraft-mode/)  
Start Kafka in the Kraft mode(Replace the kafka version with the version installed in your laptop)  
 - ```kafka-storage.sh random-uuid```  
 - ```kafka-storage.sh format -t <uuid> -c ~/kafka_2.13-3.4.1/config/kraft/server.properties```  
 - ```kafka-server-start.sh ~/kafka_2.13-3.4.1/config/kraft/server.properties```
 - ```kafka-topics.sh --bootstrap-server localhost:9092 --topic second_topic --create --partitions 3```
 - ```kafka-console-producer.sh --bootstrap-server localhost:9092 --topic second_topic```
 - ```kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic second_topic --group my-first-application```



 
