class Api::SpeechesController < ApplicationController
  def index
    @speeches = Speech.all
    render :index
  end

  def show
    @speech = Speech.find(params[:id])
    render :show
  end

  def create
    @speech = current_user.speeches.new(speech_params)
    if @speech.save
      render :show
    else
      flash[:errors] = @speech.errors.full_messages
      render json: @speech, status: :unprocessable_entity
    end
  end

  def update
    @speech = Speech.find(params[:speech][:id])
    if @speech.update(speech_params)
      render :show
    else
      flash[:errors] = @speech.errors.full_messages
      render json: @speech, status: :unprocessable_entity
    end
  end

  def search
   if params[:query].present?
     @speeches = Speech.where("(LOWER(title) LIKE ?) OR (LOWER(speaker) LIKE ?)",
      "#{params[:query].downcase}%", "#{params[:query].downcase}%")
   else
     @speeches = Speech.none
   end

   render :search
  end
  def destroy
   @speech = Speech.find(params[:id])
   @speech.delete
   render :show
  end

  private

  def speech_params
    params.require(:speech).permit(:title, :content, :speaker, :image_url)
  end
end
