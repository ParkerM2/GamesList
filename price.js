const { title } = require("process");

$(document).ready(function () {
      $("#searchApiBtn").on("click", function (e) {
            e.preventDefault();
            //replace title with searchCheap
            $.ajax({
                  url: "https://www.cheapshark.com/api/1.0/deals?title=" + "half-life",
                  method: "GET",
            }).then(function (response) {
                  console.log(response)
                  showResults = []
                  //come back to this
                  //this will grab the streaming links maybe I need another loop to grab URL arry for now grab one 
                  // for (var i = 0; i < response.length; i++) {
                  //       //console.log(response.included[i].attributes.url)
                  //       gameInfo = {
                  //             "gName": response[i].title,
                  //             "MCScore": response[i].metacriticScore,
                  //             "gprice": response[i].normalPrice,
                  //             "steamRating": response[i].steamRatingPercent,
                  //             "sale?": response[i].isOnSale,
                  //       }
                  
                  let gameTitle = response[0].title;
                  let gameMCScore = response[0].metacriticScore;
                  
                  let listItem = $("<p id='listItem'></p>");
                  $(".navbar-brand").html(gameTitle);
                       
                 

            }
       
           
       ) })})



// function sCheap(findCheap){
//       //replace title with searchCheap
      
      
//       $.ajax({
//           url:"https://www.cheapshark.com/api/1.0/deals?title="+findCheap,
//           method:"GET",
//         }).then(function(response){
//               console.log(response)
//               showResults=[]
//               //come back to this
//                //this will grab the streaming links maybe I need another loop to grab URL arry for now grab one 
//                 for(var i=0;i<response.length;i++) {
//                 //console.log(response.included[i].attributes.url)
//                 gameInfo={
//                       "gName":response[i].title,
//                       "MCScore":response[i].metacriticScore,
//                       "gprice":response[i].normalPrice,
//                       "steamRating":response[i].steamRatingPercent,
//                       "sale?":response[i].isOnSale,
      
      
//                 }
      
//                 console.log(gameInfo)
//                 showResults.push(gameInfo)
//                 let gameTitle = response[0].title;
//                   // let gameMCScore = response[0].metacriticScore;

//                   let listItem = $("<p id='listItem'></p>");
//                                     $(".navbar-brand").html(gameTitle);
      
//       }
    
//       }
      
//       ) }
      
    // $(document).ready(function () {
//       $("#searchApiBtn").on("click", function (e) {
//             e.preventDefault();
//button click event
// $("#searchApiBtn").on('click',function(event){
//   event.preventDefault();
//   var anime=$('#anime-input').val().trim();
//   displayAnimeInfo(anime)})
// //run the function
// displayAnimeInfo()
      
      //   sCheap("half-life")

 