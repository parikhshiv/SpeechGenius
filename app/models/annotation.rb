# == Schema Information
#
# Table name: annotations
#
#  id         :integer          not null, primary key
#  content    :text             not null
#  user_id    :integer          not null
#  speech_id  :integer          not null
#  image_url  :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  pos        :integer          not null
#

class Annotation < ActiveRecord::Base
  validates :content, :user_id, :speech_id, :pos, null: false

  belongs_to :speech
  belongs_to :user

  has_many :comments, as: :commentable, dependent: :destroy
  has_many :votes, as: :votable, dependent: :destroy
end
