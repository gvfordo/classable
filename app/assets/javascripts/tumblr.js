window.Tumblr = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
		this.feed = new Tumblr.Collections.Posts();
		this.feed.fetch();
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
