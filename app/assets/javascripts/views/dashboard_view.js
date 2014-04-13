Classable.Views.DashboardView = Backbone.View.extend({
	
	initialize: function(options) {
		this.user = options.user;
		this.subViews = [];
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
		this.showUserMenu();
		return this;
	},
	
	showPostTypes: function(formView) {
		var postTypesView = new Classable.Views.PostTypesView();
		this.$('#post-types').html(postTypesView.render().$el);
	},
	
	showUserFeed: function() {
		var userFeedView = new Classable.Views.UserFeedView({ collection: Classable.feed });
		this.subViews.push(userFeedView);
		this.$('#user-feed').html(userFeedView.render().$el);
	},
	
	newPost: function(event) {
		event.preventDefault();
		var template = $(event.currentTarget).data("type");
		var newPost = new Classable.Models.Post();
		var newPostView = new Classable.Views.NewPostView({ 
			model: newPost,
		  parent: this,
		  postTemplate: template });
		this.$('#post-types').html(newPostView.render().$el);
	},
	
	showUserMenu: function() {
		var userMenuView = new Classable.Views.UserMenuView();
		this.subViews.push(userMenuView);
		$('#user-menu-area').html(userMenuView.render().$el);
	},
	
	removeSubView: function(view) {
		view.remove();
		this.showPostTypes();

	},

	removeChildren: function() {
		this.subViews.forEach(function(view) {
			view.removeChildren();
			view.remove();
		});
	}
	
	
	
});