Classable.Views.UserFeedView = Backbone.View.extend({
	
	initialize: function(){
		this.listenTo(this.collection, "sync add", this.render);
		// this.listenTo(this.collection, "add", this.addOne);
	},
	
	events: {

	},
	
	template: JST['dashboard/feed'],
	
	
	render: function() {
		var renderedContent = this.template();
		this.$el.html(renderedContent);
		var that = this;
		this.collection.forEach(function(post) {
			that.$el.prepend(that.renderedPostType(post));
		});		
		return this;
		
	},
	
	addOne: function() {
		var that = this;
		that.$el.prepend(that.renderedPostType(that.collection.models[that.collection.length - 1]))
	},
	
	renderedPostType: function(post) {
		switch(post.get('type')) {
			case "Text":
				//render TextPostShow
				// that.$el.append(that.renderTextPost(post));
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
				//render AudioPostShow
				break;
			case "Video":
				//render VideoPostShow
				break;
			default:
				console.log("Hit the default in the post switch statement.  That probably shouldn't have happened");
		}
	},
	
	renderTextPost: function(post) {
		var showTextView = new Classable.Views.TextPostView({ model: post });
		return showTextView.render().$el;
	},
	
	renderImagePost: function(post) {
		var showImageView = new Classable.Views.ImagePostView({ model: post });
		return showImageView.render().$el;
	},
	
	renderQuotePost: function(post) {
		var showQuoteView = new Classable.Views.QuotePostView({ model: post });
		return showQuoteView.render().$el;
	},
	
	renderLinkPost: function(post) {
		var showLinkView = new Classable.Views.LinkPostView({ model: post });
		return showLinkView.render().$el;
	},
	
	renderChatPost: function(post) {
		var showChatView = new Classable.Views.ChatPostView({ model: post });
		return showChatView.render().$el;
	}
	
	
	
});