  class Api::AnnotationsController < ApplicationController
  def index
    @speech = Speech.select(:id).includes({annotations: [{comments: [:user, :votes]}, :votes]}).find(params[:speech_id])
    @annotations = @speech.annotations
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
    @annotation = Annotation.select(:id).find(params[:id])
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
