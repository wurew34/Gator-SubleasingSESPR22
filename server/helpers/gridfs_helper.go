package helper

// import (
// 	"fmt"
// 	"mime"
// 	"net/http"
// 	"path/filepath"
// 	"strconv"

// 	"github.com/labstack/echo"
// 	"gopkg.in/mgo.v2"
// 	"gopkg.in/mgo.v2/bson"
// )

// func streamImage(ctx echo.Context) error {
// 	var err error
// 	var gridFile *mgo.GridFile
// 	var imageRecord *MongoImage

// 	/*
// 	 * Get the record by ID
// 	 */
// 	id := bson.ObjectIdHex(ctx.Param("id"))

// 	if err = db.C("images").FindId(id).One(&imageRecord); err != nil {
// 		fmt.Printf("Error getting image by ID: %s\n", err.Error())
// 		return ctx.String(http.StatusNotFound, "Image not found")
// 	}

// 	/*
// 	 * Get the file from GridFS
// 	 */
// 	fileID := imageRecord.FileID

// 	if gridFile, err = db.GridFS("imagefiles").OpenId(fileID); err != nil {
// 		fmt.Printf("Error getting file from GridFS: %s\n", err.Error())
// 		return ctx.String(http.StatusInternalServerError, "Error getting file from database")
// 	}

// 	defer gridFile.Close()

// 	/*
// 	 * Set headers to tell the caller how big the file is and stream it back
// 	 */
// 	ctx.Response().Header().Set("Content-Length", strconv.Itoa(int(gridFile.Size())))
// 	ctx.Response().Header().Set("Content-Disposition", "inline; filename=\""+gridFile.Name()+"\"")

// 	return ctx.Stream(http.StatusOK, mime.TypeByExtension(filepath.Ext(gridFile.Name())), gridFile)
// }
