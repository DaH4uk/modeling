/**
 * Created by turov on 06.12.2016.
 */
'use strict';

var myapp = angular
    .module('myApp', ['ngRoute','ngResource']);

myapp.config(function ($routeProvider, $locationProvider) {
    $routeProvider.when("/", {
        templateUrl: 'partials/home.html',
        controller: 'HomeController'

    }).when('/lab1/:number', {
        templateUrl: 'partials/lab1.html',
        controller: 'Lab1Ctrl'
    }).when('/lab2/:number/:lambda', {
        templateUrl: 'partials/lab2.html',
        controller: 'Lab2Ctrl'
    }).when('/lab3/:z/:lambda/:count', {
        templateUrl: 'partials/lab3.html',
        controller: 'Lab3Ctrl'
    }).when('/lab4/:z/:m/:count/:sigma', {
        templateUrl: 'partials/lab4.html',
        controller: 'Lab4Ctrl'
    });
});

