json.array!(@speeches) do |speech|
  json.extract! speech, :id, :title, :speaker
end
