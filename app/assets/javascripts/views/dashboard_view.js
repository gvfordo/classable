Tumblr.Views.DashboardView = Backbone.View.extend({
	
	initialize: function(options) {
		this.user = options.user;
	},
	
	events: {
		"click div.post-type" : "newPost"
	},
	
	template: JST['dashboard/index'],
	
	render: function() {
		var renderedContent = this.template({ user: this.user });
		this.$el.html(renderedContent);
		this.showPostTypes();
		this.showUserFeed();
		return this;
	},
	
	showPostTypes: function(formView) {
		var postTypesView = new Tumblr.Views.PostTypesView();
		this.$('#post-types').html(postTypesView.render().$el);
	},
	
	showUserFeed: function() {
		var userFeedView = new Tumblr.Views.UserFeedView({ collection: Tumblr.feed });
		this.$('#user-feed').html(userFeedView.render().$el);
	},
	
	newPost: function(event) {
		event.preventDefault();
		var postTemplate = $(event.currentTarget).data("type");
		debugger
		var newPost = new Tumblr.Models.Post();
		var newPostView = new Tumblr.Views.NewPostView({ 
			model: newPost,
		  dashboard: this,
		  postTemplate: postTemplate });
		this.$('#post-types').html(newPostView.render().$el);
	},
	
	removeSubView: function(view) {
		view.remove();
		this.showPostTypes();

	}
	
	
	
});