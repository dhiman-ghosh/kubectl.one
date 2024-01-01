# Binary name
BINARY=kubectl1

MAIN=cmd/kubectl1/main.go

# Builds the project
build:
	CGO_ENABLED=0 go build -v -a -installsuffix cgo -o ${BINARY} ${MAIN}

# Installs dependencies
install:
	go install ${MAIN}
	pushd web && npm install && popd

# Cleans our project: deletes binaries
clean:
	if [ -f ${BINARY} ] ; then rm ${BINARY} ; fi

# Runs tests
test:
	go test ${MAIN}

# Runs the application
run:
	go run ${MAIN}

# Runs the application
run-ui:
	pushd web && npm run dev && popd

build-ui:
	pushd web && npm run build && popd

build-docker:
	docker build --no-cache -t kubectl1 -t dhimandev/kubectl1 .

build-docker-ui:
	docker build --no-cache -t kubectl1-ui -t dhimandev/kubectl1-ui -f Dockerfile.ui ./web

.PHONY: build install clean test run build-ui build-docker build-docker-ui