import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  showDialog() {
    this.element.nextElementSibling.showModal();
  }

  closeDialog() {
    this.element.closest("dialog").close();
  }

  static targets = ["tab", "list"];

  switch(event) {
    const scrollY = window.scrollY;
    const id = event.currentTarget.dataset.id;

    // tab の active 切り替え
    this.tabTargets.forEach((tab) =>
      tab.classList.toggle("active", tab === event.currentTarget)
    );

    // list の active 切り替え
    this.listTargets.forEach((list) =>
      list.classList.toggle("active", list.id === `xList${id}`)
    );

    window.scrollTo(0, scrollY);
  }
}
