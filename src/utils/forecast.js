const request = require('request');
const forecast = (lat,long,callback)=> {

    const url = 'http://api.worldweatheronline.com/premium/v1/weather.ashx?key=bf6dd17b2c9342fbb3363044202104&q='+long+','+lat+'&num_of_days=2&tp=3&format=JSON'

    request({url,json:true},(error,response)=> {
        if(error) {
            callback("Unable to connect to internet",undefined);
        }
        else if(response.body.error) {
            callback("Unable to extract info",undefined);
        }
        else {
            callback(undefined,"It is currently "+response.body.data.current_condition[0].temp_C +" degree Celcius There is chance of "+
                     response.body.data.current_condition[0].precipInches+"% rainy today")
                     
        }
    })
}


module.exports = forecast;