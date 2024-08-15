import { defaultPicLink, saveStorage, users } from "./utils.js";

class Users {
  constructor(users = [], container) {
    this.users = users;
    this.view = "table";
    this.sortDesc = false;
    this.container = container;
  }

  addUser() {
    const form = $("#form").get(0);
    const submitter = $(".modal-save").get(0);

    const formData = new FormData(form, submitter);

    if (
      this.users.find((user) => user.email === formData.get("email").trim())
    ) {
      $(".");
      return;
    }

    const userId = this.users.reduce((acc, curr) => {
      return acc > curr.id ? acc : curr.id;
    }, 0);

    const newUser = { id: userId + 1 };

    formData.forEach((value, key) => {
      newUser[key] = value.trim();
    });

    this.users.push(newUser);

    saveStorage("users", this.users);
  }

  setSort(bool) {
    if (this.sortDesc === bool) return;
    this.sortDesc = bool;
    this.render();
    $("#searchBy").val("");
  }

  setView(view) {
    if (this.view === view) return;
    this.view = view;
    this.render();
    $("#searchBy").val("");
  }

  renderTable() {
    //Add table element to container.
    this.container.html(`
    <table class="table table-striped shadow mt-2">
        <thead class="visible@l">
        <tr>
            <td>
                #
            </td>
            <td></td>
            <td>Name</td>
            <td>Email Address</td>
            <td></td>
        </tr>
        </thead>
    </table>`);

    const table = $(".table");

    const tableBody = $("<tbody></tbody>");

    //Check if sort desc is activated
    let sortedUsers = $(".table-order-btn").hasClass("sortDesc")
      ? users.toReversed()
      : users;

    //Create rows for each user
    sortedUsers.forEach((user, i) => {
      const tableRow = $(`
            <tr class="secondary-table-row">
                <th class="d-none d-sm-table-cell">${i + 1}</th>
                <td>   <img src="${user.picture ? user.picture : defaultPicLink}" class="user-profile-pic small visible@l" alt="..."></td>
                <td class="td-name">${user.first_name} ${user.last_name}</td>
                <td class="td-email">${user.email}</td>
                <td class="d-none d-sm-table-cell">
                    <a class="btn btn-primary btn-sm text-nowrap" href="user.html?userId=${user.id}" role="button">Show info</a>
                </td>
            </tr>
        `);

      tableBody.append(tableRow);
    });

    table.append(tableBody);
  }

  renderCard() {
    this.container.html(`
    <div class="row text-nowrap custom-grid"></div>`);

    const frag = new DocumentFragment();

    //Check if sort desc is activated
    let sortedUsers = $(".table-order-btn").hasClass("sortDesc")
      ? users.toReversed()
      : users;

    sortedUsers.forEach((user) => {
      const cardElement = $(`<div class='col-xxl-3 col-lg-6 col-sm-12 mt-2'>
      <div class="card">
    <img src="${user.picture ? user.picture : defaultPicLink}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${user.first_name} ${user.last_name}</h5>
        <p class="card-text">${user.email}</p>
        <a  href="user.html?userId=${user.id}"  class="btn btn-primary">Show info</a>
      </div>
    </div>`);

      frag.append(cardElement.get(0));
    });

    $(".custom-grid").append(frag);
  }

  render() {
    if (this.view === "table") {
      this.renderTable(this.users, this.sortDesc);
    } else if (this.view === "card") {
      this.renderCard(this.users, this.sortDesc);
    } else {
      console.error(`Unsupported view type: ${this.view}`);
    }
  }

  search = () => {
    const searchTerm = $("#searchBy").val().toLowerCase();

    if (this.view === "table") {
      $(".secondary-table-row").each(function () {
        const searchByEmail = $("#checkbox-mail:checked").get(0) ? 2 : 1;

        const rowText = $(this)
          .children("td")
          .eq(searchByEmail)
          .text()
          .toLowerCase();

        if (rowText.includes(searchTerm)) {
          $(this).show();
        } else {
          $(this).hide();
        }
      });
    } else {
      $(".card").each(function () {
        const searchByEmail = $("#checkbox-mail:checked").get(0)
          ? ".card-text"
          : ".card-title";

        const rowText = $(this)
          .children(".card-body")
          .children(searchByEmail)
          .text()
          .toLowerCase();

        if (rowText.includes(searchTerm)) {
          $(this).show();
        } else {
          $(this).hide();
        }
      });
    }
  }
}

users.sort((a, b) => {
  if (a.first_name.localeCompare(b.first_name) !== 0) {
    return a.first_name.localeCompare(b.first_name);
  }

  return a.last_name.localeCompare(b.last_name);
});

export default new Users(users, $(".user-container"));
