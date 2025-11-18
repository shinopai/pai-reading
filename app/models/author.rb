class Author < ApplicationRecord
  # リレーション
  has_many :book_authors
  has_many :books, through: :book_authors

  # バリデーション
  validates :name, presence: true
end
