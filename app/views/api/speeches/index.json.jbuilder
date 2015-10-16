json.array! @speeches do |speech|
  def lyrics_formatting(lyrics)
    if lyrics[1] && lyrics[1].include?("\n\n")
      return lyrics.join(".")
    end
    formatted_lyrics = ""
    lyrics.each do |line|
      formatted_lyrics << "#{line.strip}.\n\n"
    end

    "#{formatted_lyrics[0...-2]}"
  end

  json.extract! speech, :id, :title, :speaker, :user_id,
      :created_at, :updated_at
  json.content lyrics_formatting(speech.content.split("."))
  json.comments do
    json.partial! 'api/comments/comment', collection: speech.comments, as: :comment
  end
end
