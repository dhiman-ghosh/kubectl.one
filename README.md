# kubectl1
The latest tool is deployed online at [kubectl.one](https://kubectl.one)

## Description

kubectl1 (kubectl.one) is a free online Kubernetes development toolkit. It provides a set of AI powered tools to help you develop, validate, and manage your Kubernetes applications.


## Tools/Features

- Kubernetes Manifest YAML Validator
- AI powered K8s Manifest / Resource Generator (Coming Soon)

## Installation

To install the necessary dependencies in development environment, run the following command:

```bash
make install
```
## Build

To build the application backend and frontend:

```bash
make build
make build-ui
```

## Docker Images

To build the application backend and frontend docker images in development environment:

```bash
make build-docker
make build-docker-ui
```

Pre-built docker images are available at [Docker Hub](https://hub.docker.com/u/dhimandev)

## Run

To run the application backend and frontend in development mode:

```bash
make run
make run-ui
```
A sample `docker-compose.yaml` is available at [/assets](/assets/docker-compose.yaml) to run the project in production mode using pre-built docker images.

## Demo

A live production version of the latest kubectl1 is available at [kubectl.one](https://kubectl.one)

## Contributing

If you would like to contribute, please fork the repository and use a feature branch. Pull requests are warmly welcome. You can also [Buy me a Coffee](https://ko-fi.com/dhiman) to support this project.

## License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details.
