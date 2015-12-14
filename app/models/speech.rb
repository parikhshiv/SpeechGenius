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

  paginates_per 12

  def self.lyrics_formatting(lyrics)
    lyrics
  end
end
