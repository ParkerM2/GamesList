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
          var gameName=(response[i].internalName)
          console.log(gameName)
          showResults.push(gameName)
          console.log(gameName)
  }}) }




  sCheap("half-life")

 