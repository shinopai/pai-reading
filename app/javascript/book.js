// ダイアログを開くボタン群を取得
const dialogButtons = document.getElementsByClassName("book-new__card-button");

// 各ボタンをクリックした時の挙動
for (let i = 0; i < dialogButtons.length; i++) {
  dialogButtons[i].addEventListener("click", function () {
    this.nextElementSibling.showModal();
  });
}

// ダイアログを閉じるボタン群を取得
const cancelButtons = document.getElementsByClassName("cancel");

// 各ボタンをクリックした時の挙動
for (let i = 0; i < cancelButtons.length; i++) {
  cancelButtons[i].addEventListener("click", function () {
    this.closest(".book-new__dialog").close();
  });
}

// 書籍の登録を解除
const form = document.getElementById("xForm");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (confirm("本当に削除してよろしいですか？")) {
    this.submit();
  } else {
    return false;
  }
});
