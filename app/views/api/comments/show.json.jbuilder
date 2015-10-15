if @commentable.class == Speech
  json.extract! @commentable, :id, :title, :speaker, :content, :user_id,
      :created_at, :updated_at
else
  json.extract! @commentable, :id, :content, :user_id, :speech_id, :image_url,
      :created_at, :updated_at
end

json.comments do
  json.partial! 'api/comments/comment', collection: @commentable.comments, as: :comment
end
