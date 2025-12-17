class Note < ApplicationRecord
  # リレーション
  has_many :points, dependent: :destroy
  accepts_nested_attributes_for :points, allow_destroy: true
  validates_associated :points
  has_many :action_plans, dependent: :destroy
  accepts_nested_attributes_for :action_plans, allow_destroy: true
  validates_associated :action_plans
  has_many :likes, dependent: :destroy
  has_many :liked_users, through: :likes, source: :user

  # バリデーション
    with_options presence: true do
      validates :purpose
      validates :impression
      validates :memo
    end

    with_options length: { maximum: 300 } do
      validates :purpose
      validates :impression
      validates :memo
    end
end
