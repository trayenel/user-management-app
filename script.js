import { getData } from "./utils.js";

//Loading data from JSON file and unpacking it
const data = await getData("./assets/users.json");

export const users = data.users;

const $container = $(".user-container");

//Render table dynamically using the users array.
function renderTable() {
  //Add table element to container.

  $container.html(`
    <table class="table table-striped shadow mt-5">
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
