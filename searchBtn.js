
// $( document ).ready(function() {
// $("#saveBtn").on("click", function (e) {

//     e.preventDefault();
//     let btnText = $("#saveBtn").val()
//     console.log("in the btn on click function")
//     console.log(btnText, " btn Text");
// }
// )});
let btn = document.getElementById("saveBtn");
btn.addEventListener("click", function () {
    var gameTitle = btn.innerText
    var gameTit = btn.innerHTML;
    console.log(gameTitle, "gameTitle");
    console.log(gameTit);
})

$(function() {
    console.log("inside function js")
    $("#saveBtn").click(function(event) {
    event.preventDefault();
      var id = $(this).data("id");
      var gameTitle = $("#saveBtn").val();
    

      app.get("/user", async function (req, res) {
        console.log(" before res=>","user page line 7");
        let user = JSON.parse(JSON.stringify(req.user));
        
      

      console.log(user)
     //create a new account
     DBConnection.query(
        ' INSERT INTO games set ? ', gameTitle, 
        function(err, rows) {
            if (err) {
                reject(false)
            }
            console.log("searchBtn.js succes")
            resolve("Create a new user successful");
      
    });
});
    })
});

//     $(".create-form").on("submit", function(event) {
//       // Make sure to preventDefault on a submit event.
//       event.preventDefault();
  
//       var newCat = {
//         name: $("#ca").val().trim(),
//         sleepy: $("[name=sleepy]:checked").val().trim()
//       };
  
//       // Send the POST request.
//       $.ajax("/api/cats", {
//         type: "POST",
//         data: newCat
//       }).then(
//         function() {
//           console.log("created new cat");
//           // Reload the page to get the updated list
//           location.reload();
//         }
//       );
//     });
  
//     $(".delete-cat").on("click", function(event) {
//       var id = $(this).data("id");
  
//       // Send the DELETE request.
//       $.ajax("/api/cats/" + id, {
//         type: "DELETE"
//       }).then(
//         function() {
//           console.log("deleted cat", id);
//           // Reload the page to get the updated list
//           location.reload();
//         }
//       );
//     });
//   });
