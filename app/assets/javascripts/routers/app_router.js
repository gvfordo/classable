Classable.Routers.AppRouter = Backbone.Router.extend({
	
	initialize: function(options) {
		this.$rootEl =  options.$rootEl;
	},
	
	routes: {
	    ""                 : "userDashboard",
		"account-settings" : "accountSettings",
		"blog-settings"    : "blogSettings"
	},
	
	userDashboard: function() {
		var dashboardView = new Classable.Views.DashboardView({ user: Classable.user })
		this._swapView(dashboardView);
	},
	
	accountSettings: function() {
		var accountSettings = new Classable.Views.AccountSettingsView({});
		this._swapView(accountSettings);
	},
	
	blogSettings: function() {
		
	},
	
	_swapView: function(view) {
		if(this._currentView) {
			this._currentView.removeChildren();
			this._currentView.remove();
		}
		this._currentView = view
		this.$rootEl.html(view.render().$el);
	}
	
	
	
});