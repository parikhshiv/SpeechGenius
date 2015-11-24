class UpdateSpeechTable < ActiveRecord::Migration
  def change
    add_index :speeches, :title
    add_index :speeches, :speaker
  end
end
