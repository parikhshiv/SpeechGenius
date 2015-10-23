json.array! @speeches do |speech|
  json.extract! speech, :id, :title,
      :created_at, :image_url, :speaker
  json.votes do
    json.partial! 'api/votes/vote', collection: speech.votes, as: :vote
  end
end
