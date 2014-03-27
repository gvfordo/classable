Classable.Views.ChatPostView = Backbone.View.extend({
	
	initialize: function() {
		
	},
	
	events: {
		
	},
	
	className: "row feed-row",
	
	template: JST["post_views/chat"],
	
	
	render: function() {
		var renderedContent = this.template({ post: this.model });
		this.$el.html(renderedContent);
		return this;
	}
	
	
});