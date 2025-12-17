// 各フォームの最大追加可能数
const limitValue = 5;

// 要素を削除するメソッド
function removeElement(elem) {
  elem.remove();
}

// ポイントの各要素を取得
const pointList = document.getElementById("xPointList");
const pointAddButton = document.getElementById("xPointAddButton");
const pointIds = document.getElementById("xPointIds").value.trim().split(/\s+/);

// ポイントのhiddenフィールドを生成
function createPointHidden(length) {
  let destroyHiddens = document.querySelectorAll(
    '#xPointList > input[type="hidden"][name*="[_destroy]"]'
  );

  let idHiddens = document.querySelectorAll(
    '#xPointList > input[type="hidden"][name*="[id]"]'
  );

  if (destroyHiddens.length > 0) {
    destroyHiddens.forEach((input) => {
      removeElement(input);
    });
  }
  if (idHiddens.length > 0) {
    idHiddens.forEach((input) => {
      removeElement(input);
    });
  }

  if (length >= pointIds.length) {
    return;
  }

  for (let index = 0; index < pointIds.length - length; index++) {
    let destroyHidden = document.createElement("input");
    destroyHidden.setAttribute("type", "hidden");
    destroyHidden.setAttribute(
      "name",
      "note[points_attributes][" + Number(index + length) + "][_destroy]"
    );
    destroyHidden.setAttribute(
      "id",
      "note_points_attributes_" + Number(index + length) + "_destroy"
    );
    destroyHidden.value = 1;

    let idHidden = document.createElement("input");
    idHidden.setAttribute("type", "hidden");
    idHidden.setAttribute(
      "name",
      "note[points_attributes][" + Number(index + length) + "][id]"
    );
    idHidden.setAttribute(
      "id",
      "note_points_attributes_" + Number(index + length) + "_id"
    );
    idHidden.value = pointIds.at("-" + (index + 1));

    pointList.append(idHidden, destroyHidden);
  }
}

// ポイントフォーム追加
pointAddButton.addEventListener("click", function () {
  let pointItems = pointList.querySelectorAll(
    "li.note-update__list-item.point"
  );
  if (pointItems.length < limitValue) {
    let lastPointItem = pointItems[pointItems.length - 1];
    let addElement = lastPointItem.cloneNode(true);

    addElement.querySelectorAll("input[type='hidden']").forEach((input) => {
      input.value =
        input.value >= pointIds[pointIds.length - 1] || !input.value
          ? ""
          : Number(input.value) + 1;
      input.name = "note[points_attributes][" + pointItems.length + "][id]";
      input.setAttribute(
        "id",
        "note_points_attributes_" + pointItems.length + "_id"
      );
    });
    addElement.querySelectorAll("input[type='text']").forEach((input) => {
      input.value = "";
      input.name = "note[points_attributes][" + pointItems.length + "][title]";
    });
    addElement.querySelectorAll("textarea").forEach((input) => {
      input.value = "";
      input.name =
        "note[points_attributes][" + pointItems.length + "][description]";
    });

    pointList.append(addElement);
    createPointHidden(pointItems.length);
  } else {
    if (document.getElementById("xPointErrorMessage") == null) {
      let errorMessage = document.createElement("p");
      errorMessage.textContent =
        "ポイントは" + limitValue + "つまで追加できます";
      errorMessage.setAttribute("class", "note-update__error-message");
      errorMessage.setAttribute("id", "xPointErrorMessage");
      this.before(errorMessage);
    } else {
      removeElement(document.getElementById("xPointErrorMessage"));
    }
  }
});

// ポイントフォーム削除
window.removePointListItem = function (element) {
  let pointItems = pointList.querySelectorAll(
    "li.note-update__list-item.point"
  );
  if (pointItems.length <= 1) {
    alert("ポイントは最低1つ必要です");
  } else {
    if (document.getElementById("xPointErrorMessage") != null) {
      removeElement(document.getElementById("xPointErrorMessage"));
    }
    removeElement(element.closest("li"));

    let pointItems = pointList.querySelectorAll(
      "li.note-update__list-item.point"
    );

    pointItems.forEach((li, index) => {
      let inputHidden = li.querySelector("input[type='hidden']");
      let inputText = li.querySelector("input[type='text']");
      let inputTextArea = li.querySelector("textarea");

      if (index + 1 <= pointIds.length) {
        inputHidden.value = pointIds[index];
      } else {
        inputHidden.value = "";
      }
      inputHidden.name = "note[points_attributes][" + index + "][id]";
      inputHidden.setAttribute("id", "note_points_attributes_" + index + "_id");

      inputText.name = "note[points_attributes][" + index + "][title]";
      inputTextArea.name =
        "note[points_attributes][" + index + "][description]";
    });

    createPointHidden(pointItems.length);
  }
};

// アクションプランの各要素を取得
const actionList = document.getElementById("xActionList");
const actionAddButton = document.getElementById("xActionAddButton");
const actionPlanIds = document
  .getElementById("xActionPlanIds")
  .value.trim()
  .split(/\s+/);

// アクションプランのhiddenフィールドを生成
function createActionHidden(length) {
  let destroyHiddens = document.querySelectorAll(
    '#xActionList > input[type="hidden"][name*="[_destroy]"]'
  );

  let idHiddens = document.querySelectorAll(
    '#xActionList > input[type="hidden"][name*="[id]"]'
  );

  if (destroyHiddens.length > 0) {
    destroyHiddens.forEach((input) => {
      removeElement(input);
    });
  }
  if (idHiddens.length > 0) {
    idHiddens.forEach((input) => {
      removeElement(input);
    });
  }

  if (length >= actionPlanIds.length) {
    return;
  }

  for (let index = 0; index < actionPlanIds.length - length; index++) {
    let destroyHidden = document.createElement("input");
    destroyHidden.setAttribute("type", "hidden");
    destroyHidden.setAttribute(
      "name",
      "note[action_plans_attributes][" + Number(index + length) + "][_destroy]"
    );
    destroyHidden.setAttribute(
      "id",
      "note_action_plans_attributes_" + Number(index + length) + "_destroy"
    );
    destroyHidden.value = 1;

    let idHidden = document.createElement("input");
    idHidden.setAttribute("type", "hidden");
    idHidden.setAttribute(
      "name",
      "note[action_plans_attributes][" + Number(index + length) + "][id]"
    );
    idHidden.setAttribute(
      "id",
      "note_action_plans_attributes_" + Number(index + length) + "_id"
    );
    idHidden.value = actionPlanIds.at("-" + (index + 1));

    actionList.append(idHidden, destroyHidden);
  }
}

// アクションプランフォーム追加
actionAddButton.addEventListener("click", function () {
  let actionItems = actionList.querySelectorAll(
    "li.note-update__list-item.action-plan"
  );
  if (actionItems.length < limitValue) {
    let lastActionItem = actionItems[actionItems.length - 1];
    let addElement = lastActionItem.cloneNode(true);

    addElement.querySelectorAll("input[type='hidden']").forEach((input) => {
      input.value =
        input.value >= actionPlanIds[actionPlanIds.length - 1] || !input.value
          ? ""
          : Number(input.value) + 1;
      input.name =
        "note[action_plans_attributes][" + actionItems.length + "][id]";
      input.setAttribute(
        "id",
        "note_action_plans_attributes_" + actionItems.length + "_id"
      );
    });
    addElement.querySelectorAll("input[type='text']").forEach((input) => {
      input.value = "";
      input.name =
        "note[action_plans_attributes][" + actionItems.length + "][detail]";
    });

    actionList.append(addElement);
    createActionHidden(actionItems.length);
  } else {
    if (document.getElementById("xActionErrorMessage") == null) {
      let errorMessage = document.createElement("p");
      errorMessage.textContent =
        "アクションプランは" + limitValue + "つまで追加できます";
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
  let actionItems = actionList.querySelectorAll(
    "li.note-update__list-item.action-plan"
  );
  if (actionItems.length <= 1) {
    alert("アクションプランは最低1つ必要です");
  } else {
    if (document.getElementById("xActionErrorMessage") != null) {
      removeElement(document.getElementById("xActionErrorMessage"));
    }
    removeElement(element.closest("li"));

    let actionItems = actionList.querySelectorAll(
      "li.note-update__list-item.action-plan"
    );

    actionItems.forEach((li, index) => {
      let inputHidden = li.querySelector("input[type='hidden'");
      let inputText = li.querySelector("input[type='text'");

      if (index + 1 <= actionPlanIds.length) {
        inputHidden.value = actionPlanIds[index];
      } else {
        inputHidden.value = "";
      }
      inputHidden.name = "note[action_plans_attributes][" + index + "][id]";
      inputHidden.setAttribute(
        "id",
        "note_action_plans_attributes_" + index + "_id"
      );

      inputText.name = "note[action_plans_attributes][" + index + "][detail]";
    });

    createActionHidden(actionItems.length);
  }
};
