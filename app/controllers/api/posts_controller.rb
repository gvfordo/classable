
class Api::PostsController < ApplicationController
  before_action :authenticate


  def create
    # post_model = Post.model_for(post_params[:post_type])
    @post = current_user.posts.new(post_params)
    if @post.save
      render 'api/posts/show'
    else
      @post.errors
      render :json => @post.errors.full_messages, :status => :unprocessable_entity
    end
  end
  
  def destroy
    
  end
  
  def edit
    
  end
  
  def index
    @posts = Post.includes(:user).where(:user_id => current_user.id)
    render 'api/posts/index'
  end
  
  def new
    
  end
  
  def show
    
  end
  
  def update
    
  end


  private
  
  def post_params
    params.require(:post).permit(:custom_url, :source_link, :publish_date, 
           :type, :quote, :link, :media_url, :title, :post_text,
           :images => [])
  end
  
end
