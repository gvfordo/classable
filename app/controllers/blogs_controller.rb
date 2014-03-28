class BlogsController < ApplicationController
  
  
  def index
    @user = User.find_by( :username => params[:username])
    @blog = {}
    @blog['id'] = @user.id
    @blog['title'] = @user.username. + "'s Classable Blog!"
    @blog['meta-title'] = @user.username + "'s HTML Safe Classable Blog Title!"
    @posts = @user.posts
    @posts
    render 'blogs/default/index', :layout => false
  end
  
  def post
    @user = User.find_by( :username => params[:username])
    @posts = Post.where(:user_id => @user.id, :custom_url => params[:post_title])
    if @posts.length == 0
      @posts = Post.where(:user_id => @user.id, :id => params[:post_title])
    end
    
    if @posts.length == 0
      render 'blogs/not-found'
    else 
      @blog = {} 
      @blog['id'] = @user.id
      @blog['title'] = @user.username. + "'s Classable Blog!"
      @blog['meta-title'] = @user.username + "'s HTML Safe Classable Blog Title!"
      render 'blogs/default/index', :layout => false
      end
  
  end
  
  def page

 
  end
  
  private
  
end
