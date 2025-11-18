class MypagesController < ApplicationController
  before_action :authenticate_user!, only: [:index]

  def index
    @user = current_user

    render :index
  end
end
