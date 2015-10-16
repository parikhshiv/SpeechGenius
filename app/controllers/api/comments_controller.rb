class Api::CommentsController < ApplicationController
  def index
    @comments = Comment.all
    render json: @comments
  end

  def show
    @comment = Comment.find(params[:id])
    @commentable = @comment.commentable
    render :show
  end

  def create
    @comment = current_user.comments.new(comment_params)
    if @comment.save
      @commentable = @comment.commentable
      render :show
    else
      flash[:errors] = @comment.errors.full_messages
      render json: @comment, status: :unprocessable_entity
    end
  end

  def destroy
    @comment = Comment.find(params[:id])
    @commentable = @comment.commentable
    @comment.delete
    render :show
  end

  private

  def comment_params
    params.require(:comment).permit(:body, :commentable_id, :commentable_type, :image_url)
  end
end
