// Client-side use IIFE to execute application (IIFE = immediately-invoked function expression) i.e., (function() {})();
(function () {
    // Creates a new angular module
    angular
        .module("bobedge", [
            // "ngMessages"    // The ngMessages module provides a simple way to show/hide error messages within your form
            // , "ngAnimate"   // ngAnimate module supports both CSS-based and JS-based animations via callback hooks
            // , "ui.router"   // ui-router is a client-side Single Page Application routing framework for AngularJS
        ]);
})();