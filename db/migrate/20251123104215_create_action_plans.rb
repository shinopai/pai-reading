class CreateActionPlans < ActiveRecord::Migration[8.1]
  def change
    create_table :action_plans do |t|
      t.text :detail, null: false, default: ""
      t.references :note, null: false, foreign_key: true

      t.timestamps
    end
  end
end
