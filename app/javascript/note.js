// =====================
// 定数
// =====================
const LIMIT_VALUE = 5; // 各フォームの最大追加可能数
const NOTE_POINT_PARAM = "note[points_attributes]";
const NOTE_ACTION_PLAN_PARAM = "note[action_plans_attributes]";
const POINT_IDS =
  document.getElementById("xPointIds")?.value.trim().split(/\s+/) ?? []; // 既存のidを配列にまとめる
const POINT_IDS_LENGTH = POINT_IDS.length; // その配列の要素数
const ACTION_PLAN_IDS =
  document.getElementById("xActionPlanIds")?.value.trim().split(/\s+/) ?? []; // 既存のidを配列にまとめる
const ACTION_PLAN_IDS_LENGTH = ACTION_PLAN_IDS.length; // その配列の要素数

// =====================
// 変数
// =====================
const pointList = document.getElementById("xPointList"); // ポイントリスト
let pointListCount = pointList.querySelectorAll("li").length; // ポイントリスト数
const pointAddButton = document.getElementById("xPointAddButton"); // ポイント追加ボタン
const actionList = document.getElementById("xActionList"); // アクションプランリスト
let actionListCount = actionList.querySelectorAll("li").length; // ポイントリスト数
const actionAddButton = document.getElementById("xActionAddButton"); // アクションプラン追加ボタン

// =====================
// ユーティリティ
// =====================
function removeElement(elem) {
  elem?.remove();
}

// 要素の一括削除
function removeAll(selector, parent = document) {
  parent.querySelectorAll(selector).forEach((elem) => removeElement(elem));
}

// hiddenフィールドを作成
function createHiddenFields({ list, length, ids, paramName }) {
  // 既存削除
  removeAll(":scope > input[name*='[_destroy]']", list);
  removeAll(":scope > input[name*='[id]']", list);

  if (ids.length == 0 || length >= ids.length) return;

  for (let i = 0; i < ids.length - length; i++) {
    const index = i + length;

    const destroyHidden = document.createElement("input");
    Object.entries({
      type: "hidden",
      name: `${paramName}[${index}][_destroy]`,
      id: `${paramName}_${index}_destroy`,
      value: 1,
    }).forEach(([k, v]) => destroyHidden.setAttribute(k, v));

    const idHidden = document.createElement("input");
    Object.entries({
      type: "hidden",
      name: `${paramName}[${index}][id]`,
      id: `${paramName}_${index}_id`,
      value: ids.at(-(i + 1)),
    }).forEach(([k, v]) => idHidden.setAttribute(k, v));

    list.prepend(idHidden, destroyHidden);
  }
}

// =====================
// render時に各リストの要素数を再取得
// =====================
document.addEventListener("turbo:render", () => {
  pointListCount = pointList.querySelectorAll("li").length; // ポイントリスト数
  actionListCount = actionList.querySelectorAll("li").length; // アクションプランリスト数
});

// =====================
// ポイントフォームロジック
// =====================

// ポイントフォーム追加
pointAddButton.addEventListener("click", function () {
  if (pointListCount != LIMIT_VALUE) {
    let addElement = pointList.querySelector("li:last-of-type").cloneNode(true);

    addElement.querySelectorAll("input[type='hidden']").forEach((input) => {
      input.value =
        input.value >= POINT_IDS[POINT_IDS_LENGTH - 1] || input.value === ""
          ? ""
          : Number(input.value) + 1;
      input.name = `${NOTE_POINT_PARAM}[${pointListCount}][id]`;
      input.setAttribute("id", `${NOTE_POINT_PARAM}_${pointListCount}_id`);
    });
    addElement.querySelectorAll("input[type='text']").forEach((input) => {
      input.value = "";
      input.name = `${NOTE_POINT_PARAM}[${pointListCount}][detail]`;
    });
    addElement.querySelectorAll("textarea").forEach((input) => {
      input.value = "";
      input.name = `${NOTE_POINT_PARAM}[${pointListCount}][description]`;
    });

    pointList.append(addElement);
    pointListCount++;

    createHiddenFields({
      list: pointList,
      length: pointListCount,
      ids: POINT_IDS,
      paramName: NOTE_POINT_PARAM,
    });
  } else {
    if (document.getElementById("xActionErrorMessage") == null) {
      let errorMessage = document.createElement("p");
      errorMessage.textContent =
        "ポイントは" + LIMIT_VALUE + "つまで追加できます";
      errorMessage.setAttribute("class", "note-update__error-message");
      errorMessage.setAttribute("id", "xActionErrorMessage");
      this.before(errorMessage);
    } else {
      removeElement(document.getElementById("xActionErrorMessage"));
    }
  }
});

// ポイントフォーム削除
window.removePointListItem = function (element) {
  if (pointListCount === 1) {
    alert("アクションプランは最低1つ必要です");
  } else {
    if (document.getElementById("xActionErrorMessage") != null) {
      removeElement(document.getElementById("xActionErrorMessage"));
    }

    removeElement(element.closest("li"));
    pointListCount--;

    let pointItems = pointList.querySelectorAll("li");

    for (let i = 0; i < pointListCount; i++) {
      let inputHidden = pointItems[i].querySelector("input[type='hidden']");
      let inputText = pointItems[i].querySelector("input[type='text'");
      let inputTextarea = pointItems[i].querySelector("textarea");

      if (i < POINT_IDS_LENGTH) {
        inputHidden.value = POINT_IDS[i];
      } else {
        inputHidden.value = "";
      }

      inputHidden.name = `${NOTE_POINT_PARAM}[${i}][id]`;
      inputHidden.setAttribute("id", `${NOTE_POINT_PARAM}_${i}_id`);

      inputText.name = `${NOTE_POINT_PARAM}[${i}][detail]`;
      inputTextarea.name = `${NOTE_POINT_PARAM}[${i}][description]`;
    }

    createHiddenFields({
      list: pointList,
      length: pointListCount,
      ids: POINT_IDS,
      paramName: NOTE_POINT_PARAM,
    });
  }
};

// =====================
// アクションプランフォームロジック
// =====================

// アクションプランフォーム追加
actionAddButton.addEventListener("click", function () {
  if (actionListCount != LIMIT_VALUE) {
    let addElement = actionList
      .querySelector("li:last-of-type")
      .cloneNode(true);

    addElement.querySelectorAll("input[type='hidden']").forEach((input) => {
      input.value =
        input.value >= ACTION_PLAN_IDS[ACTION_PLAN_IDS_LENGTH - 1] ||
        input.value === ""
          ? ""
          : Number(input.value) + 1;
      input.name = `${NOTE_ACTION_PLAN_PARAM}[${actionListCount}][id]`;
      input.setAttribute(
        "id",
        `${NOTE_ACTION_PLAN_PARAM}_${actionListCount}_id`
      );
    });
    addElement.querySelectorAll("input[type='text']").forEach((input) => {
      input.value = "";
      input.name = `${NOTE_ACTION_PLAN_PARAM}[${actionListCount}][detail]`;
    });

    actionList.append(addElement);
    actionListCount++;

    createHiddenFields({
      list: actionList,
      length: actionListCount,
      ids: ACTION_PLAN_IDS,
      paramName: NOTE_ACTION_PLAN_PARAM,
    });
  } else {
    if (document.getElementById("xActionErrorMessage") == null) {
      let errorMessage = document.createElement("p");
      errorMessage.textContent =
        "アクションプランは" + LIMIT_VALUE + "つまで追加できます";
      errorMessage.setAttribute("class", "note-update__error-message");
      errorMessage.setAttribute("id", "xActionErrorMessage");
      this.before(errorMessage);
    } else {
      removeElement(document.getElementById("xActionErrorMessage"));
    }
  }
});

// アクションプランフォーム削除
window.removeActionListItem = function (element) {
  if (actionListCount === 1) {
    alert("アクションプランは最低1つ必要です");
  } else {
    if (document.getElementById("xActionErrorMessage") != null) {
      removeElement(document.getElementById("xActionErrorMessage"));
    }

    removeElement(element.closest("li"));
    actionListCount--;

    let actionItems = actionList.querySelectorAll("li");

    for (let i = 0; i < actionListCount; i++) {
      let inputHidden = actionItems[i].querySelector("input[type='hidden']");
      let inputText = actionItems[i].querySelector("input[type='text'");

      if (i < ACTION_PLAN_IDS_LENGTH) {
        inputHidden.value = ACTION_PLAN_IDS[i];
      } else {
        inputHidden.value = "";
      }

      inputHidden.name = `${NOTE_ACTION_PLAN_PARAM}[${i}][id]`;
      inputHidden.setAttribute("id", `${NOTE_ACTION_PLAN_PARAM}_${i}_id`);

      inputText.name = `${NOTE_ACTION_PLAN_PARAM}[${i}][detail]`;
    }

    createHiddenFields({
      list: actionList,
      length: actionListCount,
      ids: ACTION_PLAN_IDS,
      paramName: NOTE_ACTION_PLAN_PARAM,
    });
  }
};
