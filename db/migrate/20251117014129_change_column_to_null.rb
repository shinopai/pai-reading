class ChangeColumnToNull < ActiveRecord::Migration[8.1]
  def up
    change_column_null :books, :published_date, true
  end

  def down
    change_column_null :books, :published_date, false
  end
end
