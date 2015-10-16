json.extract! comment, :id, :body, :created_at, :user_id
json.created_at_pretty comment.created_at.strftime('%a %d %b %Y %l:%M %P')
json.user_email comment.user.email

# http://apidock.com/ruby/DateTime/strftime
