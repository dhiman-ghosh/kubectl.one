package api

import (
	"github.com/gin-gonic/gin"
)

func SetupV1Router() *gin.Engine {
	r := gin.Default()

	v1 := r.Group("/api/v1")

	v1.GET("/version", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"version": "1.0.0",
		})
	})

	v1.GET("/hello", HelloHandler)

	// Add a /healthz endpoint that returns 200
	v1.GET("/healthz", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"status": "ok",
		})
	})

	v1.GET("/users/:id", func(c *gin.Context) {
		id := c.Param("id")
		// Handle the request with the given id
		c.JSON(200, gin.H{
			"id": id,
		})
	})

	return r
}
