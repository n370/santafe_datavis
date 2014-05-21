var info-view = Backbone.View.extend({
  
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

});