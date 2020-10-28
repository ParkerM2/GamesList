function sCheap(findCheap){
//replace title with searchCheap


$.ajax({
    url:"https://www.cheapshark.com/api/1.0/deals?title="+findCheap,
    method:"GET",
  }).then(function(response){
        console.log(response)

  }) }

  sCheap("half-life")
  