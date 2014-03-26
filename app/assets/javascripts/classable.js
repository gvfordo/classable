window.Classable = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
		this.feed = new Classable.Collections.Posts();
		this.feed.fetch();
		var user = JSON.parse($('#user-info').html());
		this.user = new Classable.Models.User(user, { parse: true })
		new Classable.Routers.AppRouter({
			$rootEl:  $('#dashboard')
		});
		Backbone.history.start();
  }
};

