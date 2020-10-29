const axios = require('axios');
const userPageRoute = require("../routes/userpage-routes")


module.exports = function (data) {
    axios({
        "method":"GET",
        "url":"https://chicken-coop.p.rapidapi.com/games/%7BHalf-Life%7D",
        "headers":{
        "content-type":"application/octet-stream",
        "x-rapidapi-host":"chicken-coop.p.rapidapi.com",
        "x-rapidapi-key":"c23b869635mshbd93a4ffe3425ecp12d50bjsnae0f66b387be",
        "useQueryString":true
        },"params":{
        "platform":"pc"
        }
        })
        .then((response)=>{
        let data = {
          img : response.data.result.image,
          score : response.data.result.score,
          title : response.data.result.title,
          description : response.data.result.description,
        }
        console.log( data )
        // res.send(data)
        })
        .catch((error)=>{
          console.log(error)
        })
        return data;

      }

     // module.exports = {getAPI:getAPI};
      // module.exports = {
      //   getAPI : getAPI,
      //   data : this.data,
      // }