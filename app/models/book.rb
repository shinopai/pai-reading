class Book < ApplicationRecord
  # リレーション
  belongs_to :user
  has_many :book_authors, dependent: :destroy
  has_many :authors, through: :book_authors
  has_many :notes, dependent: :destroy

  # statusカラムを定義
  enum :status, { 'これから読む': 0, '今読んでいる': 1, '読み終わった': 2 }

  # バリデーション
  with_options presence: true do
  validates :title
  validates :image_link
  validates :info_link
  validates :systemid
  validates :status, numericality: { only_integer: true }
  end

end
