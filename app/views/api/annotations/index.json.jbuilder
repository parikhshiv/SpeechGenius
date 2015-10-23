json.array! @annotations do |annotation|
  json.extract! annotation, :id, :content, :speech_id, :user_id, :image_url, :pos
  json.comments do
    json.partial! 'api/comments/comment', collection: annotation.comments, as: :comment
  end
  json.votes do
    json.partial! 'api/votes/vote', collection: annotation.votes, as: :vote
  end
end
