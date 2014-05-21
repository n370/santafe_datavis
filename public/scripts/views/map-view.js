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

require(["..scripts/models/collection-map"], function(collection-map) { 
  define({
    map-view: Backbone.View.extend({
      colletion: collection-map.map,
  
      tagName: 'div',
    
      className: 'profile_card',

      template: _.template($('#profile_card').html()),

      events: {
        click: 'change_color'
      },

      render: function() {
        this.$el.html(this.template(this.model.attributes)); // Pass an object to the template attribute.
        return this;
      },

      change_color: function() {
        this.$('h1').css('color', 'red');
      }
    })
  })
});