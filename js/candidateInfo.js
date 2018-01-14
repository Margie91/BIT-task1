var candidateId = parseFloat(localStorage.getItem("id"));

var URLrequest = "http://localhost:3333/api/";

function getData(param, method, dataHandler) {
    var request = $.ajax({
        url: URLrequest + param,
        method: method,
        dataType: "json"
    });

    request.done(function (data) {
        dataHandler(data);
    });
}

function getCandidateInfo() {
    getData("candidates", "GET", function (data) {
        console.log(data);

        var candidate = {};

        for(var key in data) {
            if(data[key].id === candidateId) {
                candidate = data[key];
            }
        }

        console.log(candidate);
        
        printCandidateInfo(candidate);
    });
}

function printCandidateInfo(candidate) {
    var avatar = candidate.avatar ? candidate.avatar : "http://shackmanlab.org/wp-content/uploads/2013/07/person-placeholder.jpg";
    console.log(candidate);
    $("#candidatePage").append(`<div class="container">
                                    <div class="row">
                                        <div class="col-lg-4 col-md-4 col-sm-12">
                                            <img src=${avatar}>
                                        </div>
                                        <div class="col-8 info-col">
                                    <div class="row top-row">
                                        <div class="col-lg-6 col-md-12">
                                            <p>Name:</p>
                                            <h5>${candidate.name}</h5>
                                        </div>
                                        <div class="col-lg-6 col-md-12">
                                            <p>Date of birth:</p>
                                            <h5>${candidate.birthday}</h5>
                                        </div>
                                        </div>
                                    <div class="row">
                                        <div class="col-lg-6 col-md-12">
                                            <p>Email::</p>
                                            <h5>${candidate.email}</h5>
                                        </div>
                                        <div class="col-lg-6 col-md-12">
                                            <p>Education:</p>
                                            <h5>${candidate.education}</h5>
                                        </div>
                                        </div>
                                        </div>
                                    </div>
                                </div>`);
}

(function () {
    getCandidateInfo();
})();

