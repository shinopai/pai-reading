// 書籍リストの表示をステータスによって切り替える
const tabs = document.getElementsByClassName("mypage__tab");
const bookLists = document.getElementsByClassName("mypage__list");

for (let i = 0; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function () {
    let scrollY = window.scrollY;

    Array.from(tabs).forEach(function (element) {
      element.classList.remove("active");
    });
    this.classList.add("active");

    Array.from(bookLists).forEach(function (element) {
      element.classList.remove("active");
    });

    document.getElementById("xList" + this.dataset.id).classList.add("active");
    window.scrollTo(0, scrollY);
  });
}

// ダイアログを開くボタン群を取得
const dialogButtons = document.getElementsByClassName("mypage__button--status");

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
    this.closest(".mypage__dialog").close();
  });
}
