class Api::UsersController < ApplicationController
  before_action :authenticate
  before_action :require_owner

  def update
    @user = User.find(params[:id])
    if @user.update_attributes(user_params)
      render :json => @user
    else
      render :json => @user.errors.full_messages
    end
  end
  
  def show
    @user = User.find(params[:id])
    render :json => @user
  end
  
  private
  
  def require_owner
    redirect_to root_url unless params[:id].to_i == current_user.id 
  end
  
  def user_params
    params.require(:user).permit(:email, :password, :avatar)
  end
  
end
