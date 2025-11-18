// ダイアログを開くボタン群を取得
let dialogButtons = document.getElementsByClassName("book-new__card-button");

// 各ボタンをクリックした時の挙動
for (let i = 0; i < dialogButtons.length; i++) {
  dialogButtons[i].addEventListener("click", function () {
    this.nextElementSibling.showModal();
  });
}

// ダイアログを閉じるボタン群を取得
let cancelButtons = document.getElementsByClassName("cancel");

// 各ボタンをクリックした時の挙動
for (let i = 0; i < cancelButtons.length; i++) {
  cancelButtons[i].addEventListener("click", function () {
    this.closest(".book-new__dialog").close();
  });
}
