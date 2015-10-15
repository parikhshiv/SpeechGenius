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
#

require 'test_helper'

class SpeechTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
