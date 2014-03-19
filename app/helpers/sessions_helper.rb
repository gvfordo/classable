module SessionsHelper
  
  def current_user
    return nil unless session[:session_token]
    @current_user ||= User.find_by(:session_token => session[:session_token]);
  end
  
  def login!
    session[:session_token] = @user.reset_session_token!
  end
  
  def logout!
    current_user.reset_session_token!
    session[:session_token] = nil
  end
  
  def logged_in?
    !!current_user
  end
  
  def is_admin?
    current_user && current_user.admin
  end
  
  def authenticate
    redirect_to new_session_url unless logged_in?
  end
  
  def require_admin
    unless is_admin?
      flash[:errors] = ["You don't have permission to access that!"]
      redirect_to new_session_url
    end
  end

end
