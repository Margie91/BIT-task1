"use strict";

var candidateId = parseFloat(localStorage.getItem("id"));


var URLrequest = "https://reports-json-server.herokuapp.com/api/";

//ajax request
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

// helper function
function formatDate(d) {
    var date = new Date(d);
    var dd = date.getDate();
    var mm = date.getMonth() + 1; //January is 0!
    var yyyy = date.getFullYear();

    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    var formatedDate = dd + '.' + mm + '.' + yyyy + '.';
    return formatedDate;
}

// helper function
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


//get specific candidate
function getCandidateInfo() {

    if (!candidateId) {
        window.location.href = "index.html";
    }

    getData("candidates", "GET", function (data) {

        var candidate = {};

        for (var key in data) {
            if (data[key].id === candidateId) {
                candidate = data[key];
            }
        }

        printCandidateInfo(candidate);
    });
}

//get reports from server
function getReports() {
    getData("reports", "GET", function (data) {

        var reports = data.filter(function (item) {
            return item.candidateId === candidateId;
        });

        printCandidateReports(reports);

    });
}

//display candidate info
function printCandidateInfo(candidate) {
    var avatar = candidate.avatar ? candidate.avatar : "assets/person-placeholder.jpg";

    $(".candidatePage").append(`<div class="container">
                                    <div class="row">
                                        <div class="col-lg-4 col-md-4 col-sm-12">
                                            <img class="avatar" src=${avatar}>
                                        </div>
                                        <div class="col-8 info-col">
                                    <div class="row top-row">
                                        <div class="col-lg-6 col-md-12">
                                            <p>Name:</p>
                                            <h5>${candidate.name}</h5>
                                        </div>
                                        <div class="col-lg-6 col-md-12">
                                            <p>Date of birth:</p>
                                            <h5>${formatDate(candidate.birthday)}</h5>
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


//display candidate reports
function printCandidateReports(reports) {

    var container = $("<div>");
    container.attr("class", "container");
    var row = $("<div>");
    row.attr("class", "row");
    var col = $("<div>");
    col.attr("class", "col-12");
    row.append(col);
    container.append(row);
    $(".candidatePage").append(container);
    $("<h3>Reports</h3>").insertBefore(row);

    if (reports.length <= 0) {
        col.append("<p class='noReport'>There are no reports for this candidate.</p>");
        return;
    }

    var table = $("<table>");
    table.attr("class", "table table-striped");
    table.append(`<thead>
                    <tr>
                        <th>Company</th>
                        <th>Interview Date</th>
                        <th colspan="2">Status</th>
                    </tr>
                </thead>
                <tbody>
                ${generateRows(reports)}
                </tbody>`);
    col.append(table);
    $(".candidatePage").append(container);

    addEventListeners(reports);

}

//dynamically insert information into table
function generateRows(reports) {
    var output = "";

    reports.forEach(function (report) {
        output += `<tr>
                    <td>${report.companyName}</td>
                    <td>${formatDate(report.interviewDate)}</td>
                    <td>${capitalizeFirstLetter(report.status)}</td>
                    <td data-reportId=${report.id} class="modalButton">
                    <img src=assets/eye_icon.png data-toggle="modal"
                    data-target="#reportModal"</td>
                    </tr>`;

    });

    return output;
}

//on click opens up modal
function addEventListeners(reports) {
    var seeMore = $("td[data-reportId]");
    seeMore.each(function (index) {
        var id = $(this).attr("data-reportId");
        $(this).on("click", function () {
            reports.forEach(function (report) {
                if (report.id == id) {
                    printModalReport(report);
                }
            });
        })
    });
}

//display specific report in modal
function printModalReport(report) {
    $(".modal-title").text("");
    $(".modal-body .row").text("");
    $(".modal-title").text(report.candidateName);
    $(".modal-body .row").append(`<div class="col-md-4 col-lg-4 col-sm-12">
                                    <div class="row">
                                        <div class="col-12">
                                            <p>Company:</p>
                                            <h5>${report.companyName}</h5>
                                        </div>
                                    </div>   
                                    <div class="row">
                                        <div class="col-12">
                                            <p>Interview date:</p>
                                            <h5>${formatDate(report.interviewDate)}</h5>
                                        </div>
                                    </div>   
                                    <div class="row">
                                        <div class="col-12">
                                            <p>Phase:</p>
                                            <h5>${capitalizeFirstLetter(report.phase)}</h5>
                                        </div>
                                    </div>   
                                    <div class="row">
                                        <div class="col-12">
                                            <p>Status:</p>
                                            <h5>${capitalizeFirstLetter(report.status)}</h5>
                                        </div>
                                    </div>   
                                </div>   
                                <div class="col-md-8 col-lg-8 col-sm-12 notes">
                                    <p>Notes</p>
                                    <p>${report.note}</p>
                                </div>`);
}

(function () {
    getCandidateInfo();
    getReports();
})();

