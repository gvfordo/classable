Tumblr.Views.TextPostView = Backbone.View.extend({
	
	initialize: function(options) {
		this.dashboard = options.dashboard;
	},
	
	template: JST['posts/text'],
	
	className: "new-post",
	
	events: {
		"submit form" : "createPost",
		"click button.toggle-options" : "toggleOptions",
		"click div.cancel-post" : "cancelPost"
	},
	
	render: function() {
		var renderedContent = this.template({ post: this.model });
		this.$el.html(renderedContent);
		return this;
	},
	
	createPost: function(event) {
		event.preventDefault();
		$data = $(event.target).serializeJSON();
		$submitButton = $('.btn-success')
		$submitButton.prop('disabled', true)
		that = this;
		this.model.save($data, {
			success: function(response) {
				//  Add post to user's feed view. Tumblr.posts.add(this.model)
				that.dashboard.removeSubView(that);
			},
			
			error: function(response) {
				$submitButton.prop("disabled", false);
			}
			
		})
	},
	
	cancelPost: function(event) {
		event.preventDefault();
		// confirm cancelation?
		this.dashboard.removeSubView(this);
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