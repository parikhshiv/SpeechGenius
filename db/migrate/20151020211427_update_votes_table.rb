class UpdateVotesTable < ActiveRecord::Migration
  def change
    remove_index :votes, [:votable_id, :user_id]
    add_index :votes, [:votable_id, :user_id, :votable_type], unique: true
  end
end
