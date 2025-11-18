class BookAuthor < ApplicationRecord
  # リレーション
  belongs_to :book
  belongs_to :author
end
