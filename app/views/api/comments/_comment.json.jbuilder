json.extract! comment, :id, :body, :created_at, :user_id, :image_url
time_zone = (comment.created_at.strftime('%l').to_i - 7)%12
json.created_at_pretty comment.created_at.strftime("%a %d %b %Y #{time_zone}:%M %P")
json.user_email comment.user.email
json.votes do
  json.partial! 'api/votes/vote', collection: comment.votes, as: :vote
end

# http://apidock.com/ruby/DateTime/strftime
