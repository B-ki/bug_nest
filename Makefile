ENV_FILE = .env
include $(ENV_FILE)

DOCKER = docker
COMPOSE = $(DOCKER) compose --env-file $(ENV_FILE)

all: dev

dev:  docker-compose.dev.yml dev.build dev.upd

%.upd:	$(ENV_FILE)
	$(COMPOSE) -f docker-compose.$*.yml up -d

%.up:		$(ENV_FILE)
	$(COMPOSE) -f docker-compose.$*.yml up

%.start:
	$(COMPOSE) -f docker-compose.$*.yml start

%.stop:
	$(COMPOSE) -f docker-compose.$*.yml stop

%.down:
	$(COMPOSE) -f docker-compose.$*.yml down

%.restart:	$(ENV_FILE)
	$(COMPOSE) -f docker-compose.$*.yml restart

%.build:
	$(COMPOSE) -f docker-compose.$*.yml build

%.clean:
	$(COMPOSE) -f docker-compose.$*.yml down -v

fclean: dev.clean 
	$(DOCKER) system prune -a --volumes -f

re: fclean dev

.PHONY: all dir upd up stop down restart build clean ps re
