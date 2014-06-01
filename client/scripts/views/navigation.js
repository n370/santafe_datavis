/*
{
  "authors": [
    {
      "name": {
        "first": "Dylson",
        "last": "Valente Neto",
        "alias": ["n370", "n370n370"]
      },  
      "email": ["dvalenteneto@santafe.gov.ar"]
    } 
  ],
  "contributors": [    
    {
      "name": {
        "first": "Dylson",
        "last": "Valente Neto",
        "alias": ["n370", "n370n370"]
      },  
      "email": ["dvalenteneto@santafe.gov.ar"]
    } 
  ] 
}
*/

var dependencies = [];

function Module() {

  function initialize() {

  }

  function render() {
    this.$el.prepend(this.template());
    return this;
  }

  // Oculta y muestra la sub barra de navegación.
  function toggleSubMenu() {
    var state = $('#sub-navbar-top').is(':hidden');   
    if (state) {
      $('#sub-navbar-top').slideDown();
      $(this).addClass('button-selected');
    } else {
      $('#sub-navbar-top').slideUp();
      $(this).removeClass('button-selected');
    }
  }

  return { 
    Navigation: function() {
      var Navigation = Backbone.View.extend({
        el: '#navbar-top',
        template: _.template($('#app-navigation').html()),
        events: {
          'click #button-bars': toggleSubMenu
        },
        initialize: initialize,
        render: render,
      });

      var navigation = new Navigation();
      navigation.render(); 
    }
  }
}

define(dependencies, Module);