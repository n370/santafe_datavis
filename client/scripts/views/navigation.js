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
    var display = $('#sub-navbar-top').css('display');   
    if (display === 'none') {
      $('#sub-navbar-top').removeClass('hidden');
      $(this).addClass('column');
    } else {
      $('#sub-navbar-top').addClass('hidden');
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