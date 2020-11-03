const axios = require('axios');
require("dotenv").config()
// const userPageRoute = require("../routes/userpage-routes")


module.exports = async function (res) {
    axios({
        "method":"GET",
        "url":"https://chicken-coop.p.rapidapi.com/games/%7B"+title+"%7D",
        "headers":{
        "content-type":"application/octet-stream",
        "x-rapidapi-host":"chicken-coop.p.rapidapi.com",
        "x-rapidapi-key": process.env.APIKEY,
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
        
    
        console.log("*************^^^ line 27 res user-controller")
        console.log("above res.render line 26 user-controller")
        res.render("user", data)
        // res.send(data)
        
        })
        .catch((error)=>{
          console.log(error)
        })
      }
    
      // module.exports = {
      //   getAPI:getAPI
      // }