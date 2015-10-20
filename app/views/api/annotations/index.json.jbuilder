json.array! @annotations do |annotation|
  json.extract! annotation, :id, :content, :speech_id, :user_id, :image_url, :pos
  # json.created_at annotation.created_at.strftime('%a %d %b %Y')
  # json.updated_at annotation.updated_at.strftime('%a %d %b %Y')
  # json.user_email annotation.user.email
  json.comments do
    json.partial! 'api/comments/comment', collection: annotation.comments, as: :comment
  end
  json.votes do
    json.partial! 'api/votes/vote', collection: annotation.votes, as: :vote
  end
end
