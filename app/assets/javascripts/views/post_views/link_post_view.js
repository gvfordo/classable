Classable.Views.LinkPostView = Backbone.View.extend({
	
	initialize: function() {
		
	},
	
	events: {
		
	},
	
	className: "row feed-row",
	
	template: JST["post_views/link"],
	
	
	render: function() {
		var renderedContent = this.template({ 
			post: this.model,
			user: Classable.user 
		});
		this.$el.html(renderedContent);
		return this;
	}
	
	
});