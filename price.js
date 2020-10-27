function sCheap(findCheap){
//replace title with searchCheap


$.ajax({
    url:"https://www.cheapshark.com/api/1.0/deals?title="+findCheap,
    method:"GET",
  }).then(function(response){
        console.log(response)
        showResults=[]
        //come back to this
         //this will grab the streaming links maybe I need another loop to grab URL arry for now grab one 
          for(var i=0;i<response.length;i++) {
          //console.log(response.included[i].attributes.url)
          gameInfo={
                "gName":response[i].title,
                "MCScore":response[i].metacriticScore,
                "gprice":response[i].normalPrice,
                "steamRating":response[i].steamRatingPercent,
                "sale?":response[i].isOnSale,

         
          }

          console.log(gameInfo)
          showResults.push(gameInfo)

}
// store info into a string 
localStorage.setItem('gameKey',JSON.stringify(showResults))
}

) }

// summon and parse out the data 
function displayCheapShark(findCheap){
      results=JSON.parse(localStorage.get('gameKey'))
      // console.log(results)
      $("#resultsList").empty()
      for (var i=0;i<results.length; i++){
            gameInfoBtn=$("<p>").addClass.text(results)
            listItem.append(gameInfo)
            console.log(gameInfo)

            ("#resultsList").append(listItem)
      }

}














  sCheap("half-life")

 