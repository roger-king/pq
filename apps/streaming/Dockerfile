FROM golang:1.15.6 as builder

ARG APP_PATH=/app

ADD . $APP_PATH

WORKDIR $APP_PATH

RUN go mod vendor \
    && cd cmd \
    && CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o build/app .

FROM alpine:latest

RUN apk --no-cache add ca-certificates

WORKDIR /root/

COPY --from=builder /app/cmd/build/app .

EXPOSE 9000

RUN ls

CMD ["./app"]