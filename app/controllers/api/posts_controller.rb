
class Api::PostsController < ApplicationController
  before_action :authenticate
  before_action :require_author, :only => [:update, :destroy]


  def create
    # post_model = Post.model_for(post_params[:post_type])
    puts "Got into the create method!"
    puts "Post Params"
    p post_params
    @post = current_user.posts.new(post_params)
    puts "The post we're making is.: "
    p @post
    if @post.save
      render 'api/posts/show'
    else
      @post.errors
      render :json => @post.errors.full_messages, :status => :unprocessable_entity
    end
  end
  
  def destroy
    @post = Post.find(params[:id])
    @post.destroy
    render :json => @post
    
  end
  
  def edit
   

  end
  
  def index
    subscribed_to = current_user.subscription_users.pluck(:subscribee_id)
    subscribed_to.push(current_user.id)
    @posts = Post.includes(:user, :pictures).order(:created_at).where(:user_id => subscribed_to)
    @posts
    render 'api/posts/index'
  end
  
  def following
    @posts = Post.includes(:user, :pictures).where(:user_id => current_user.id)
    @posts.reverse!
    render 'api/posts/index'
  end
  
  def favorited
    @posts = Post.includes(:user, :pictures).where(:user_id => current_user.id)
    @posts.reverse!
    render 'api/posts/index'
  end
  
  def new
    
  end
  
  def show
    
  end
  
  def update
    @post = Post.find(params[:id])
    if @post.update_attributes(post_params)
      render 'api/posts/show'
    else
      @post.errors
      render :json => @post.errors.full_messages, :status => :unprocessable_entity
    end
  end


  private
  
  def require_author
    unless current_user && Post.find(params[:id]).user_id == current_user.id
      raise User::NotAuthorized 
    end
    
  end
  
  
  def post_params
    params.require(:post).permit(:custom_url, :source_link, :publish_date, 
           :type, :quote, :link, :media_url, :title, :post_text,
           :pictures_attributes => [:image]);
  end
  
end
