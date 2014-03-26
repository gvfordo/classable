Classable.Views.AccountSettingsView = Backbone.View.extend({
	
	initialize: function(options) {
	  this.user = Classable.user;
	},
	
	events: {
		"change #image-upload" : "handleFiles",
		"submit form" : "updateUser"
	},
	
	template: JST['dashboard/account_settings'],
	
	render: function() {
		var renderedContent = this.template({ user: this.user });
		this.$el.html(renderedContent);
		this.showUserMenu();
		return this;
	},
	
	showUserMenu: function() {
		var userMenuView = new Classable.Views.UserMenuView();
		$('#user-menu-area').html(userMenuView.render().$el);
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
				var $img = $('#user-avatar-image')
				var $input = $('<input type="hidden" name="user[avatar]">')
				$input.val(e.target.result);
				$img.attr("src", this.result);
				that.$('#avatar-area').append($input);
				console.log(this.result)
			}
			reader.readAsDataURL(files[i]);
	
		}
	},
	
	updateUser: function(event) {
		event.preventDefault();
		$data = $(event.target).serializeJSON();
		this.user.save($data, {
			success: function () {
				console.log("Hot damn that worked!")
			}
		})
	}
	
});