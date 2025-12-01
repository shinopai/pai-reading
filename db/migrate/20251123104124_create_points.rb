class CreatePoints < ActiveRecord::Migration[8.1]
  def change
    create_table :points do |t|
      t.string :title, null: false, default: ""
      t.text :description, null: false, default: ""
      t.references :note, null: false, foreign_key: true

      t.timestamps
    end
  end
end
