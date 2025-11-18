class RenamePublishdDateColumnToBooks < ActiveRecord::Migration[8.1]
  def change
    rename_column :books, :publishd_date, :published_date
  end
end
