
class Api::PostsController < ApplicationController
  before_action :authenticate


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
    
  end
  
  def edit
    
  end
  
  def index
    subscribed_to = current_user.subscription_users.pluck(:subscribee_id)
    subscribed_to.push(current_user.id)
    @posts = Post.includes(:user, :pictures).order(:created_at).where(:user_id => subscribed_to)
    @posts.reverse!
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
    
  end


  private
  
  def post_params
    params.require(:post).permit(:custom_url, :source_link, :publish_date, 
           :type, :quote, :link, :media_url, :title, :post_text,
           :pictures_attributes => [:image]);
  end
  
end
