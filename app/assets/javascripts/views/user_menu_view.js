Classable.Views.UserMenuView = Backbone.View.extend({

	initialize: function(options) {
		this.token = options.token;
	},
	
	events: {
		"click #log-out-form" : "logOut"
		
	},
	
	template: JST['dashboard/menu'],
	
	render: function () {
		debugger
		var renderedContent = this.template({ token: this.token })
		this.$el.html(renderedContent);
		return this;
	},
	
	logOut: function() {
		$('#log-out-form').submit();
	}

	
});
