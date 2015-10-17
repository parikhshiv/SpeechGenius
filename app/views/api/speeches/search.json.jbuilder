json.array!(@speeches) do |speech|
  json.extract! speech, :id, :title, :speaker,
      :created_at, :updated_at, :image_url
end
