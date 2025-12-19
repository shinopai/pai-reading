class Comment < ApplicationRecord
  # リレーション
  belongs_to :user
  belongs_to :note

  # バリデーション
  validates :body, presence: true,
                   length: { maximum: 300 }
end
