"use strict";

//var URLrequest = "http://localhost:3333/api/";

var URLrequest = "js/db.json";

var appState = [];

function getData(param, dataHandler) {
    fetch(URLrequest)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            dataHandler(data[param]);
            appState = data[param];
        })
        .catch(function (error) {
            console.log(error);
        });
}

//display candidates
function printCandidates(data) {
    document.querySelector("#mainContent").innerHTML = "";

    if (data.length <= 0) {
        var p = document.createElement("p");
        p.classList.add("noMatch");
        p.innerHTML = "Sorry, no matches!"
        document.querySelector("#mainContent").appendChild(p);
    }

    var container = document.createElement("div");
    container.classList.add("container");
    var row = document.createElement("div");
    row.classList.add("row");
    data.forEach(function (candidate) {

        if (!candidate.avatar) {
            candidate.avatar = "assets/person-placeholder.jpg";
        }

        var element = document.createElement("div");
        element.classList.add("col-lg-4", "col-md-6", "col-sm-12");
        element.innerHTML =
            `<div class="card" data-candidateId=${candidate.id}>
                <img class="card-img-top" src=${candidate.avatar}>
                <div class="card-body">
                <h4 class="card-text">${candidate.name}</h4>
                <p class="card-text">${candidate.email}</p>
                </div>
             </div>`
        row.appendChild(element);
        container.appendChild(row);
        document.querySelector("#mainContent").appendChild(container);
    });
    addEventListeners();
}


//get candidates from server
function getCandidates() {
    getData("candidates", function (data) {
        printCandidates(data);

    });
}

//click on candidate card takes us to candidate info page
function addEventListeners() {
    var cards = document.querySelectorAll(".card");
    cards.forEach(function (card) {
        card.addEventListener("click", function () {
            var candidateId = this.getAttribute("data-candidateId");
            localStorage.setItem("id", candidateId);
            window.location.href = "candidateInfo.html";

        })
    })
}


function addSearchEventListener() {
    var search = document.querySelector("#search");
    search.addEventListener("keyup", filterCandidates);
}

//search candidates
function filterCandidates(event) {
    var searchString = event.target.value;
    var filteredData = appState.filter(function (item) {
        return item.name.toLowerCase().includes(searchString.toLowerCase());
    });
    printCandidates(filteredData);
}

(function () {
    getCandidates();
    addSearchEventListener();
})();

