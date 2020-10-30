const axios = require('axios');

const homepage = require('./home-page')
const express = require('express');
const app = express();
function getAPI (res) {


    axios({
        "method":"GET",
        "url":"https://www.cheapshark.com/api/1.0/deals?title=" + "half-life",
      
        })
        .then((response)=>{      
        console.log("*************^^^ line 27 res user-controller")
        console.log("above res.render line 26 user-controller")
       let data = {
        "gName": response[i].title,
        "MCScore": response[i].metacriticScore,
        "gprice": response[i].normalPrice,
        "salesPrice": response[i].salesPrice,
        "steamRating": response[i].steamRatingPercent,
        "steamRatingText": response[i].steamRatingText,
         "sale?": response[i].isOnSale,
        // user : req.user
       }
     console.log(data)
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
