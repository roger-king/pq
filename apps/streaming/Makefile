setup:
	# Assumes on mac
	brew install protobuf
	go get github.com/golang/protobuf/protoc-gen-go


start:
	go run cmd/main.go


protoc:
	protoc --go_out=plugins=grpc:./../pkg/server timer.proto 
	protoc --js_out=import_style=commonjs,binary:./../../client/src/grpc --grpc-web_out=import_style=typescript,mode=grpcwebtext:./../../client/src/grpc timer.proto