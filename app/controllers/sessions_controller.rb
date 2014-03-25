class SessionsController < ApplicationController
  
  def create
    @user = User.find_by_credentials(session_params)
    if @user
      login!
      redirect_to dashboard_url
    else
      flash[:errors] = ["Invalid Login Information"]
      redirect_to new_session_url
    end
  end
  
  def destroy
    logout!
    redirect_to new_session_url
  end
  
  def new
    if logged_in? 
      redirect_to dashboard_url 
    else
      render :login
    end
  end

  private
  
  def session_params
    params.require(:session).permit(:user, :password)
  end

end
