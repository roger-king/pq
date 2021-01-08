gen-go:
	protoc -I ./streaming -I ./user --go_out=plugins=grpc:./../apps/streaming/pkg/server Broadcast.proto
	protoc -I ./user --go_out=plugins=grpc:./../apps/streaming/pkg/server User.proto

gen-js:
	protoc -I ./streaming -I ./user --js_out=import_style=commonjs,binary:./../apps/client/src/grpc --grpc-web_out=import_style=typescript,mode=grpcwebtext:./../apps/client/src/grpc Broadcast.proto
	protoc -I ./user --js_out=import_style=commonjs,binary:./../apps/client/src/grpc --grpc-web_out=import_style=typescript,mode=grpcwebtext:./../apps/client/src/grpc User.proto
