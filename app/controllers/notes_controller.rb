class NotesController < ApplicationController
  before_action :authenticate_user!, only: [:new]
  before_action :find_book, only: [:new, :create, :show, :edit, :update]
  before_action :find_note, only: [:show, :destroy, :edit, :update]
  before_action :get_point_ids, only: [:edit, :update]
  before_action :get_action_plan_ids, only: [:edit, :update]

  def new
    @note = @book.notes.build
    @point = @note.points.build
    @action_plan = @note.action_plans.build

    render :new
  end

  def create
    success = true
    points = note_params[:points_attributes]['0']
    action_plans = note_params[:action_plans_attributes]['0']

    ActiveRecord::Base.transaction do

      # 書籍に紐づいたノート情報を保存
      @note = @book.notes.build(
        purpose: note_params[:purpose],
        impression: note_params[:impression],
        memo: note_params[:memo]
      )
      success &= @note.save

      # 作成されたノートに紐づいたポイントとアクションプランの情報を保存

      # 直前にノートが作成された場合
      if success
      points['title'].size.times do |i|
        @point = @note.points.build(
          title: points['title'][i],
          description: points['description'][i]
        )
        success &= @point.save
      end

      action_plans['detail'].size.times do |i|
        @action_plan = @note.action_plans.build(
          detail: action_plans['detail'][i]
        )
        success &= @action_plan.save
      end
    else # 直前にノートが作成されなかった場合
      max_id = Note.maximum(:id)

      temporary_id = max_id.nil? ? 1 : max_id

      points['title'].size.times do |i|
        @point = Point.new(
          note_id: temporary_id,
          title: points['title'][i],
          description: points['description'][i]
        )
        success &= @point.save
      end

      action_plans['detail'].size.times do |i|
        @action_plan = ActionPlan.new(
          note_id: temporary_id,
          detail: action_plans['detail'][i]
        )
        success &= @action_plan.save
      end

    end

      if success
        redirect_to book_path(@book), notice: 'ノートを作成しました'
      else
        render :new, status: :unprocessable_entity
        raise ActiveRecord::Rollback
      end

    end

  end

  def show
    @comments = @note.comments.includes(:user)
    @comment  = Comment.new

    render :show
  end

  def edit
    render :edit
  end

  def destroy
    if @note.destroy
      redirect_to root_path
    else
      flash.now[:alert] = 'ノートが削除出来ませんでした'
      return
    end
  end

  def update
    logger.info('params中身')
    logger.debug(note_update_params)
    @note.assign_attributes(note_update_params)

    if @note.valid?
      @note.save
      redirect_to book_path(@book), notice: 'ノートを更新しました'
    else
      render :edit, status: :unprocessable_entity
    end
  end

  # private
  private
  def note_params
    params.require(:note).permit(:purpose, :impression, :memo, points_attributes: [:note_id, title: [], description: []], action_plans_attributes: [:note_id, detail: []])
  end

  def note_update_params
    params.require(:note).permit(:purpose, :impression, :memo, points_attributes: [:id, :note_id, :title, :description, :_destroy], action_plans_attributes: [:id, :note_id, :detail, :_destroy])
  end

  def find_book
    @book = Book.find(params[:book_id])
  end

  def find_note
    @note = Note.find(params[:id])
  end

  def get_point_ids
    @point_ids = @note.points.pluck(:id)
  end

  def get_action_plan_ids
    @action_plan_ids = @note.action_plans.pluck(:id)
  end
end
