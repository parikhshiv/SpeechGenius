json.extract! @annotation, :id, :content, :user_id, :speech_id, :image_url, :pos
json.comments do
  json.partial! 'api/comments/comment', collection: @annotation.comments, as: :comment
end
json.votes do
  json.partial! 'api/votes/vote', collection: @annotation.votes, as: :vote
end
