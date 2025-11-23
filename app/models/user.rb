class User < ApplicationRecord
  # リレーション
  has_many :books, dependent: :destroy

  # nameのバリデーション
  validates :name, presence: true,
             length: { maximum: 30 },
             format: { with: /\A[a-zA-Z0-9\p{Hiragana}\p{Katakana}\p{Han}]+\z/, message: "に記号は使用できません" }

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

end
