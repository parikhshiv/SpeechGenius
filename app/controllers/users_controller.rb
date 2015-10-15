class UsersController < ApplicationController
  before_filter :require_no_current_user!, :only => [:new, :create]

  def new
    @user = User.new
    render :new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      login!(@user)
      redirect_to home_url
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end
  end

  def show
   @user = User.find(params[:id])
 end

 def index
   @users = User.all
 end

 private

 def user_params
   params.require(:user).permit(:email, :password)
 end
end
