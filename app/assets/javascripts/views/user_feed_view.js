Tumblr.Views.UserFeedView = Backbone.View.extend({
	
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
		debugger
		var that = this;
		that.$el.prepend(that.renderedPostType(that.collection.models[that.collection.length - 1]))
	},
	
	renderedPostType: function(post) {
		switch(post.get('post_type')) {
			case "TextPost":
				//render TextPostShow
				// that.$el.append(that.renderTextPost(post));
				return this.renderTextPost(post);
				break;
			case "ImagePost":
				//render ImagePostShow
				break;
			case "QuotePost":
				//render QuotePostShow
				break;
			case "LinkPost":
				//render LinkPostShow
				break;
			case "ChatPost":
				//render ChatPostShow
				break;
			case "AudioPost": 
				//render AudioPostShow
				break;
			case "VideoPost":
				//render VideoPostShow
				break;
			default:
				console.log("Hit the default in the post switch statement.  That probably shouldn't have happened");
		}
	},
	
	renderTextPost: function(post) {
		var showTextView = new Tumblr.Views.TextPostView({ model: post });
		return showTextView.render().$el;
	}
	
	
	
});