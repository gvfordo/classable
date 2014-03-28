Classable.Views.NewPostView = Backbone.View.extend({
	
	initialize: function(options) {
		this.parent = options.parent;
		this.postTemplate = options.postTemplate;
	},
	
	Text : JST['new_posts/text'],
	Image : JST['new_posts/image'],
	Quote : JST['new_posts/quote'],
	Link : JST['new_posts/link'],
	Chat : JST['new_posts/chat'],
	Audio : JST['new_posts/audio'],
	Video : JST['new_posts/video'],
	
	className: "new-post",
	
	events: {
		"click .create-post" : "createPost",
		"click .update-post" : "updatePost",
		"click button.toggle-options" : "toggleOptions",
		"click div.cancel-post" : "cancelPost",
		"change #image-upload" : "handleFiles",
		"keyup input.audio-input" : "audioInput"
	},
	
	render: function() {
		var renderedContent = this[this.postTemplate]({ post: this.model });
		this.$el.html(renderedContent);
		this.activateEditor();
		return this;
	},
	
	activateEditor: function() {
		this.$('.editor').griffinEditor();
	},
	
	
	handleFiles: function(event) {
		event.preventDefault()
		var that = this;

		var files = event.target.files
		
		for(var i = 0; i < files.length; i++) {

			var reader = new FileReader();
			reader.onload = function(e) {
				// This loses the file name along the way :(
				var $img = $('<img class="img-preview" />')
				var $input = $('<input type="hidden" name="post[pictures_attributes][][image]">')
				$input.val(e.target.result);
				$img.attr("src", this.result);
				that.$('#uploaded-images').append($img);
				that.$('#uploaded-images').append($input);
				that.showTextOptions();
			}
			reader.readAsDataURL(files[i]);
	
		}
	},
	
	showTextOptions: function() {
		this.$('.optional-text').show({ duration: 1000, effect: $.slideDown })
	},
	
	updatePost: function(event) {
		event.preventDefault();
		$data = $('.post-form').serializeJSON();
		$submitButton = $('.btn-success')
		$submitButton.prop('disabled', true)
		that = this;
		if ($data['post']['type'] == "Video") {
			debugger
			$data['post']['media_url'] = this.youtubeLink($data['post']['media_url'])
		}
		this.model.save($data, {
			success: function(response) {
				that.parent.removeSubView(that);
			},
			
			error: function(model, response) {
				that.showErrors(response.responseJSON);
				$submitButton.prop("disabled", false);
			}
			
		})
	},
	
	createPost: function(event) {
		event.preventDefault();
		$data = $('.post-form').serializeJSON();
		$submitButton = $('.btn-success')
		$submitButton.prop('disabled', true)
		that = this;
		if ($data['post']['type'] == "Video") {
			$data['post']['media_url'] = this.youtubeLink($data['post']['media_url'])
		}
		this.model.save($data, {
			success: function(response) {
				Classable.feed.add(that.model);
				that.parent.removeSubView(that);
			},
			
			error: function(model, response) {
				that.showErrors(response.responseJSON);
				$submitButton.prop("disabled", false);
			}
			
		})
	},
	
	youtubeLink: function(url) {
		var url_end = url.length
		return url.substring(16, url_end)
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
		this.parent.removeSubView(this);
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