class Api::SpeechesController < ApplicationController
  def index
    # @speeches = Speech.includes({comments: [:user, :votes]}, :votes)
    @speeches = Speech.select(:id, :title, :speaker,
      :created_at, :image_url).includes(:votes)
    render :index
  end

  def show
      @speech = Speech.includes({comments: [:user, :votes]}, :votes).find(params[:id])
    render :show
  end

  def create
    @speech = current_user.speeches.select(:id).new(speech_params)
    if @speech.save
      render :show
    else
      flash[:errors] = @speech.errors.full_messages
      render json: @speech, status: :unprocessable_entity
    end
  end

  def update
    @speech = Speech.select(:id, :user_id, :content,
      :created_at, :updated_at, :image_url, :title, :speaker).includes({comments: [:user, :votes]}, :votes).find(params[:speech][:id])
    if @speech.update(speech_params)
      render :show
    else
      flash[:errors] = @speech.errors.full_messages
      render json: @speech, status: :unprocessable_entity
    end
  end

  def search
   if params[:query].present?
     @speeches = Speech.select(:id, :title, :speaker).where("(LOWER(title) LIKE ?) OR (LOWER(speaker) LIKE ?)",
      "%#{params[:query].downcase}%", "%#{params[:query].downcase}%")
   else
     @speeches = Speech.none
   end

   render :search
  end

  def destroy
   @speech = Speech.select(:id).find(params[:id])
   @speech.delete
   render json: @speech
  end

  private

  def speech_params
    params.require(:speech).permit(:title, :content, :speaker, :image_url)
  end
end
