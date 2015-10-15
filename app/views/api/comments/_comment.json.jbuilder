json.extract! comment, :id, :body
json.created_at comment.created_at.strftime('%a %d %b %Y')
json.user_email comment.user.email
