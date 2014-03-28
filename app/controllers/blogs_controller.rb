class BlogsController < ApplicationController
  
  
  def index
    @user = User.find_by( :username => params[:username])
    @blog = {}
    @blog['id'] = @user.id
    @blog['title'] = @user.username. + "'s Classable Blog!"
    @blog['meta-title'] = @user.username + "'s HTML Safe Classable Blog Title!"
    @posts = @user.posts
    @posts
    @is_following = currently_following?
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
       @is_following = currently_following?
      render 'blogs/default/index', :layout => false
      end
  
  end
  
  def page

 
  end
  
  private
  
  def currently_following?
    return false unless logged_in?
    following = false
    current_user.subscriptions.each do |sub|
      if sub.subscribee_id == @user.id
        following = true
        @subscription = sub;
      end
    end
    following
  end
  
end
