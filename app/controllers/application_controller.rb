class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  helper_method :current_user

  def current_user
    @current_user ||= User.find_by(session_token: session[:session_token])
  end

  def login!(user)
    @current_user = user
    session[:session_token] = user.reset_session_token!
  end


  def require_current_user!
    unless current_user
      redirect_to new_session_url
    end
  end

  def require_no_current_user!
    redirect_to root_url if current_user
  end
end
