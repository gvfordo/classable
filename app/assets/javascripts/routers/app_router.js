Tumblr.Routers.AppRouter = Backbone.Router.extend({
	
	initialize: function(options) {
		this.$rootEl =  options.$rootEl;
	},
	
	routes: {
	  "" : "userDashboard" 	
	},
	
	userDashboard: function() {
		var user = JSON.parse($('#user-info').html());
		var dashboardView = new Tumblr.Views.DashboardView({ user: user })
		this._swapView(dashboardView);
	},
	
	
	_swapView: function(view) {
		if(this._currentView) {
			this._currentView.remove()
		}
		this._currentView = view
		this.$rootEl.html(view.render().$el);
	}
	
	
	
})