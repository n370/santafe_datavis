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

$('#show-options').click(function() {
  if ( $('nav').is(':hidden') ) {
    $('nav').slideDown();
  } else {
    $('nav').slideUp();
  }
});



/* Geometria Model */

var model_geometria = Backbone.Model.extend({
  idAttribute: 'codigo',  
})

/* Geometrias Collection */

var collection_geometria = Backbone.Collection.extend({
  model: model_geometria,
  url: '/geometrias'
})

var geometrias = new collection_geometria();
//geometrias.fetch();


/* User Model */

var model_user = Backbone.Model.extend({
  
  initialize: function(){
    console.log('A new user has been created.');
    this.on('invalid', function(model, error){
      console.log(error);
    }),
    this.on('change', function() {
      console.log('Values for this model has changed.');
    }),
    this.on('change:alias', function() {
      console.log('Alias value for this model has changed.');
    })
  },
  
  defaults: {id: Math.floor(Math.random() * 10000000000)}, // Temporary!! Ideally we need a stronger UUID, GUID or something similar.
  
  validate: function(attributes) {
      if (attributes.password === undefined) {
        return 'Please type a password.';
      } else if (' '/*attributes.password !== attributes.confirm_password*/) {
        return 'Passwords don\'t match, please check it!';
      } 
  }

});

var test_instance_model_user = new model_user({
  password: 'nopassword',
    email: { primary: 'dvalenteneto@santafe.gov.ar' },
  name: {
    first: 'Dylson',
      last: 'Valente Neto',
      alias: 'n370'
    },
    state: { active: false }
});

/* Users Collection */

var collection_user = Backbone.Collection.extend({
  model: model_user,
//  url: '/usuarios'
});

var test_instance_collection_user = new collection_user([test_instance_model_user]);
/* User View */

var view_profile_card = Backbone.View.extend({
  
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

var view_profile_card_list = Backbone.View.extend({
  
  render: function(){

    var items = this.model.get('name');

    _.each(items, function(item){

      var test_instance_view_profile_card = new view_profile_card({ model: item });
      
      this.$el.append( test_instance_view_profile_card.render().el );
    }, this);
  }

});

// var test_instance_view_profile_card_list = new view_profile_card({ model: test_instance_model_user });
// $('body').append(test_instance_view_profile_card_list.render().el);

// The following code doesn't use the 'subviews' approach.
// var test_instance_view_profile_card = new view_profile_card({ model: test_instance_model_user });
// $('body').append(test_instance_view_profile_card.render().el);