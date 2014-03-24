Classable.Views.QuotePostView = Backbone.View.extend({
	
	initialize: function() {
		
	},
	
	events: {
		
	},
	
	className: "row feed-row",
	
	template: JST["post_views/quote"],
	
	
	render: function() {
		var renderedContent = this.template({ post: this.model });
		this.$el.html(renderedContent);
		return this;
	}
	
	
});