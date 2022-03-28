import Geocode from 'react-geocode';
//load api key from .env file
// require('dotenv').config( {path: '../../.env'} );

//load geo-api


Geocode.setApiKey(process.env.REACT_APP_GEO_API);

Geocode.setLanguage("en");

Geocode.setRegion("us");

Geocode.enableDebug();
console.log(process.env.REACT_APP_GEO_API);



//export geocode
export default Geocode;
