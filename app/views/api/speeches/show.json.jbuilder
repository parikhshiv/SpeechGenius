json.extract! @speech, :id, :title, :speaker, :user_id,
    :created_at, :updated_at, :image_url


json.content Speech.lyrics_formatting(@speech.content)
json.comments do
  json.partial! 'api/comments/comment', collection: @speech.comments, as: :comment
end
json.votes do
  json.partial! 'api/votes/vote', collection: @speech.votes, as: :vote
end
