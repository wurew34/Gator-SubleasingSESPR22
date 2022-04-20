package helper

import (
	"log"
	"os"
	"github.com/codingsince1985/geo-golang"
	"github.com/codingsince1985/geo-golang/google"
)

func SetUpGeocode() geo.Geocoder {
	geo := google.Geocoder(os.Getenv("GEO_API"))
	return geo
}

var Geo = SetUpGeocode()

func GetLocation(address string) (float64, float64, error) {
	location, err := Geo.Geocode(address)
	if err != nil {
		log.Println(err)
		return 0, 0, err
	}
	lat, lng := location.Lat, location.Lng
	return lat, lng, nil
}

func GetAddress(lat float64, lng float64) (string, error) {
	location, err := Geo.ReverseGeocode(lat, lng)
	if err != nil {
		log.Println(err)
		return "", err
	}
	address := location.FormattedAddress
	return address, nil
}

