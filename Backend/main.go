package main

import (
	//"fmt"

	"log"

	"github.com/gin-gonic/gin"
)
type Login struct{
	Username string `json:"username"`
	Password string `json:"password"`
}
func main(){
	r:=gin.Default()
	
	
	r.Use(func(c *gin.Context){
		c.Header("Access-Control-Allow-Origin","http://localhost:5173")
		c.Header("Access-Control-Allow-Methods","POST,OPTIONS")
		c.Header("Access-Control-Allow-Headers","Content-Type")
		if c.Request.Method == "OPTIONS" {
            c.AbortWithStatus(204)
            return
        }
		c.Next()
	})
	r.POST("/login",PostLogin)
	r.GET("/totp",TOTP)
	r.GET("",Otp)
	r.Run(":8080")
	//fmt.Println("Running")
}
func PostLogin(c *gin.Context){
	var req Login
	c.ShouldBindJSON(&req)
	if req.Username	== "admin" && req.Password == "admin" {
		c.JSON(200,gin.H{"message":"Login Success"})
	}else{
		log.Println(req.Username,"  ",req.Password)
		c.JSON(401,gin.H{"error":"Invalid Request"})
	}
}
func TOTP(c *gin.Context){

}
func Otp(c *gin.Context){

}