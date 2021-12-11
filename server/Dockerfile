FROM golang:1.16

ENV GO111MODULE=on

WORKDIR /go/src/kaiwa/server
COPY . .
RUN go get github.com/pilu/fresh
CMD ["fresh"]
EXPOSE 9090