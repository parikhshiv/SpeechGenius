class Api::VotesController < ApplicationController
  def create
    @vote = current_user.votes.new(vote_params)
    @votable = @vote.votable
    if @vote.save
      render :show
    else
      flash[:errors] = @vote.errors.full_messages
      render json: @vote, status: :unprocessable_entity
    end
  end

  def destroy
    @vote = Vote.find(params[:id])
    @votable = @vote.votable
    @vote.delete
    render :show
  end

  def update
    @vote = Vote.find(params[:vote][:id])
    @votable = @vote.votable
    if @vote.update(vote_params)
      render :show
    else
      flash[:errors] = @vote.errors.full_messages
      render json: @vote, status: :unprocessable_entity
    end
  end

  private

  def vote_params
    params.require(:vote).permit(:votable_id, :votable_type, :value)
  end
end
