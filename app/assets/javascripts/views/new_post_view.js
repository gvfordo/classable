Classable.Views.NewPostView = Backbone.View.extend({
	
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
		"click div.cancel-post" : "cancelPost",
		"change #image-upload" : "handleFiles"
	},
	
	render: function() {
		var renderedContent = this[this.postTemplate]({ post: this.model });
		this.$el.html(renderedContent);
		return this;
	},
	
	
	handleFiles: function(event) {
		event.preventDefault()
		var that = this;

		var files = event.target.files
		
		for(var i = 0; i < files.length; i++) {

			console.log(files[i]);
			var reader = new FileReader();
			reader.onload = function(e) {
				// This loses the file name along the way :(
				console.log(e.target.result)
				var $img = $('<img class="img-preview" />')
				var $input = $('<input type="hidden" name="post[pictures_attributes][][image]">')
				$input.val(e.target.result);
				$img.attr("src", this.result);
				that.$('#uploaded-images').append($img);
				that.$('#uploaded-images').append($input);
				that.showTextOptions
				console.log(this.result)
			}
			reader.readAsDataURL(files[i]);
	
		}
	},
	

	
	createPost: function(event) {
		event.preventDefault();
		$data = $(event.target).serializeJSON();
		$submitButton = $('.btn-success')
		$submitButton.prop('disabled', true)
		that = this;
		debugger
		this.model.save($data, {
			success: function(response) {
				Classable.feed.add(that.model);
				that.dashboard.removeSubView(that);
			},
			
			error: function(model, response) {
				that.showErrors(response.responseJSON);
				$submitButton.prop("disabled", false);
			}
			
		})
	},
	
	textOptions: function(show) {
		if(show) {
			this.$('optional-text').show({ duration: 200 });
		} else {
			this.$('optional-text').hide({ duration: 200 });
		}
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
		$options.toggle({ 
			 duration: 200,
			 complete: function() {
		 		$options.css("display") == 'none' ? 
								$button.text("Show Advanced Options") :
		 						$button.text("Hide Advanced Options");
		}})
		$('#adv-opt-clear-div').toggle({ duration: 100 })
		
		
		
	}
});