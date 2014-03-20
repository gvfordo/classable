Tumblr.Views.TextPostView = Backbone.View.extend({
	
	initialize: function() {
		
	},
	
	template: JST['posts/text'],
	
	className: "new-post",
	
	events: {
		"submit form" : "createPost",
		"click button.toggle-options" : "toggleOptions"
	},
	
	render: function() {
		var renderedContent = this.template({ post: this.model });
		this.$el.html(renderedContent);
		return this;
	},
	
	createPost: function(event) {
		event.preventDefault();
		$data = $(event.target).serializeJSON();
		this.model.save($data, {
			// success: function(response) {
// 				Tumblr.posts.add(this.model)
// 			}
		})
	},
	
	toggleOptions: function(event) {
		event.preventDefault();
		$options = $('.advanced-options')
		$button = $('.toggle-options')
		$options.toggleClass("hidden")
		$('#adv-opt-clear-div').toggleClass("hidden")
		$options.hasClass("hidden") ? $button.text("Show Advanced Options") :
																	$button.text("Hide Advanced Options");
		
		
	}
});