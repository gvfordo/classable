window.Tumblr = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
		
		new Tumblr.Routers.AppRouter({
			$rootEl:  $('#dashboard')
		});
		Backbone.history.start();
  }
};

$(document).ready(function(){
	if($('#dashboard').is('div')){
	  Tumblr.initialize();		
	}
});
