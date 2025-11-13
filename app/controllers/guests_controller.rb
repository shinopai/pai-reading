class GuestsController < ApplicationController
  def guest_sign_in
  guest = User.find_or_create_by!(email: 'guest@example.com') do |user|
    user.name = 'ゲスト'
    user.password = SecureRandom.urlsafe_base64
    # guest.skip_confirmation!  # Confirmable を使用している場合は必要
    # 例えば name を入力必須としているならば， guest.name = "ゲスト" なども必要
  end
    sign_in(guest)
    redirect_to root_path, notice: 'ゲストユーザーとしてログインしました。'
  end
end
