Classable.Views.DashboardView = Backbone.View.extend({
	
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
		this.showUserMenu();
		return this;
	},
	
	showPostTypes: function(formView) {
		var postTypesView = new Classable.Views.PostTypesView();
		this.$('#post-types').html(postTypesView.render().$el);
	},
	
	showUserFeed: function() {
		var userFeedView = new Classable.Views.UserFeedView({ collection: Classable.feed });
		this.$('#user-feed').html(userFeedView.render().$el);
	},
	
	newPost: function(event) {
		event.preventDefault();
		var postTemplate = $(event.currentTarget).data("type");
		var newPost = new Classable.Models.Post();
		var newPostView = new Classable.Views.NewPostView({ 
			model: newPost,
		  dashboard: this,
		  postTemplate: postTemplate });
		this.$('#post-types').html(newPostView.render().$el);
	},
	
	showUserMenu: function() {
		var auth_token = $('#csrf-token').html();
		var userMenuView = new Classable.Views.UserMenuView({ token: auth_token });
		$('#user-menu-area').html(userMenuView.render().$el);
	},
	
	removeSubView: function(view) {
		view.remove();
		this.showPostTypes();

	}
	
	
	
});