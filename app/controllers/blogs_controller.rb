class BlogsController < ApplicationController
  
  
  def index
    @user = User.find_by( :username => params[:username])
    @blog = {}
    @blog['id'] = @user.id
    @blog['title'] = @user.username. + "'s Classable Blog!"
    @blog['meta-title'] = @user.username + "'s HTML Safe Classable Blog Title!"
    @posts = @user.posts
    render 'blogs/default/index', :layout => false
  end
  
  def post
    
  end
  
  def page
    
  end
  
  private
  
end
