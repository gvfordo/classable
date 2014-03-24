Classable.Models.Post = Backbone.Model.extend({
	urlRoot: '/api/posts',
	
	parse: function(json) {
		if(json.type == "Image") {
			this.pictures().set(json.pictures)
			delete json.pictures;
		}
		return json;
	},
	
	pictures: function() {
		var that = this;
		if(!this._pictures) {
			this._pictures = new Classable.Collections.PostPictures([], {
				post: that
			});
		}
		return this._pictures;
	}
	
});