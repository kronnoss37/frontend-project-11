# Target: install dependencies
install:
	npm ci

#	Target: simulation of publishing a progect to npm catalog
publish:
	npm publish --dry-run

#	Target: run eslint in all js files
lint:
	npx eslint .

# Build