import User from "./Users.js";
import { fetchStorage } from "./utils.js";

User.render();

$(".navbar").on("click", "img, button", (e) => {
  e.preventDefault();
  let changeViewTextBtn = $(".change-view-btn");

  if (
    $(e.target).is(".table-view-btn") ||
    $(e.target).hasClass("table-view-text-btn")
  ) {
    changeViewTextBtn
      .text("Card view")
      .removeClass("table-view-text-btn")
      .addClass("card-view-text-btn");

    User.setView("table");
    $(".card-view-btn").removeClass("active-view");
    $(".table-view-btn").addClass("active-view");
    return;
  }

  if (
    $(e.target).is(".card-view-btn") ||
    $(e.target).hasClass("card-view-text-btn")
  ) {
    changeViewTextBtn
      .text("Table view")
      .removeClass("card-view-text-btn")
      .addClass("table-view-text-btn");

    User.setView("card");
    $(".table-view-btn").removeClass("active-view");
    $(".card-view-btn").addClass("active-view");
    return;
  }

  if ($(e.target).is(".table-order-btn, .sort-btn")) {
    User.setSort($(".table-order-btn").toggleClass("sortDesc"));

    let sortBtnHtml = $(".table-order-btn").hasClass("sortDesc")
      ? `Sort &#8595;`
      : `Sort &#8593;`;
    $(".sort-btn").html(sortBtnHtml);
  }
});

$(".modal").on("click", "button", (e) => {
  e.preventDefault();
  if ($(e.target).is(".modal-save")) {
    let isValid = User.addUser();
    if (isValid) location.reload();
  }
});

// Trigger search when the input changes
$("#searchBy").on("input", User.search);

// Trigger search when the checkbox state changes
$("#checkbox-mail").on("change", User.search);

User.renderLastAccessedUsers(fetchStorage("lastThreeUsers"));
