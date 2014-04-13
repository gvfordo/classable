Classable.Views.UserFeedView = Backbone.View.extend({
	
	initialize: function(){
		this.listenTo(this.collection, "sync add", this.render);
		this.postViews = {};
		this.subViews = [];
		// this.listenTo(this.collection, "add", this.addOne);
	},
	
	events: {
		"click .delete-post" : "deletePost",
		"click .edit-post" : "editPost",
	},
	
	template: JST['dashboard/feed'],
	
	
	render: function() {
		var renderedContent = this.template();
		this.$el.html(renderedContent);
		var that = this;
		this.collection.forEach(function(post) {
			that.$el.prepend(that.renderedPostType(post));
		});
		console.log("rendered feed view");		
		return this;
		
	},
	
	editPost: function(event) {
		event.preventDefault();
    	var that = this;
		var id = $(event.target).data('id');
		var post = this.collection.get(id)
		var editForm = new Classable.Views.NewPostView({
			model: post,
			postTemplate: post.get("type"),
			parent: this
		});
		$post_area = this.postViews[""+id+""].$('.feed-post')
		$post_area.html(editForm.render().$el)
		
	},
	
	removeSubView: function(editView) {
		console.log("cancel edit for");
		console.log(editView);
		editView.remove();
		this.render();
		
	},
	
	deletePost: function(event) {
		event.preventDefault();
    var that = this;
		var id = $(event.target).data('id');
		post = this.collection.get(id);
		post.destroy({
			success: function() {
				that.postViews[""+id+""].remove();
			}
		});
	},
	
	addOne: function() {
		var that = this;
		that.$el.prepend(that.renderedPostType(that.collection.models[that.collection.length - 1]))
	},
	
	renderedPostType: function(post) {
		switch(post.get('type')) {
			case "Text":
				return this.renderTextPost(post);
				break;
			case "Image":
				return this.renderImagePost(post);
				break;
			case "Quote":
				return this.renderQuotePost(post);
				break;
			case "Link":
				return this.renderLinkPost(post);
				break;
			case "Chat":
				return this.renderChatPost(post);
				break;
			case "Audio": 
				return this.renderAudioPost(post);
				break;
			case "Video":
				return this.renderVideoPost(post);
				break;
			default:
				break;
		}
	},
	
	renderTextPost: function(post) {
		var showTextView = new Classable.Views.TextPostView({ model: post });
		this.subViews.push(showTextView);
		this.postViews[""+post.id+""] = showTextView
		return showTextView.render().$el;
	},
	
	renderImagePost: function(post) {
		var showImageView = new Classable.Views.ImagePostView({ model: post });
		this.subViews.push(showImageView);
		this.postViews[""+post.id+""] = showImageView
		return showImageView.render().$el;
	},
	
	renderQuotePost: function(post) {
		var showQuoteView = new Classable.Views.QuotePostView({ model: post });
		this.subViews.push(showQuoteView);
		this.postViews[""+post.id+""] = showQuoteView
		return showQuoteView.render().$el;
	},
	
	renderLinkPost: function(post) {
		var showLinkView = new Classable.Views.LinkPostView({ model: post });
		this.subViews.push(showLinkView);
		this.postViews[""+post.id+""] = showLinkView
		return showLinkView.render().$el;
	},
	
	renderChatPost: function(post) {
		var showChatView = new Classable.Views.ChatPostView({ model: post });
		this.subViews.push(showChatView);
		this.postViews[""+post.id+""] = showChatView
		return showChatView.render().$el;
	},
	
	renderAudioPost: function(post) {
		var showAudioView = new Classable.Views.AudioPostView({ model: post });
		this.subViews.push(showAudioView);
		this.postViews[""+post.id+""] = showAudioView
		return showAudioView.render().$el;
	},
	
	renderVideoPost: function(post) {
		var showVideoView = new Classable.Views.VideoPostView({ model: post });
		this.subViews.push(showVideoView);
		this.postViews[""+post.id+""] = showVideoView
		return showVideoView.render().$el;
	},

	removeChildren: function() {
		this.subViews.forEach(function(view) {
			view.remove();
		})
	}
	
	
	
});