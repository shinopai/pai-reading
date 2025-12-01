class Point < ApplicationRecord
  # リレーション
  belongs_to :note

  # バリデーション
    with_options presence: true do
      validates :title, length: { maximum: 50 }
      validates :description, length: { maximum: 300 }
    end
end
