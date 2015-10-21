# == Schema Information
#
# Table name: speeches
#
#  id         :integer          not null, primary key
#  title      :string           not null
#  speaker    :string           not null
#  content    :text             not null
#  user_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  image_url  :string
#

class Speech < ActiveRecord::Base
  validates :title, :speaker, :content, :user_id, presence: true

  belongs_to :user

  has_many :comments, as: :commentable, dependent: :destroy
  has_many :votes, as: :votable, dependent: :destroy
  has_many :annotations, dependent: :destroy

  def self.lyrics_formatting(lyrics)
    # if lyrics[-2] && (lyrics[-2].include?("\n\n"))
    #   return lyrics.join(".")
    # end
    # formatted_lyrics = ""
    # lyrics.each do |line|
    #   formatted_lyrics << "#{line.strip}.\n\n"
    # end
    #
    # "#{formatted_lyrics[0...-5]}"
    lyrics
  end
end
