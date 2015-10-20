class AddPosColumn < ActiveRecord::Migration
  def change
    add_column :annotations, :pos, :integer, null: false
  end
end
