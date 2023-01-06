install:
	@cd ./backend && yarn install
	@cd ./frontend && yarn install

config:
	@cp ./backend/.env.dist backend/.env
	@cp ./frontend/.env.dist frontend/.env

down:
	@docker compose down --remove-orphans

dev: down install
	@docker compose -f docker-compose.yaml -f docker-compose.dev.yaml up -d
	@cd ./backend && yarn db:deploy && cd ..
	@echo "And go to backend/ and frontend/ to launch manually"

prod-build:
	@docker compose -f docker-compose.yaml -f docker-compose.prod.yaml build

prod-deploy: down
	@docker compose -f docker-compose.yaml -f docker-compose.prod.yaml up -d

