class Note < ApplicationRecord
  # リレーション
  has_many :points, dependent: :destroy
  accepts_nested_attributes_for :points, allow_destroy: true
  validates_associated :points
  has_many :action_plans, dependent: :destroy
  accepts_nested_attributes_for :action_plans, allow_destroy: true
  validates_associated :action_plans

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

    # 子モデルのバリデーション
    # validates :points, presence: true
    # validates :action_plans, presence: true
    # validate :merge_point_errors
    # validate :merge_action_plan_errors
    # validates :points
    # validates :action_plans

    # 子モデルのバリデーションエラーが発生した場合は親モデルに統合する
    # 本のポイント
    # def merge_point_errors
    #   points.each do |point|
    #     unless point.valid?
    #       point.errors.each do |error|
    #         # 親のerrorsオブジェクトに子のエラーメッセージを追加する
    #         # attributes: false を使用して :base にエラーを追加することも可能
    #         errors.add(error.attribute, error.message)
    #       end
    #     end
    #   end
    # end

    # アクションプラン
    # def merge_action_plan_errors
    #   action_plans.each do |action_plan|
    #     unless action_plan.valid?
    #       action_plan.errors.each do |error|
    #         # 親のerrorsオブジェクトに子のエラーメッセージを追加する
    #         # attributes: false を使用して :base にエラーを追加することも可能
    #         errors.add(error.attribute, error.message)
    #       end
    #     end
    #   end
    # end
end
