class UsersController < ApplicationController
  before_action :authenticate, :only => [:edit, :destroy, :show, :update]
  before_action :require_admin, :only => [:index]
  
  
  def create
    @user = User.new(user_params)
    if @user.save
      login!
      redirect_to dashboard_url
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end
  end
  
  def destroy
    
  end

  def edit
    @user = User.find(params[:id])
    render :edit
  end
  
  def index
    
  end
  
  def new
    @user = User.new
    render :new
  end
  
  def show
    user_info
  
    render :dashboard, :layout =>  'dashboard'
  end 
  
  def update
    @user = User.find(params[:id])
    if @user.update_attributes(user_params)
      flash[:message] = "User updated successfully"
      redirect_to user_url(@user)
    else
      flash.now[:errors] = @user.errors.full_messages
      render :edit
    end
  end
  
  private
  
  def user_info
    @user = current_user
    @user_info = {}
    @user_info['id'] = @user.id
    @user_info['username'] = @user.username
    @user_info['email'] = @user.email
    @user_info['avatar'] = @user.avatar.url(:thumb)
  end
  
  def user_params
    params.require(:user).permit(:username, :email, :password, :avatar)
  end

end
