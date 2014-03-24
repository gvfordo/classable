Classable.Views.PostTypesView = Backbone.View.extend({
	
	initialize: function() {
		
	},
	
	events: {
	},
	
	template: JST['dashboard/post_types'],
	
	render: function() {
		var renderedContent = this.template();
		this.$el.html(renderedContent);
		return this;
	},
	
	postTypeHover: function(event) {

	}
	
	
	
});