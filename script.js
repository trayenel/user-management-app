import User from "./Users.js";

User.render();

$(".navbar").on("click", "img, button", (e) => {
  e.preventDefault();
  if ($(e.target).is(".table-view-btn")) {
    User.setView("table");
    $(".card-view-btn").removeClass("active-view");
    $(".table-view-btn").addClass("active-view");
    return;
  }

  if ($(e.target).is(".card-view-btn")) {
    User.setView("card");
    $(".table-view-btn").removeClass("active-view");
    $(".card-view-btn").addClass("active-view");
    return;
  }

  if ($(e.target).is(".table-order-btn") || $(e.target).is(".sort-btn")) {
    User.setSort($(".table-order-btn").toggleClass("sortDesc"));

    let sortBtnHtml = $(".table-order-btn").hasClass("sortDesc")
      ? `Sort &#8593;`
      : `Sort &#8595;`;
    $(".sort-btn").html(sortBtnHtml);
  }
});

$(".modal").on("click", "button", (e) => {
  e.preventDefault();
  if ($(e.target).is(".modal-save")) {
    User.addUser();
    location.reload();
  }
});

// Trigger search when the input changes
$("#searchBy").on("input", User.search);

// Trigger search when the checkbox state changes
$("#checkbox-mail").on("change", User.search);
