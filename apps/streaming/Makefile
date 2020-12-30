setup:
	# Assumes on mac
	brew install protobuf
	go get github.com/golang/protobuf/protoc-gen-go


start:
	go run cmd/main.go


protoc:
	cd protos; protoc --go_out=plugins=grpc:./../pkg/server broadcast.proto 
	cd protos; protoc --js_out=import_style=commonjs,binary:./../../client/src/grpc --grpc-web_out=import_style=typescript,mode=grpcwebtext:./../../client/src/grpc broadcast.proto

test:
	go test -v github.com/roger-king/pq/streaming/pkg/...

cov:
	go test -race -coverprofile=coverage.txt -covermode=atomic -v github.com/roger-king/pq/streaming/pkg/...

lint:
	go get -u golang.org/x/lint/golint
	test -z "$$(golint pkg/... cmd/...)"