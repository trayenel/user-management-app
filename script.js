import { fetchStorage, getData, saveStorage, users } from "./utils.js";

//Get DOM container
const $container = $(".user-container");

//Render table dynamically using the users array.
function renderTable() {
  //Add table element to container.

  $container.html(`
    <table class="table table-striped shadow mt-1">
        <thead class="visible@l">
        <tr>
            <td>
                #
            </td>
            <td>Name</td>
            <td>Email Address</td>
            <td></td>
        </tr>
        </thead>
    </table>`);

  const table = $(".table");

  const tableBody = $("<tbody></tbody>");

  //Create rows for each user
  users.forEach((user, i) => {
    const tableRow = $(`
            <tr>
                <th class="d-none d-sm-table-cell">${i + 1}</th>
                <td>${user.first_name} ${user.last_name}</td>
                <td>${user.email}</td>
                <td class="d-none d-sm-table-cell">
                    <a class="btn btn-primary btn-sm" href="user.html?userId=${user.id}" role="button">Show info</a>
                </td>
            </tr>
        `);

    tableBody.append(tableRow);
  });

  table.append(tableBody);
}

renderTable();

$(".user-control").on("click", "img, button", (e) => {
  e.preventDefault();
  if ($(e.target).is(".table-view-btn")) {
    return;
  }

  if ($(e.target).is(".card-view-btn")) {
    return;
  }

  if ($(e.target).is(".table-order-btn")) {
    $(".table-order-btn").toggleClass("sortDesc");
    return;
  }

  if ($(e.target).is(".modal-save")) {
    const form = $("#form").get(0);
    const submitter = $(".modal-save").get(0);

    const formData = new FormData(form, submitter);

    if (users.find((user) => user.email === formData.get("email"))) {
      e.preventDefault();
      console.log("duplicate email");
      return;
    }

    const userId = users.reduce((acc, curr) => {
      return acc > curr.id ? acc : curr.id;
    }, 0);

    const newUser = { id: userId + 1 };

    formData.forEach((value, key) => {
      newUser[key] = value;
    });

    users.push(newUser);

    saveStorage("users", users);
  }
});
