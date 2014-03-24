Classable.Views.UserMenuView = Backbone.View.extend({

	initialize: function(options) {
		this.token = options.token;
	},
	
	events: {
		
	},
	
	template: JST['dashboard/menu'],
	
	render: function () {
		debugger
		var renderedContent = this.template({ token: this.token })
		this.$el.html(renderedContent);
		return this;
	}

	
});
