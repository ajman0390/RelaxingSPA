'use strict';

/*
* This is the onload function, which onclick of .viewCat elements to display 
* Categories Dropdown Btn, and calls getCategories() to populate it
*/
$(function () {
    $('.viewCat').on('click', function () {
        $('#topSection').slideUp();
        getCategories();
        $('#viewCategories').prop('disabled', true);
        $('#categoryContainer').fadeIn();
        $('#servicesContainer').fadeOut();
    })
});

/*
* This function populates the Categories Dropdown
*/
function getCategories() {
    $.getJSON('/api/categories', function (categories) {
        $('#servicesList').hide();
        $('#categoryList').empty();
        const catLen = categories.length;
        for (let i = 0; i < catLen; i++) {
            $('#categoryList').append($('<a />')
                .text(categories[i].Category)
                .attr('href', '#')
                .attr('class', 'dropdown-item')
                .on('click', function (e) {
                    $('#servicesList').empty();
                    $('#serviceCard').hide();
                    e.preventDefault();
                    $('#categoryName').text(categories[i].Category);
                    getServices(categories[i].Value);
                }));
        }
        $('#servicesList').fadeIn();
    });
}

/*
* This function creates the li elements for the 
*
* @input category (categories obj value) - The selceted categories obj value
*/
function getServices(category) {
    $('#serviceCard').fadeOut();
    $('#servicesList').html('');

    $.getJSON(`/api/services/bycategory/${category}`, function (services) {
        const servicesLen = services.length;
        for (let i = 0; i < servicesLen; i++) {
            $('#servicesList').append($('<li />')
                .text(services[i].ServiceName)
                .attr('class', 'list-group-item')
                .on('click', function (e) {
                    e.preventDefault();
                    getService(services[i].ServiceID);
                }))
        }
        $('#servicesContainer').fadeIn();
    })
}

/*
* This funciton populates the card content of the selected service 
*
* @input serviceId (services obj ServiceID value) - The selceted services obj ServiceID value to
* access obj data into service variable
*/
function getService(serviceId) {
    $.getJSON(`/api/services/${serviceId}`, function (service) {
        $('#cardImg').attr('src', 'img/' + service.Image );
        $('#cardImg').attr('alt', service.ServiceName + 'Image' );
        $('#cardFront').html(service.ServiceName);
        $('#cardTitle').html(service.ServiceName); 
        $('#cardTime').html('(' + service.Minutes + ' Minutes)'); 
        $('#cardText1').html(service.Description);
        $('#cardText2').html('$' + Number(service.Price).toFixed(2));
        $('#serviceCard').delay('10').fadeIn();
    })
}

/*
* This funciton hides the contianers on the Home navbar click event
*/
$('#homeNav').on('click', function () {
    $('#categoryContainer').fadeOut();
    $('#servicesContainer').fadeOut();
    $('#topSection').slideDown();
});
