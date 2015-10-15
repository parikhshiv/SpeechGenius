class StaticPagesController < ApplicationController
  before_filter :require_current_user!
end
