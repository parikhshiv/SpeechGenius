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
#

require 'test_helper'

class AnnotationTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
