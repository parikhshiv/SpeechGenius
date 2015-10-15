json.extract! @speech, :id, :title, :speaker, :user_id,
    :created_at, :updated_at
json.content @speech.content.html_safe
json.comments do
  json.partial! 'api/comments/comment', collection: @speech.comments, as: :comment
end
