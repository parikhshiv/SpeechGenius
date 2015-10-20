# == Schema Information
#
# Table name: comments
#
#  id               :integer          not null, primary key
#  body             :text             not null
#  user_id          :integer          not null
#  commentable_id   :integer          not null
#  commentable_type :string           not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  image_url        :string
#

class Comment < ActiveRecord::Base
  validates :body, :user_id, :commentable_id, :commentable_type, presence: true

  belongs_to :commentable, polymorphic: true
  belongs_to :user
  has_many :votes, as: :votable, dependent: :destroy
end
