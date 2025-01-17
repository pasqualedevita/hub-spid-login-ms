# Hub SPID Login MicroService
This is a Microservice that is responsible to provide a single entry point for SPID authentication.


## How to launch
In order to run SPID Login microservice in a local environment you must:
- copy `.env.example` into `.env`
- Execute `scripts/make-certs.sh`
- Fill environment variables with your own configuration
- Fill METADATA_PUBLIC_CERT with content of certs/key.pem (generated by make-certs.sh)
- Fill METADATA_PRIVATE_CERT with content of certs/cert.pem (generated by make-certs.sh)
- Take care and set the same value for SP `SERVER_PORT` and the metadata endpoint port registered in `spid-testenv2` config yaml
- add a row to hosts file `127.0.0.1  spid-testenv2`
- build the project by running `yarn build`
- Run `docker compose --env-file .env up --build` or `yarn docker:start`
- Call Endpoint to refresh IDP metadata e.g. `curl -L -X GET 'http://localhost:9090/refresh'`

## JWT Support

- Change ENABLE_JWT=true in `.env` file
- run `scripts/generate-rsa-jwt-key-pair.sh`
- copy `jwt-private-key.pem` into JWT_TOKEN_PRIVATE_KEY as single line \n

# Architecture
This microservices is intended for a usage through an API Gateway (API Management on Azure environment). It's necessary to enable:
* JWT Signature verification
* Additional header extraction throughout the backend services' authorization layer
## Routes
* `/metadata`: Expose SP metadata
* `/login`: Trigger a SPID login by creating an `authNRequest`
* `/logout`: Trigger logout from SPID (Not used)
* `/acs`: Assertion Consumer service endpoint
* `/refresh`: Trigger IDP metadata refresh
* `/invalidate`: Invalidates a previous released token
* `/introspect`: Introspect token by giving information (optional) about logged Spid User
* `/success`: Trigger Final redirect to success endpoint after a successful SPID login
* `/error`: Trigger Redirect to an error page