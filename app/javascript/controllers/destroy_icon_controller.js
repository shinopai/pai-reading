import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  show() {
    const dialog = document.getElementById("xDialog");
    if (dialog) {
      dialog.showModal();
    }
  }

  close() {
    const dialog = document.getElementById("xDialog");
    if (dialog) {
      dialog.close();
    }
  }
}
