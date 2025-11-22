class MypagesController < ApplicationController
  before_action :authenticate_user!, only: [:index]

  def index
    @user = current_user

    # ユーザーに紐づいている書籍を全て取得
    @books = @user.books

    # ユーザーに紐づいている書籍の内、ステータスが「これから読む」のものを取得
    @books_now = @user.books.where(status: 0)

    # ユーザーに紐づいている書籍の内、ステータスが「今読んでいる」のものを取得
    @books_reading = @user.books.where(status: 1)

    # ユーザーに紐づいている書籍の内、ステータスが「読み終わった」のものを取得
    @books_finished = @user.books.where(status: 2)

    render :index
  end
end
