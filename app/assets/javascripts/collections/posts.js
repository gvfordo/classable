Tumblr.Collections.Posts = Backbone.Collection.extend({
	url: "/api/posts",
	model: Tumblr.Models.Post
});