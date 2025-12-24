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
