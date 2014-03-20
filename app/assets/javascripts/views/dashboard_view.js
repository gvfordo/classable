Tumblr.Views.DashboardView = Backbone.View.extend({
	
	initialize: function(options) {
		this.user = options.user;
	},
	
	events: {
		"click div#text-post" : "newTextPost"
	},
	
	template: JST['dashboard/index'],
	
	render: function() {
		var renderedContent = this.template({ user: this.user });
		this.$el.html(renderedContent);
		this.showPostTypes();
		return this;
	},
	
	showPostTypes: function() {
		var postTypesView = new Tumblr.Views.PostTypesView();
		this.$('#post-area').html(postTypesView.render().$el);
	},
	
	newTextPost: function() {
		var newTextPost = new Tumblr.Models.Post();
		var newTextPostView = new Tumblr.Views.TextPostView({ model: newTextPost });
		this.$('#post-area').html(newTextPostView.render().$el);
	}
	
	
	
});