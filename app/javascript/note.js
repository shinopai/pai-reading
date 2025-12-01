// 本のポイントの各要素を取得
const pointList = document.getElementById("xPointList");
const firstElement = pointList.firstElementChild;
const pointAddButton = document.getElementById("xPointAddButton");

// DOMParserを初期化
const parser = new DOMParser();

// domを生成
const dom = parser.parseFromString(firstElement.outerHTML, "text/html");

// 要素を削除するメソッド
function removeElement(elem) {
  elem.remove();
}

// 本のポイントフォーム追加
pointAddButton.addEventListener("click", function () {
  if (document.getElementsByClassName("note-new__list-item point").length < 5) {
    let addElement = dom.body.firstChild.cloneNode(true);
    pointList.append(addElement);
  } else {
    if (document.getElementById("xPointErrorMessage") == null) {
      let errorMessage = document.createElement("p");
      errorMessage.textContent = "本のポイントは5つまで追加できます";
      errorMessage.setAttribute("class", "note-new__error-message");
      errorMessage.setAttribute("id", "xPointErrorMessage");
      this.before(errorMessage);
    } else {
      removeElement(document.getElementById("xPointErrorMessage"));
    }
  }
});

// 本のポイントフォーム削除
window.removePointListItem = function (element) {
  if (
    document.getElementsByClassName("note-new__list-item point").length <= 1
  ) {
    alert("本のポイントは最低1つ必要です");
  } else {
    if (document.getElementById("xPointErrorMessage") != null) {
      removeElement(document.getElementById("xPointErrorMessage"));
    }
    removeElement(element.closest(".note-new__list-item.point"));
  }
};

// アクションプランの各要素を取得
const actionList = document.getElementById("xActionList");
const firstActionElement = actionList.firstElementChild;
const actionAddButton = document.getElementById("xActionAddButton");

// domを生成
const dom2 = parser.parseFromString(firstActionElement.outerHTML, "text/html");

// アクションプランフォーム追加
actionAddButton.addEventListener("click", function () {
  if (
    document.getElementsByClassName("note-new__list-item action-plan").length <
    5
  ) {
    let addElement = dom2.body.firstChild.cloneNode(true);
    actionList.append(addElement);
  } else {
    if (document.getElementById("xActionErrorMessage") == null) {
      let errorMessage = document.createElement("p");
      errorMessage.textContent = "アクションプランは5つまで追加できます";
      errorMessage.setAttribute("class", "note-new__error-message");
      errorMessage.setAttribute("id", "xActionErrorMessage");
      this.before(errorMessage);
    } else {
      removeElement(document.getElementById("xActionErrorMessage"));
    }
  }
});

// アクションプランフォーム削除
window.removeActionListItem = function (element) {
  if (
    document.getElementsByClassName("note-new__list-item action-plan").length <=
    1
  ) {
    alert("アクションプランは最低1つ必要です");
  } else {
    if (document.getElementById("xActionErrorMessage") != null) {
      removeElement(document.getElementById("xActionErrorMessage"));
    }
    removeElement(element.closest(".note-new__list-item.action-plan"));
  }
};
