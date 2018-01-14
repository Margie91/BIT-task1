"use strict";

var URLrequest = "http://localhost:3333/api/";



/*(function () {

     fetch(URLrequest + "candidates")
        .then(function(response) {
                return response.json() })
        .then(function(data) {
             return candidates = data;
            })
        .catch(function(error) {
            return new Error(error) });

})(); */


function getData(param, dataHandler) {
    fetch(URLrequest + param)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            dataHandler(data);
        })
        .catch(function (error) {
            console.log(error);
        });
}

function printCandidates(data) {
    var row = document.createElement("div");
    row.classList.add("row");
    data.forEach(function (candidate) {

        if(!candidate.avatar) {
            candidate.avatar = "http://shackmanlab.org/wp-content/uploads/2013/07/person-placeholder.jpg";
        }

        var element = document.createElement("div");
        element.classList.add("col-lg-4", "col-md-6", "col-sm-12");
        element.innerHTML =
            `<div class="card">
                <img class="card-img-top" src=${candidate.avatar}>
                <div class="card-body">
                <h4 class="card-text">${candidate.name}</h4>
                <p class="card-text">${candidate.email}</p>
                </div>
             </div>`
        row.appendChild(element);
        document.querySelector(".container").appendChild(row);
    });
}

function getCandidates() {
    getData("candidates", function(data) {
        printCandidates(data);
    });
}

(function () {
    getCandidates();
})();