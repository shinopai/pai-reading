class CreateBooks < ActiveRecord::Migration[8.1]
  def change
    create_table :books do |t|
      t.string :title, null: false, default: ""
      t.text :image_link, null: false, default: ""
      t.text :info_link, null: false, default: ""
      t.string :systemid, null: false, default: ""
      t.string :publishd_date, null: false, default: ""
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
