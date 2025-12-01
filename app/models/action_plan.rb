class ActionPlan < ApplicationRecord
  # リレーション
  belongs_to :note

  # バリデーション
  validates :detail, presence: true,
                     length: { maximum: 30 }
end
