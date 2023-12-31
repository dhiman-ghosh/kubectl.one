package api

import (
	"github.com/gin-gonic/gin"
)

func SetupV1Router(router *gin.Engine) *gin.Engine {
	v1 := router.Group("/api/v1")

	v1.GET("/version", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"version": "1.0.1",
		})
	})

	// health endpoint that returns 200
	v1.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"status": "ok",
		})
	})

	v1.POST("/validate", ValidateHandler)

	return router
}
