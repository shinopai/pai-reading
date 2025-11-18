require 'json'

class BooksController < ApplicationController
  before_action :authenticate_user!, only: [:create]

  def index
    render :index
  end

  def keyword
    if params[:q].nil? || params[:q].blank?
      flash.now[:alert] = '検索キーワードが入力されていません'
      return
    else
      url = "https://www.googleapis.com/books/v1/volumes"
      keyword = params[:q]
      res = Faraday.get(url, q: keyword, langRestrict: 'ja', maxResults: 10)
      result = JSON.parse(res.body)

      result.each_with_index do |value, index|
        next if index == 0 || index == 1
        @books = result['items']
      end

      @book = Book.new

      render :new
    end
  end

  def create
    user = current_user

    Book.transaction do

      # ユーザーに関連付いた書籍情報を保存
      book = user.books.build(
        title: book_params[:title],
        image_link: book_params[:image_link],
        info_link: book_params[:info_link],
        systemid: book_params[:systemid],
        published_date: book_params[:published_date],
        status: book_params[:status].to_i
    )
    book.save

    # 著者情報をテーブルに保存し、中間テーブルにも書籍と関連付けて保存
    authors = JSON.parse(params[:authors])

    authors.each do |author_name|
      author = Author.find_or_initialize_by(name: author_name)

      if author.name.nil?
        author.name = author_name
        author.save
      else
        author.update(name: author_name)
      end

      book.authors << author
    end

    end

    redirect_to mypages_path
  end

  # private
  private
  def book_params
    params.require(:book).permit(:title, :image_link, :info_link, :systemid, :published_date, :status)
  end
end
