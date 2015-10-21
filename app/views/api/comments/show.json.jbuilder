if @commentable.class == Speech
  json.extract! @commentable, :id, :title, :speaker, :user_id,
      :created_at, :updated_at, :image_url
  json.content Speech.lyrics_formatting(@commentable.content)
  json.votes do
    json.partial! 'api/votes/vote', collection: @commentable.votes, as: :vote
  end
else
  json.extract! @commentable, :id, :content, :user_id, :speech_id, :image_url,
      :created_at, :updated_at, :pos
  json.votes do
    json.partial! 'api/votes/vote', collection: @commentable.votes, as: :vote
  end
end

json.comments do
  json.partial! 'api/comments/comment', collection: @commentable.comments, as: :comment
end
