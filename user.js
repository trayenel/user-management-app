import {
  courses,
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

if (!user.posts) {
  const posts = await getData(`https://dummyjson.com/posts/user/${user.id}`);
  user.posts = [];
  user.posts.push(...posts.posts);
  saveStorage("users", users);
}

//Get courses information including courses with multiple users.
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

//Get posts from DummyJson api
async function createPost(body, title) {
  const newPosts = await fetch("https://dummyjson.com/posts/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: title,
      userId: user.id,
      body: body,
      reactions: { likes: 0, dislikes: 0 },
    }),
  }).then((res) => res.json());

  user.posts.push(newPosts);
  saveStorage("users", users);
}

//Dynamically render user details on page
function renderUserDetails() {
  if (!user) {
    userContainer.html(`Error 404 user not found`);
  } else {
    let defaultPicLink = "./assets/silhouette-profile-pic-1.png";

    userContainer.html(`
 <div class="card d-flex flex-row w-100 shadow h-100" style="width: 18rem;">
  <div class="d-flex flex-column align-items-center card-body">
 
 <label for="avatar">
    <img src="${user.picture ? user.picture : defaultPicLink}" class="user-profile-pic" alt="...">
    </label> 
<input type="file" id="avatar" accept="image/png, image/jpeg" class="d-none"/> 

    <h5 class="card-title">${user.first_name} ${user.last_name}</h5>
    <p class="card-text">${user.email}</p>
    <p class="card-text">${user.company.position} at ${user.company.name}</p>
    
    <div class="mt-5">
    <p class="card-text">Enrolled in the following courses:</p>
    <ul class="courses-list list-group list-group-flush"></ul>
    </div>
  </div>

  <div class="card-body">
    <form class="form w-100 mt-3 h-100 d-flex flex-column gap-3">
      <div class="form-group row">
        <label for="name" class="col-xl-2 col-form-label col-form-label-sm">Name</label>
        <div class="col-xl-10">
          <input type="text" class="form-control" id="name" value="${user.first_name} ${user.last_name}" />
        </div>
      </div>

      <div class="form-group row">
        <label for="email" class="col-xl-2 col-form-label col-form-label-sm">Email</label>
        <div class="col-xl-10">
          <input type="email" class="form-control" id="email" name="email" value="${user.email}" />
        </div>
      </div>

      <div class="form-group row">
        <label for="Age" class="col-xl-2 col-form-label col-form-label-sm">Age</label>
        <div class="col-xl-10">
          <input type="text" class="form-control" id="Age" name="age" value="${user.age}" />
        </div>
      </div>

      <div class="form-group row">
        <label for="Gender" class="col-xl-2 col-form-label col-form-label-sm">Gender</label>
        <div class="col-xl-10">
          <input type="text" class="form-control" id="Gender" name="gender" value="${user.gender}" />
        </div>
      </div>

      <div class="form-group row">
        <label for="Phone" class="col-xl-2 col-form-label col-form-label-sm">Phone</label>
        <div class="col-xl-10">
          <input type="text" class="form-control" id="Phone" name="phone" value="${user.phone}" />
        </div>
      </div>

      <div class="form-group row">
        <label for="Username" class="col-xl-2 col-form-label col-form-label-sm">Username</label>
        <div class="col-xl-10">
          <input type="text" class="form-control" id="Username" name="username" value="${user.username}" />
        </div>
      </div>

      <div class="form-group row">
        <label for="BirthDate" class="col-xl-2 col-form-label col-form-label-sm">Birth Date</label>
        <div class="col-xl-10">
          <input type="text" class="form-control" id="BirthDate" name="birthdate" value="${user.birthdate}" />
        </div>
      </div>

      <div class="form-group row">
        <label for="Height" class="col-xl-2 col-form-label col-form-label-sm">Height</label>
        <div class="col-xl-10">
          <input type="text" class="form-control" id="Height" name="height" value="${user.height}" />
        </div>
      </div>

      <div class="form-group row">
        <label for="Weight" class="col-xl-2 col-form-label col-form-label-sm">Weight</label>
        <div class="col-xl-10">
          <input type="text" class="form-control" id="Weight" name="weight" value="${user.weight}" />
        </div>
      </div>
      
      
      <div class="form-group row">
        <label for="Education" class="col-xl-2 col-form-label col-form-label-sm">Education</label>
        <div class="col-xl-10">
          <input type="text" class="form-control" id="Education" name="education" value="${user.education}" />
        </div>
      </div>

      <div class="form-group row">
        <label for="company-name" class="col-xl-2 col-form-label col-form-label-sm">Company</label>
        <div class="col-xl-10">
          <input type="text" class="form-control" id="company-name" name="cname" value="${user.company.name}" />
        </div>
      </div>

      <div class="form-group row">
        <label for="position" class="col-xl-2 col-form-label col-form-label-sm">Position</label>
        <div class="col-xl-10">
          <input type="text" class="form-control" id="position" name="cposition" value="${user.company.position}" />
        </div>
      </div>

      <div class="form-group row">
        <label for="salary" class="col-xl-2 col-form-label col-form-label-sm">Salary</label>
        <div class="col-xl-10">
          <input type="text" class="form-control" id="salary" name="csalary" value="${user.company.salary}" />
        </div>
      </div>
      
       <div class="form-group row">
        <label for="startdate" class="col-xl-2 col-form-label col-form-label-sm">Start date</label>
        <div class="col-xl-10">
          <input type="text" class="form-control" id="startdate" name="cstart_date" value="${user.company.start_date}" />
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
    $("input").attr("disabled", true);

    $(".form").on("click", "button", (e) => {
      e.preventDefault();
      let editBtn = $(".btn-edit");
      let cancelBtn = $(".btn-cancel");

      if (
        $(e.target).hasClass("btn-save") &&
        $(e.target).hasClass("btn-edit")
      ) {
        const form = $(".form").get(0);

        const formData = new FormData(form);

        let newUser = { ...user };

        formData.forEach((value, key) => {
          if (key[0] === "c") {
            let companyDetail = key.slice(1, key.length);
            newUser.company[companyDetail] = value;
          } else {
            newUser[key] = value;
          }
        });

        users[usrIdx] = newUser;

        saveStorage("users", users);

        editBtn.html("Edit");
        editBtn.removeClass("btn-save");
        $("input").attr("disabled", true);
        cancelBtn.attr("disabled", true);

        window.location.href = `./user.html?userId=${paramUserId}`;
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

renderUserDetails();

function renderPosts() {
  //Add table element to container.
  let table = $(`
    <table class="table shadow mt-2 border">
        <thead class="visible@l">
        <tr>
            <td>
  <div class="form-check">
  <input class="form-check-input" type="checkbox" value="" id="flexCheckIndeterminateDisabled">
  <label class="form-check-label" for="flexCheckIndeterminateDisabled">
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
    console.log(post);
    const tableRow = $(`
            <tr>
               <td class="d-none d-sm-table-cell">
                   <div class="form-check">
  <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
  <label class="form-check-label" for="flexCheckDefault">
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

  userContainer.append(table);
}

renderPosts();
