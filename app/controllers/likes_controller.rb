class LikesController < ApplicationController
  before_action :authenticate_user!
  before_action :find_note

  def create
    current_user.likes.create!(note: @note)

    redirect_back(
      fallback_location: note_path(@note),
      notice: 'いいねしました'
    )
  end

  def destroy
    current_user.likes.find_by!(note: @note).destroy

    redirect_back(
      fallback_location: note_path(@note),
      notice: 'いいねを解除しました'
    )
  end

  # private
  private

  def find_note
    @note = Note.find(params[:note_id])
  end
end
