import {
  courses,
  defaultPicLink,
  getData,
  saveStorage,
  users,
} from "./utils.js";

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
    if ($("#searchBy").val() !== "") this.search();
  }

  renderTable() {
    //Add table element to container.
    this.container.html(`
    <table class="table table-borderless table-striped shadow mt-2">
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
            <tr class="secondary-table-row d-flex flex-column d-md-table-row">
                <th class="d-none d-md-table-cell">${i + 1}</th>
                <td>   <img src="${user.picture ? user.picture : defaultPicLink}" class="user-profile-pic small visible@l" alt="..."></td>
                <td class="td-name">${user.first_name} ${user.last_name}</td>
                <td class="td-email">${user.email}</td>
                <td class="td=button">
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
          $(this).addClass("d-flex");
          $(this).addClass("d-md-table-row");
        } else {
          $(this).removeClass("d-flex");
          $(this).removeClass("d-md-table-row");
          $(this).hide();
        }
      });
    } else {
      $(".card-body").each(function () {
        const searchByEmail = $("#checkbox-mail:checked").get(0)
          ? ".card-text"
          : ".card-title";

        const rowText = $(this).children(searchByEmail).text().toLowerCase();

        if (rowText.includes(searchTerm)) {
          $(this).closest(".col-xxl-3").show();
        } else {
          $(this).closest(".col-xxl-3").hide();
        }
      });
    }
  };

  renderUserDetails(paramUserId) {
    const usrIdx = this.users.findIndex(
      (user) => user.id === Number(paramUserId),
    );
    const user = users[usrIdx];

    if (!user) {
      this.container.html(`Error 404 user not found`);
    } else {
      this.container.html(`
 <div class="card d-flex flex-md-row w-100 shadow" style="width: 18rem;">
  <div class="d-flex flex-column align-items-center card-body">
 
 <label for="avatar">
 <div class="profile-pic-wrapper" >
    <img src="${user.picture ? user.picture : defaultPicLink}" class="user-profile-pic user-profile-pic-hover" alt="...">
 <span class="profile-pic-text">Change profile pic</span>
    </div>
    </label> 
<input type="file" id="avatar" accept="image/png, image/jpeg" class="d-none profile-pic-chooser"/> 

    <h5 class="card-title">${user.first_name} ${user.last_name}</h5>
    <p class="card-text">${user.email}</p>
    <p class="card-text">${user.company.position} at ${user.company.name}</p>
    
    <div class="mt-5">
    <p class="card-text">Enrolled in the following courses:</p>
    <ul class="courses-list list-group list-group-flush"></ul>
    </div>
  </div>

  <div class="card-body">
    <form class="form user-form w-100 mt-3 h-100 d-flex flex-column gap-3">
      <div class="form-group row">
        <label for="name" class="col-xl-2 col-form-label col-form-label-sm">First Name</label>
        <div class="col-xl-10">
          <input type="text" class="form-control user-field" id="name" name='fname' value="${user.first_name} ${user.last_name}" />
        </div>
      </div>

      <div class="form-group row">
        <label for="email" class="col-xl-2 col-form-label col-form-label-sm">Email</label>
        <div class="col-xl-10">
          <input type="email" class="form-control user-field" id="email" name="email" value="${user.email}" />
        </div>
      </div>

      <div class="form-group row">
        <label for="Age" class="col-xl-2 col-form-label col-form-label-sm">Age</label>
        <div class="col-xl-10">
          <input type="text" class="form-control user-field" id="Age" name="age" value="${user.age}" />
        </div>
      </div>

      <div class="form-group row">
        <label for="Gender" class="col-xl-2 col-form-label col-form-label-sm">Gender</label>
        <div class="col-xl-10">
          <input type="text" class="form-control user-field" id="Gender" name="gender" value="${user.gender}" />
        </div>
      </div>

      <div class="form-group row">
        <label for="Phone" class="col-xl-2 col-form-label col-form-label-sm">Phone</label>
        <div class="col-xl-10">
          <input type="text" class="form-control user-field" id="Phone" name="phone" value="${user.phone}" />
        </div>
      </div>

      <div class="form-group row">
        <label for="Username" class="col-xl-2 col-form-label col-form-label-sm">Username</label>
        <div class="col-xl-10">
          <input type="text" class="form-control user-field" id="Username" name="username" value="${user.username}" />
        </div>
      </div>

      <div class="form-group row">
        <label for="BirthDate" class="col-xl-2 col-form-label col-form-label-sm">Birth Date</label>
        <div class="col-xl-10">
          <input type="text" class="form-control user-field" id="BirthDate" name="birthdate" value="${user.birthdate}" />
        </div>
      </div>

      <div class="form-group row">
        <label for="Height" class="col-xl-2 col-form-label col-form-label-sm">Height</label>
        <div class="col-xl-10">
          <input type="text" class="form-control user-field" id="Height" name="height" value="${user.height}" />
        </div>
      </div>

      <div class="form-group row">
        <label for="Weight" class="col-xl-2 col-form-label col-form-label-sm">Weight</label>
        <div class="col-xl-10">
          <input type="text" class="form-control user-field" id="Weight" name="weight" value="${user.weight}" />
        </div>
      </div>
      
      
      <div class="form-group row">
        <label for="Education" class="col-xl-2 col-form-label col-form-label-sm">Education</label>
        <div class="col-xl-10">
          <input type="text" class="form-control user-field" id="Education" name="education" value="${user.education}" />
        </div>
      </div>

      <div class="form-group row">
        <label for="company-name" class="col-xl-2 col-form-label col-form-label-sm">Company</label>
        <div class="col-xl-10">
          <input type="text" class="form-control user-field" id="company-name" name="cname" value="${user.company.name}" />
        </div>
      </div>

      <div class="form-group row">
        <label for="position" class="col-xl-2 col-form-label col-form-label-sm">Position</label>
        <div class="col-xl-10">
          <input type="text" class="form-control user-field" id="position" name="cposition" value="${user.company.position}" />
        </div>
      </div>

      <div class="form-group row">
        <label for="salary" class="col-xl-2 col-form-label col-form-label-sm">Salary</label>
        <div class="col-xl-10">
          <input type="text" class="form-control user-field" id="salary" name="csalary" value="${user.company.salary}" />
        </div>
      </div>
      
       <div class="form-group row">
        <label for="startdate" class="col-xl-2 col-form-label col-form-label-sm">Start date</label>
        <div class="col-xl-10">
          <input type="text" class="form-control user-field" id="startdate" name="cstart_date" value="${user.company.start_date}" />
        </div>
      </div>

      <div class="form-group row">
        <div class="col-xl-10">
          <button type="submit" class="btn btn-primary btn-edit text-nowrap" value="save">Edit</button>
          <button type="button" class="btn btn-primary btn-cancel text-nowrap" value="cancel" disabled>Cancel</button>
        </div>
      </div>
    </form>
  </div>
</div>
  `);

      $(".user-field").attr("disabled", true);

      $("#avatar").on("change", (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();

          reader.readAsDataURL(file);

          reader.addEventListener("load", () => {
            user.picture = reader.result;

            saveStorage("users", users);

            location.reload();
          });
        }
      });

      this.container.on("click", "button", (e) => {
        let editBtn = $(".btn-edit");
        let cancelBtn = $(".btn-cancel");

        if (
          $(e.target).hasClass("btn-save") &&
          $(e.target).hasClass("btn-edit")
        ) {
          e.preventDefault();
          const form = $(".user-form").get(0);

          const formData = new FormData(form);

          let newUser = { ...user };

          formData.forEach((value, key) => {
            if (key[0] === "c") {
              let companyDetail = key.slice(1, key.length);
              newUser.company[companyDetail] = value.trim();
            } else if (key[0] === "f") {
              let fullname = value.split(" ");
              newUser.first_name = fullname[0];
              newUser.last_name = fullname[1] ? fullname[1] : "";
            } else {
              newUser[key] = value.trim();
            }
          });

          users[usrIdx] = newUser;

          saveStorage("users", users);

          editBtn.html("Edit");
          editBtn.removeClass("btn-save");
          $(".user").attr("disabled", true);
          cancelBtn.attr("disabled", true);

          location.reload();
          return;
        }

        if ($(e.target).is(".btn-cancel")) {
          editBtn.html("Edit");
          editBtn.removeClass("btn-save");
          $("input").attr("disabled", true);
          cancelBtn.attr("disabled", true);
          return;
        }

        if ($(e.target).is(".btn-edit")) {
          e.preventDefault();
          editBtn.html("Save");
          cancelBtn.attr("disabled", false);
          editBtn.addClass("btn-save");
          $("input").attr("disabled", false);
        }
      });
    }
  }

  async cachePosts(paramUserId) {
    const user = this.users.find((user) => user.id === Number(paramUserId));

    if (!user.posts) {
      const posts = await getData(
        `https://dummyjson.com/posts/user/${user.id}`,
      );
      user.posts = [];
      user.posts.push(...posts.posts);
      saveStorage("users", this.users);
    }
  }

  async renderPosts(paramUserId) {
    const usrIdx = this.users.findIndex(
      (user) => user.id === Number(paramUserId),
    );
    const user = users[usrIdx];

    //Create posts elements
    let posts = $('<section class="posts"></section>');

    let options = $(`
       <div class="d-flex mt-3 gap-3 post-options">
                <button
                        type="button"
                        class="btn btn-outline-primary create-post"
                        data-bs-toggle="modal"
                        data-bs-target="#createPostModal"
                >
                  Create post
                </button>
                  <button
                        type="button"
                        class="btn btn-outline-primary delete-post"
                        data-bs-toggle="modal"
                        data-bs-target="#deletePostModal"
                disabled
                >
                  Delete
                </button>
            <input type="checkbox" class="btn-check" id="btn-check" autocomplete="off" disabled>
<label class="btn btn-outline-primary btn-check-label d-md-none" for="btn-check">Select all</label>
          </div>
  `);

    let table = $(`
    <table class="table shadow mt-1 border">
        <thead class="visible@l">
        <tr>
            <td>
  <div class="form-check">
  <input class="form-check-input principal-checkbox" type="checkbox"  id="principal-checkbox" disabled>
  <label class="form-check-label" for="principal-checkbox">
  </label>
</div>

            </td>
            <td>
            Id
            </td>
            <td>Title</td>
            <td>Views</td>
            <td>Likes</td>
            <td>Dislikes</td>
        </tr>
        </thead>
    </table>`);

    const tableBody = $("<tbody></tbody>");

    //Create rows for each user
    await user.posts.forEach((post) => {
      const tableRow = $(`
            <tr>
               <td>
                   <div class="form-check">
  <input class="form-check-input secondary-checkbox" type="checkbox" name="${post.id}" value="${post.id}">
  </label>
</div>
                </td>
                <th class="d-none d-sm-table-cell">${post.id}</th>
                <td>${post.title}</td>
                <td>${post.views}</td>
                <td>${post.reactions.likes}</td>
                <td>${post.reactions.dislikes}</td>
            </tr>
        `);

      tableBody.append(tableRow);
    });

    table.append(tableBody);

    posts.append(options);

    posts.append(table);

    this.container.append(posts);

    $(".principal-checkbox, .btn-check").prop(
      "disabled",
      $(".secondary-checkbox").length === 0,
    );

    $(".posts").on("click", "button, input", (e) => {
      let principalCheckbox = $(".principal-checkbox");
      let secondaryCheckboxes = $(".secondary-checkbox");
      let btnCheck = $(".btn-check");

      if ($(e.target).is(".create-post")) return;

      if ($(e.target).is(btnCheck)) {
        principalCheckbox.prop("checked", $(btnCheck).is(":checked"));
        let isChecked = principalCheckbox.is(":checked");
        secondaryCheckboxes.prop("checked", isChecked);
      }

      if ($(e.target).is(".principal-checkbox")) {
        let isChecked = principalCheckbox.is(":checked");
        secondaryCheckboxes.prop("checked", isChecked);
      }

      let checkedCount = secondaryCheckboxes.filter(":checked").length;
      let totalCount = secondaryCheckboxes.length;

      if (checkedCount > 0) {
        $(".delete-post").prop("disabled", false);
      } else {
        $(".delete-post").prop("disabled", true);
      }

      if (checkedCount > 0 && checkedCount < totalCount) {
        principalCheckbox.prop("indeterminate", true);
      } else {
        principalCheckbox.prop("indeterminate", false);
        principalCheckbox.prop("checked", checkedCount === totalCount);
        btnCheck.prop("checked", checkedCount === totalCount);
      }
    });
  }

  renderCourses(container, paramUserId) {
    const relevantCourses = courses.filter((course) => {
      if (Array.isArray(course.userId)) {
        return course.userId.includes(Number(paramUserId));
      }
      return course.userId === Number(paramUserId);
    });

    relevantCourses.forEach((course) => {
      let span = $(`<li class="list-group-item">
      <a class="link-primary link-opacity-75-hover link-underline-opacity-0" href="course.html?courseId=${course.id}">${course.title}</a>
      </li>`);

      container.append(span);
    });
  }
}

users.sort((a, b) => {
  if (a.first_name.localeCompare(b.first_name) !== 0) {
    return a.first_name.localeCompare(b.first_name);
  }

  return a.last_name.localeCompare(b.last_name);
});

export default new Users(users, $(".user-container"));
