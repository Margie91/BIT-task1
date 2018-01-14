var id = localStorage.getItem("id");

var URLrequest = "http://localhost:3333/api/";

function getData(param, method, dataHandler) {
   var request = $.ajax({
       url: URLrequest + param,
       method: method,
       dataType: "json"
   });

   request.done(function(data) {
       dataHandler(data);
   });
}

(function() {
    getData("companies", "GET", function(data) {
        console.log(data);
    })
})();

