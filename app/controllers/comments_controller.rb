class CommentsController < ApplicationController
  before_action :find_note

  def create
    @comment = @note.comments.new(comment_params)
    @comment.user = current_user

    if @comment.save
      redirect_to note_path(@note), notice: 'コメントを投稿しました'
    else
      # show に必要なデータを再セット
      @comments = @note.comments.includes(:user)
      @book = @note.book

      render 'notes/show', status: :unprocessable_entity
    end
  end

  def destroy
    @comment = @note.comments.find(params[:id])
    @comment.destroy

    redirect_back(
      fallback_location: note_path(@note),
      notice: 'コメントを削除しました'
    )
  end

  # private
  private

  def find_note
    @note = Note.find(params[:note_id])
  end

  def comment_params
    params.require(:comment).permit(:body)
  end
end
