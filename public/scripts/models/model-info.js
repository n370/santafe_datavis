

/* Geometria Model */

var model_geometria = Backbone.Model.extend({
  idAttribute: 'codigo',  
})

var geometrias = new collection_geometria();
//geometrias.fetch();

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