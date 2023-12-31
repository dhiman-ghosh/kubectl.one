package api

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/yannh/kubeconform/pkg/validator"
)

type ValidateResponse struct {
	LogLevel string `json:"level"`
	Msg      string `json:"msg,omitempty"`
}

func ValidateHandler(c *gin.Context) {
	v, err := validator.New(nil, validator.Opts{Strict: true})

	if err != nil {
		c.String(http.StatusInternalServerError, fmt.Sprintf("failed initializing validator: %s", err))
		return
	}

	var responses []ValidateResponse

	for i, res := range v.Validate("manifest.yaml", c.Request.Body) { // A file might contain multiple resources
		// File starts with ---, the parser assumes a first empty resource
		if res.Status != validator.Empty {
			responses = append(responses, ValidateResponse{
				LogLevel: "INFO",
				Msg:      fmt.Sprintf("Validating Resource Number %d ...", i+1),
			})
		}
		if res.Status == validator.Invalid {
			for _, validationErr := range res.ValidationErrors {
				responses = append(responses, ValidateResponse{
					LogLevel: "ERROR",
					Msg:      fmt.Sprintf("%s in %s", validationErr.Msg, validationErr.Path),
				})
			}
			responses = append(responses, ValidateResponse{
				LogLevel: "FAILED",
				Msg:      "Resource is INVALID",
			})
		} else if res.Status == validator.Error {
			responses = append(responses, ValidateResponse{
				LogLevel: "ERROR",
				Msg:      res.Err.Error(),
			})
			responses = append(responses, ValidateResponse{
				LogLevel: "FAILED",
				Msg:      "Resource is INVALID",
			})
		} else if res.Status == validator.Valid {
			responses = append(responses, ValidateResponse{
				LogLevel: "SUCCESS",
				Msg:      "Resource is VALID",
			})
		}
	}

	c.JSON(http.StatusOK, responses)
}
