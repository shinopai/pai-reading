class CreateNotes < ActiveRecord::Migration[8.1]
  def change
    create_table :notes do |t|
      t.text :purpose, null: false, default: ""
      t.text :impression, null: false, default: ""
      t.text :memo, null: false, default: ""
      t.references :book, null: false, foreign_key: true

      t.timestamps
    end
  end
end
