Tumblr.Views.NewPostView = Backbone.View.extend({
	
	initialize: function(options) {
		this.dashboard = options.dashboard;
		this.postTemplate = options.postTemplate;
	},
	
	textTemplate: JST['new_posts/text'],
	imageTemplate: JST['new_posts/image'],
	quoteTemplate: JST['new_posts/quote'],
	linkTemplate: JST['new_posts/link'],
	chatTemplate: JST['new_posts/chat'],
	audioTemplate: JST['new_posts/audio'],
	videoTemplate: JST['new_posts/video'],
	
	className: "new-post",
	
	events: {
		"submit form" : "createPost",
		"click button.toggle-options" : "toggleOptions",
		"click div.cancel-post" : "cancelPost"
	},
	
	render: function() {
		var renderedContent = this[this.postTemplate]({ post: this.model });
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
				Tumblr.feed.add(that.model);
				that.dashboard.removeSubView(that);
			},
			
			error: function(model, response) {
				that.showErrors(response.responseJSON);
				$submitButton.prop("disabled", false);
			}
			
		})
	},
	
	showErrors: function(errors) {
		var $errorsList = $('<ul>');
		errors.forEach(function(error){
			$errorsList.append("<li>" + error + "</li>");
		});
		$('#post-errors').html($errorsList);
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