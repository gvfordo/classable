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
    render :login
  end
  


  private
  
  def session_params
    params.require(:session).permit(:user, :password)
  end

end
