(function() {
  'use strict';

  angular.module('MenuApp')
    .config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

  function RoutesConfig($stateProvider, $urlRouterProvider) {

    // Redirect to home page if no other URL matches
    $urlRouterProvider.otherwise('/');

    // *** Set up UI states ***
    $stateProvider

    // Home page
      .state('homePage', {
      url: '/',
      templateUrl: 'src/templates/homePage.template.html'
    })

    // Categories list page
    .state('categoriesPage', {
      url: '/categories',
      templateUrl: 'src/templates/categoriesPage.template.html',
      controller: 'CategoriesListController as list',
      resolve: {
        items: ['MenuDataService', function(MenuDataService) {
          return MenuDataService.getAllCategories();
        }]
      }
    })

    .state('categoriesPage.menuItems', {
      url: '/menu-items/{categoryId}',
      templateUrl: 'src/templates/items.template.html',
      controller: 'MenuItemsController as categoryDetail',
      resolve: {
        items: ['$stateParams', 'MenuDataService',
          function($stateParams, MenuDataService) {
            return MenuDataService.getItemsForCategory($stateParams.categoryId);
          }
        ]
      }
    });
  };
})();
