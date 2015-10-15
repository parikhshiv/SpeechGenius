class CreateSpeeches < ActiveRecord::Migration
  def change
    create_table :speeches do |t|
      t.string :title, null: false
      t.string :speaker, null: false
      t.text :content, null: false
      t.integer :user_id, null: false

      t.timestamps null: false
    end
    add_index :speeches, :user_id\
  end
end
