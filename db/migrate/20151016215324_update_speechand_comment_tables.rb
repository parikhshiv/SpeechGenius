class UpdateSpeechandCommentTables < ActiveRecord::Migration
  def change
    add_column :speeches, :image_url, :string
    add_column :comments, :image_url, :string
  end
end
