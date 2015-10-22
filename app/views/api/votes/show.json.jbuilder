if @votable.class == Speech
  json.extract! @votable, :id, :title, :speaker, :user_id,
      :created_at, :updated_at, :image_url
  json.content Speech.lyrics_formatting(@votable.content)
  json.comments do
    json.partial! 'api/comments/comment', collection: @comments, as: :comment
  end
  json.votes do
    json.partial! 'api/votes/vote', collection: @votable.votes, as: :vote
  end
elsif @votable.class == Annotation
  json.extract! @votable, :id, :content, :user_id, :speech_id, :image_url,
      :created_at, :updated_at, :pos
  json.comments do
    json.partial! 'api/comments/comment', collection: @comments, as: :comment
  end
  json.votes do
    json.partial! 'api/votes/vote', collection: @votable.votes, as: :vote
  end
elsif @votable.commentable.class == Speech
  json.extract! @votable.commentable, :id, :title, :speaker, :user_id,
      :created_at, :updated_at, :image_url
  json.content Speech.lyrics_formatting(@votable.commentable.content)
  json.comments do
    json.partial! 'api/comments/comment', collection: @votable.commentable.comments, as: :comment
  end
  json.votes do
    json.partial! 'api/votes/vote', collection: @votable.commentable.votes, as: :vote
  end
else
  json.extract! @votable.commentable, :id, :content, :user_id, :speech_id, :image_url,
      :created_at, :updated_at, :pos
  json.comments do
    json.partial! 'api/comments/comment', collection: @votable.commentable.comments, as: :comment
  end
  json.votes do
    json.partial! 'api/votes/vote', collection: @votable.commentable.votes, as: :vote
  end
end
