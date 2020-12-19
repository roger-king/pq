package main

import (
	"fmt"
	"log"

	app "github.com/roger-king/pq/streaming/pkg"
)

func main() {
	a := &app.App{
		Port: "8000",
	}
	lis, server := a.Start()
	
	log.Print(fmt.Sprintf("Listening for connections on localhost:%s", a.Port))
	if err := server.Serve(lis); err != nil {
		log.Fatalf("Error serving application: %v", err)
	}
}