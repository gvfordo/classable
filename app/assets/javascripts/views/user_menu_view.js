Classable.Views.UserMenuView = Backbone.View.extend({

	initialize: function(options) {
		this.token = $('#csrf-token').html();
	},
	
	events: {
		"click #log-out-form" : "logOut",
		"click .menu-icon" : "menuClick"
		
	},
	
	template: JST['dashboard/menu'],
	
	render: function () {
		var renderedContent = this.template({ token: this.token })
		this.$el.html(renderedContent);
		return this;
	},
	
	menuClick: function(event) {
		
	},
	
	logOut: function() {
		$('#log-out-form').submit();
	}

	
});
