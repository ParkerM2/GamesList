const axios = require('axios');
// const userPageRoute = require("../routes/userpage-routes")


function getAPI (res) {
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
        // console.log( data )
        let user_name = localStorage.getItem('user')
        console.log(user_name)
        console.log("*************^^^ line 27 res user-controller")
        console.log("above res.render line 26 user-controller")
        res.render("user", data)
        // res.send(data)
        })
        .catch((error)=>{
          console.log(error)
        })
      }

      module.exports = {
        getAPI:getAPI
      }