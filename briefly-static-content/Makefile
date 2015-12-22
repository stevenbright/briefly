# Babel+ReactJS makefile

TO			=	target/release/brieflyWebsite/web
NBIN		= ./node_modules/.bin
PORT		= 8000

.PHONY: clean browserify libs test watch compile server static


# Targets

all: compile

node_modules:
	npm install --save-dev

target:
	mkdir -p $(TO)
	mkdir -p $(TO)/js

clean:
	rm -rf target

$(TO)/libs/bootstrap:
	mkdir -p $(TO)/libs/bootstrap

libs: target node_modules $(TO)/libs/bootstrap
	cp -r ./node_modules/bootstrap/dist/* $(TO)/libs/bootstrap

watch: node_modules libs target
	$(NBIN)/watchify -o $(TO)/js/bundle.js -v -d js/main.js

browserify: node_modules target js/main.js
	rm -rf $(TO)/js/bundle.js
	$(NBIN)/browserify . -t [envify --NODE_ENV production] -t [babelify --stage 0] | $(NBIN)/uglifyjs -cm > $(TO)/js/bundle.js

static:
	mkdir -p $(TO)/css
	cp -r css/* $(TO)/css
	cp -r root/* $(TO)/

compile: libs browserify static

test: node_modules target
	npm test

server: node_modules target
	$(NBIN)/http-server $(TO) -p $(PORT) --utc


