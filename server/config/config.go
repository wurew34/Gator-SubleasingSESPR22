package config

//create a function that returns map[string]string
//map[string]string is the type of the return value
//map[string]string is the type of the return value


func config () map[string]string{
	key := make(map[string]string)
	key["MONGODB_URI"] = "mongodb+srv://admin:admin@gatorsublease-cluster0.jtplg.mongodb.net/gator-subleasing?retryWrites=true&w=majority"
	return key
}