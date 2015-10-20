# == Schema Information
#
# Table name: votes
#
#  id           :integer          not null, primary key
#  user_id      :integer          not null
#  votable_id   :integer          not null
#  votable_type :string           not null
#  value        :integer          not null
#  created_at   :datetime
#  updated_at   :datetime
#

class Vote < ActiveRecord::Base
  validates :user_id, :votable_id, :votable_type, :value, presence: true

  validates :user_id, uniqueness: { scope: [:votable_id, :votable_type] }

  belongs_to :votable, polymorphic: true
  belongs_to :user
end
