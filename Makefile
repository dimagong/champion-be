build:
	docker build -t image-champion .
run: 
	docker run -p 5050:5050 -d --rm --name container-champion dimagong/image-champion-be:7.23
run-dev: 
	docker run -p 5050:5050 -d -v "/D/project/champion-be:/docker-champion-be" -v /docker-champion-be/node_modules --name container-champion-value dimagong/image-champion
stop:
	docker stop container-champion