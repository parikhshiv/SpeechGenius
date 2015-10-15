class CreateAnnotations < ActiveRecord::Migration
  def change
    create_table :annotations do |t|
      t.text :content, null: false
      t.integer :user_id, null: false
      t.integer :speech_id, null: false
      t.string :image_url

      t.timestamps null: false
    end
    add_index :annotations, :user_id
    add_index :annotations, :speech_id
  end
end
