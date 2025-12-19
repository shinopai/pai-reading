import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  create() {
    const likeForm = document.getElementById("xLikeForm");
    if (likeForm) {
      likeForm.submit();
    }
  }

  destroy() {
    const destroyLikeForm = document.getElementById("xDestroyLikeForm");
    if (destroyLikeForm) {
      destroyLikeForm.submit();
    }
  }
}
