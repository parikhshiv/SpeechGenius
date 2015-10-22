  class Api::AnnotationsController < ApplicationController
  def index
    @speech = Speech.find(params[:speech_id])
    @annotations = @speech.annotations.includes({comments: [:user, :votes]}, :votes)
    render :index
  end

  def show
    @annotation = Annotation.includes({comments: [:user, :votes]}, :votes).find(params[:id])
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

  def update
    @annotation = Annotation.find(params[:annotation][:id])
    if @annotation.update(annotation_params)
      render :show
    else
      flash[:errors] = @annotation.errors.full_messages
      render json: @annotation, status: :unprocessable_entity
    end
  end


  private

  def annotation_params
    params.require(:annotation).permit(:content, :speech_id, :image_url, :pos)
  end
end
