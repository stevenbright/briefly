#

TO			=	target/demo-app
NBIN		= ./node_modules/.bin
PORT		= 8000

.PHONY: clean browserify test watch compile server


# Targets

all: compile

node_modules:
	npm install --save-dev

target:
	mkdir -p $(TO)
	mkdir -p $(TO)/js

clean:
	rm -rf target

watch: node_modules target
	$(NBIN)/watchify -o $(TO)/js/bundle.js -v -d js/app.js
	
browserify: node_modules target
	rm -rf $(TO)/js/bundle.js
	$(NBIN)/browserify . -t [envify --NODE_ENV production] -t [babelify --stage 0] | $(NBIN)/uglifyjs -cm > $(TO)/js/bundle.js

compile: browserify
	mkdir -p $(TO)/css
	cp -r css/* $(TO)/css
	cp -r root/* $(TO)/

test: node_modules target
	npm test

# TODO: use proxy if you have REST API - -P or --proxy Proxies all requests which can't be resolved locally to the given url. e.g.: -P http://someurl.com
# See also https://github.com/indexzero/http-server
server: node_modules target
	$(NBIN)/http-server $(TO) -p $(PORT) --utc


