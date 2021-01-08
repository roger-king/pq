gen-go:
	protoc -I ./user --go_out=plugins=grpc:./../apps/streaming/pkg/server User.proto
	protoc -I ./question_bank --go_out=plugins=grpc:./../apps/streaming/pkg/server Question.proto
	protoc -I ./question_bank --go_out=plugins=grpc:./../apps/streaming/pkg/server QuestionOption.proto
	protoc -I ./question_bank -I ./streaming -I ./user --go_out=plugins=grpc:./../apps/streaming/pkg/server Broadcast.proto

gen-js:
	protoc -I ./question_bank -I ./user --js_out=import_style=commonjs,binary:./../apps/client/src/grpc --grpc-web_out=import_style=typescript,mode=grpcwebtext:./../apps/client/src/grpc Question.proto
	protoc -I ./question_bank --js_out=import_style=commonjs,binary:./../apps/client/src/grpc --grpc-web_out=import_style=typescript,mode=grpcwebtext:./../apps/client/src/grpc QuestionOption.proto
	protoc  -I ./question_bank -I ./streaming -I ./user --js_out=import_style=commonjs,binary:./../apps/client/src/grpc --grpc-web_out=import_style=typescript,mode=grpcwebtext:./../apps/client/src/grpc Broadcast.proto
	protoc -I ./user --js_out=import_style=commonjs,binary:./../apps/client/src/grpc --grpc-web_out=import_style=typescript,mode=grpcwebtext:./../apps/client/src/grpc User.proto
