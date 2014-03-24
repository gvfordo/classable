window.Classable = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
		this.feed = new Classable.Collections.Posts();
		this.feed.fetch();
		new Classable.Routers.AppRouter({
			$rootEl:  $('#dashboard')
		});
		Backbone.history.start();
  }
};

$(document).ready(function(){
	if($('#dashboard').is('div')){
	  Classable.initialize();		
	}
});
