import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  showDialog() {
    this.element.nextElementSibling.showModal();
  }

  closeDialog() {
    this.element.closest("dialog").close();
  }

  destroy(e) {
    e.preventDefault();

    const destroyForm = document.getElementById("xDestroyForm");
    if (destroyForm && confirm("本当に削除してよろしいですか？")) {
      destroyForm.submit();
    }
  }
}
