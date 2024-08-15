import {
  courses,
  defaultPicLink,
  getData,
  getQueryParam,
  saveStorage,
  users,
} from "./utils.js";

//Get DOM container
const userContainer = $(".user-container");

//Get user id based on query params and match with array index
const paramUserId = getQueryParam("userId");
const usrIdx = users.findIndex((user) => user.id === Number(paramUserId));
const user = users[usrIdx];

//Get posts from DummyJson api
if (!user.posts) {
  const posts = await getData(`https://dummyjson.com/posts/user/${user.id}`);
  user.posts = [];
  user.posts.push(...posts.posts);
  saveStorage("users", users);
}

//Create post with DUMMYJson then cache it
async function createPost(body, title) {
  const newPost = await fetch("https://dummyjson.com/posts/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: title,
      userId: user.id,
      body: body,
      reactions: { likes: 0, dislikes: 0 },
    }),
  }).then((res) => res.json());

  newPost.views = 0;

  user.posts.push(newPost);

  saveStorage("users", users);
}

//Dynamically render user details on page
function renderUserDetails() {
  if (!user) {
    userContainer.html(`Error 404 user not found`);
  } else {
    userContainer.html(`
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
        <label for="name" class="col-xl-2 col-form-label col-form-label-sm">Name</label>
        <div class="col-xl-10">
          <input type="text" class="form-control user-field" id="name" value="${user.first_name} ${user.last_name}" />
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

    renderCourses($(".courses-list"));

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
  }
}

function renderCourses(container) {
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

function renderPosts() {
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
          </div>
  `);

  let table = $(`
    <table class="table shadow mt-1 border">
        <thead class="visible@l">
        <tr>
            <td>
  <div class="form-check">
  <input class="form-check-input principal-checkbox" type="checkbox" value="" id="principal-checkbox">
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
  user.posts.forEach((post) => {
    const tableRow = $(`
            <tr>
               <td class="d-none d-sm-table-cell">
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

  userContainer.append(posts);
}

renderUserDetails();

renderPosts();

userContainer.on("click", "button", (e) => {
  let editBtn = $(".btn-edit");
  let cancelBtn = $(".btn-cancel");

  if ($(e.target).hasClass("btn-save") && $(e.target).hasClass("btn-edit")) {
    e.preventDefault();
    const form = $(".user-form").get(0);

    const formData = new FormData(form);

    let newUser = { ...user };

    formData.forEach((value, key) => {
      if (key[0] === "c") {
        let companyDetail = key.slice(1, key.length);
        newUser.company[companyDetail] = value.trim();
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

$(".post-form").on("click", "button", async (e) => {
  e.preventDefault();

  if ($(e.target).is(".modal-save")) {
    let form = $(".post-form").get(0);
    let submitter = $(".modal-save").get(0);

    const formData = new FormData(form, submitter);

    if (user.posts.find((post) => post.title === formData.get("title").trim()))
      return;

    const newPost = await createPost(
      formData.get("body").trim(),
      formData.get("title").trim(),
    );

    location.reload();
  }
});

$(".posts").on("click", "button, input", (e) => {
  let principalCheckbox = $(".principal-checkbox");
  let secondaryCheckboxes = $(".secondary-checkbox");

  if ($(e.target).is(".create-post")) return;

  if (
    $(e.target).is(".principal-checkbox") &&
    !principalCheckbox.prop("disabled")
  ) {
    let isChecked = principalCheckbox.is(":checked");
    secondaryCheckboxes.prop("checked", isChecked);
  }

  let checkedCount = secondaryCheckboxes.filter(":checked").length;
  let totalCount = secondaryCheckboxes.length;

  if (totalCount === 0) {
    principalCheckbox.attr("disabled", true);
  } else {
    principalCheckbox.attr("disabled", false);
  }

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
  }
});

$(".modal").on("click", "button", (e) => {
  e.preventDefault();
  if ($(e.target).is(".modal-delete")) {
    const checkedBoxes = $(".secondary-checkbox:checked")
      .map(function () {
        return Number($(this).val());
      })
      .get();

    user.posts = user.posts.filter((post) => !checkedBoxes.includes(post.id));

    saveStorage("users", users);

    location.reload();
  }
});
