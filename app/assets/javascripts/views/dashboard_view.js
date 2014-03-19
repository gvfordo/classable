Tumblr.Views.DashboardView = Backbone.View.extend({
	
	initialize: function(options) {
		this.user = options.user;
	},
	
	events: {
		
	},
	
	template: JST['users/dashboard'],
	
	render: function() {
		var renderedContent = this.template({ user: this.user });
		this.$el.html(renderedContent);
		return this;
	}
	
	
	
});