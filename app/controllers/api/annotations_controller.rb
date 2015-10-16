class Api::AnnotationsController < ApplicationController
  def index
    # @speech = Speech.find(params[:speech_id])
    # @annotations = @speech.annotations
    @annotations = Annotation.all
    render :index
  end

  def show
    @annotation = Annotation.find(params[:id])
    render :show
  end

  def create
    @annotation = current_user.annotations.new(annotation_params)
    if @annotation.save
      render :show
    else
      flash[:errors] = @annotation.errors.full_messages
      render json: @annotation, status: :unprocessable_entity
    end
  end

  def destroy
    @annotation = Annotation.find(params[:id])
    @annotation.delete
    render json: @annotation
  end

  private

  def annotation_params
    params.require(:annotation).permit(:content, :speech_id, :image_url)
  end
end
