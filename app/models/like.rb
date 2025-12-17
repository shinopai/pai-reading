class Like < ApplicationRecord
  # リレーション
  belongs_to :user
  belongs_to :note

  # バリデーション
  validates :user_id, uniqueness: { scope: :note_id }
end
