# Binary name
BINARY=kubectl1

MAIN=cmd/kubectl1/main.go

# Builds the project
build:
	go build -o ${BINARY} ${MAIN}

# Installs our project: copies binaries
install:
	go install ${MAIN}

# Cleans our project: deletes binaries
clean:
	if [ -f ${BINARY} ] ; then rm ${BINARY} ; fi

# Runs tests
test:
	go test ${MAIN}

# Runs the application
run:
	go run ${MAIN}

build-ui:
	pushd web && npm run build && popd

build-docker:
	docker build -t kubectl1 .

build-docker-ui:
	docker build -t kubectl1-ui -f Dockerfile.ui ./web

.PHONY: build install clean test run build-ui build-docker build-docker-ui