const request = require('request');

const geocode = (address,callback)=> {
    const url = 'http://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoic3VtYW50aGt2IiwiYSI6ImNrOTl0Nm51czAyaTIzbXM3N2RseGsyZjEifQ.6Lnxfi9YnybcaAA09kFZdg&limit=1'
    request({url:url,json:true},(error,response)=> {
        if(error) {
            callback('Unable to connect to location',undefined);
        }
        else if(response.body.features.length==0) {
                     callback("Unable to extract info",undefined);
        }
        else {
            callback(undefined,{
                latitude:response.body.features[0].center[0],
                longitude:response.body.features[0].center[1],
                location:response.body.features[0].place_name 
            });
        }

    })
}

module.exports = geocode;