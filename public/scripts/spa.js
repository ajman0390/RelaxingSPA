"use strict";
$(function () {
    $("#viewCategories").on("click", function () {
        getCategories();
        $("#viewCategories").prop("disabled", true);
        $("#categoryContainer").show();
    })
});

function getCategories() {

    $.getJSON('/api/categories', function (categories) {
        const catLen = categories.length;
        for (let i = 0; i < catLen; i++) {
            $('#categoryList').append($('<a />')
                .text(categories[i].Category)
                .attr('href', '#')
                .attr('class', 'dropdown-item')
                .on('click', function (e) {
                    $("#servicesList").empty();
                    $("#serviceCard").hide();
                    e.preventDefault();
                    $('#categoryName').text(categories[i].Category);
                    getServices(categories[i].Value);
                }));
        }
        $("#viewCategories").on("click", function (e) {
            $("#categoryContainer").show();
        });
    });

}


function getServices(category) {
    $('#serviceCard').hide();
    $('#servicesList').html('');

    $.getJSON(`/api/services/bycategory/${category}`, function (services) {
        const prodLen = services.length;
        for (let i = 0; i < prodLen; i++) {
            $('#servicesList').append($('<li />')
                .text(services[i].ServiceName)
                .attr('class', 'list-group-item')
                .attr('href', '#')
                .on('click', function (e) {
                    e.preventDefault();
                    getService(services[i].ServiceID);
                }))
        }
        $('#servicesContainer').show();
    })
}


function getService(serviceId) {
    console.log(serviceId)

    $.getJSON(`/api/services/${serviceId}`, function (service) {
        $('#cardTitle').html("Service: " + service.ServiceName);
        $('#cardText1').html("Description: " + service.Description);
        $('#cardText2').html("$" + Number(service.Price).toFixed(2));
        $('#serviceCard').show();
    })
}



