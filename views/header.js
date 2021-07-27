function session() {
    $.ajax({
        method: "GET",
        url: "/content"
        })
        .done(function( msg ) {  
           if (msg=="no session"){
             window.location.href = "/index.html";
           }
         
    });
}

function closeModal(){
  alert("close modal");
  $('#btnCloseModal').click();
}

$("#btnLogout").click(function(){
    $.ajax({
        method: "GET",
        url: "/logout"
        })
        .done(function( msg ) {
          window.location.href = "/index.html";
          
    });
   })