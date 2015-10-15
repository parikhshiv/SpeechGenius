class SessionsController < ApplicationController
  before_filter :require_current_user!, :only => [:destroy]
  before_filter :require_no_current_user!, :only => [:new, :create]

  def new
   @user = User.new
   render :new
  end

  def create
   @user = User.find_by_credentials(params[:user][:email], params[:user][:password])
   if @user
     login!(@user)
     redirect_to home_url
   else
     flash.now[:errors] = ["Invalid email / password combination."]
     @user = User.new
     render :new
   end
  end

  def destroy
   current_user.reset_session_token!
   session[:session_token] = nil
   render json: {}
  end
end
