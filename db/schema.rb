# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.1].define(version: 2025_12_18_000227) do
  create_table "action_plans", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.text "detail", default: "", null: false
    t.integer "note_id", null: false
    t.datetime "updated_at", null: false
    t.index ["note_id"], name: "index_action_plans_on_note_id"
  end

  create_table "authors", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "name", default: "", null: false
    t.datetime "updated_at", null: false
  end

  create_table "book_authors", force: :cascade do |t|
    t.integer "author_id", null: false
    t.integer "book_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["author_id"], name: "index_book_authors_on_author_id"
    t.index ["book_id"], name: "index_book_authors_on_book_id"
  end

  create_table "books", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.text "image_link", default: "", null: false
    t.text "info_link", default: "", null: false
    t.string "published_date", default: ""
    t.integer "status", default: 0
    t.string "systemid", default: "", null: false
    t.string "title", default: "", null: false
    t.datetime "updated_at", null: false
    t.integer "user_id", null: false
    t.index ["user_id"], name: "index_books_on_user_id"
  end

  create_table "comments", force: :cascade do |t|
    t.text "body", null: false
    t.datetime "created_at", null: false
    t.integer "note_id", null: false
    t.datetime "updated_at", null: false
    t.integer "user_id", null: false
    t.index ["note_id"], name: "index_comments_on_note_id"
    t.index ["user_id"], name: "index_comments_on_user_id"
  end

  create_table "likes", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.integer "note_id", null: false
    t.datetime "updated_at", null: false
    t.integer "user_id", null: false
    t.index ["note_id"], name: "index_likes_on_note_id"
    t.index ["user_id", "note_id"], name: "index_likes_on_user_id_and_note_id", unique: true
    t.index ["user_id"], name: "index_likes_on_user_id"
  end

  create_table "notes", force: :cascade do |t|
    t.integer "book_id", null: false
    t.datetime "created_at", null: false
    t.text "impression", default: "", null: false
    t.text "memo", default: "", null: false
    t.text "purpose", default: "", null: false
    t.datetime "updated_at", null: false
    t.index ["book_id"], name: "index_notes_on_book_id"
  end

  create_table "points", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.text "description", default: "", null: false
    t.integer "note_id", null: false
    t.string "title", default: "", null: false
    t.datetime "updated_at", null: false
    t.index ["note_id"], name: "index_points_on_note_id"
  end

  create_table "users", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "name", default: "", null: false
    t.datetime "remember_created_at"
    t.datetime "reset_password_sent_at"
    t.string "reset_password_token"
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["name"], name: "index_users_on_name", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "action_plans", "notes"
  add_foreign_key "book_authors", "authors"
  add_foreign_key "book_authors", "books"
  add_foreign_key "books", "users"
  add_foreign_key "comments", "notes"
  add_foreign_key "comments", "users"
  add_foreign_key "likes", "notes"
  add_foreign_key "likes", "users"
  add_foreign_key "notes", "books"
  add_foreign_key "points", "notes"
end
