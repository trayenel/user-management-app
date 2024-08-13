import { users } from "./script.js";
import { getData, getQueryParam } from "./utils.js";

//Get DOM container
const userContainer = $(".user-container");

//Get user id based on query params and match with array index
const paramUserId = getQueryParam("userId");
const usrIdx = users.findIndex((user) => user.id === Number(paramUserId));
const user = users[usrIdx];

//Get courses information including courses with multiple users.
export const courseData = await getData("./assets/courses.json");

//Dynamically render user details on page
async function renderCourses(container) {
  const relevantCourses = courseData.filter((course) => {
    if (Array.isArray(course.userId)) {
      return course.userId.includes(Number(paramUserId));
    }
    return course.userId === Number(paramUserId);
  });

  relevantCourses.forEach((course) => {
    let span = $(
      `<li class="list-group-item">
      <a class="link-primary link-opacity-75-hover link-underline-opacity-0" href="course.html?courseId=${course.id}">${course.title}</a>
      </li>`,
    );

    container.append(span);
  });
}

//Get posts from DummyJson api
async function getUserPosts() {
  const userId = user.id;
  return  await fetch(
    `https://dummyjson.com/posts/user/${userId}`,
  ).then((res) => res.json());
}

async function createPost(body, title) {
  const userId = user.id;
 return await fetch('https://dummyjson.com/posts/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: title,
      userId: userId,
      body: body,
      reactions: {likes: 0, dislikes: 0}
    })
  })
      .then(res => res.json())
}

function renderUserDetails() {
  if (!user) {
    userContainer.html(`Error 404 user not found`);
  } else {
    let defaultPicLink = "./assets/silhouette-profile-pic-1.png";

    userContainer.html(`
 <div class="card d-flex flex-row w-100 shadow" style="width: 18rem;">
  <div class="d-flex flex-column align-items-center card-body">
    <img src="${user.picture ? user.picture : defaultPicLink}" class="user-profile-pic" alt="...">
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
        <label for="name" class="col-sm-2 col-form-label col-form-label-sm">Name</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" id="name" value="${user.first_name}" />
        </div>
      </div>

      <div class="form-group row">
        <label for="email" class="col-sm-2 col-form-label col-form-label-sm">Email</label>
        <div class="col-sm-10">
          <input type="email" class="form-control" id="email" name="email" value="${user.email}" />
        </div>
      </div>

      <div class="form-group row">
        <label for="Age" class="col-sm-2 col-form-label col-form-label-sm">Age</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" id="Age" name="age" value="${user.age}" />
        </div>
      </div>

      <div class="form-group row">
        <label for="Gender" class="col-sm-2 col-form-label col-form-label-sm">Gender</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" id="Gender" name="gender" value="${user.gender}" />
        </div>
      </div>

      <div class="form-group row">
        <label for="Phone" class="col-sm-2 col-form-label col-form-label-sm">Phone</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" id="Phone" name="phone" value="${user.phone}" />
        </div>
      </div>

      <div class="form-group row">
        <label for="Username" class="col-sm-2 col-form-label col-form-label-sm">Username</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" id="Username" name="username" value="${user.username}" />
        </div>
      </div>

      <div class="form-group row">
        <label for="BirthDate" class="col-sm-2 col-form-label col-form-label-sm">Birth Date</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" id="BirthDate" name="birthdate" value="${user.birthdate}" />
        </div>
      </div>

      <div class="form-group row">
        <label for="Height" class="col-sm-2 col-form-label col-form-label-sm">Height</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" id="Height" name="height" value="${user.height}" />
        </div>
      </div>

      <div class="form-group row">
        <label for="Weight" class="col-sm-2 col-form-label col-form-label-sm">Weight</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" id="Weight" name="weight" value="${user.weight}" />
        </div>
      </div>

      <div class="form-group row">
        <label for="company-name" class="col-sm-2 col-form-label col-form-label-sm">Company</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" id="company-name" name="company-name" value="${user.company.name}" />
        </div>
      </div>

      <div class="form-group row">
        <label for="position" class="col-sm-2 col-form-label col-form-label-sm">Position</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" id="position" name="position" value="${user.company.position}" />
        </div>
      </div>

      <div class="form-group row">
        <label for="salary" class="col-sm-2 col-form-label col-form-label-sm">Salary</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" id="salary" name="salary" value="${user.company.salary}" />
        </div>
      </div>

      <div class="form-group row">
        <div class="col-sm-10">
          <button type="submit" class="btn btn-primary btn-edit text-nowrap" value="save">Edit</button>
          <button type="button" class="btn btn-primary btn-cancel text-nowrap" value="cancel" disabled>Cancel</button>
        </div>
      </div>
    </form>
  </div>
</div>
  `);

    $("form").on("click", "button", (e) => {
      e.preventDefault();
      let editBtn = $(".btn-edit");
      let cancelBtn = $(".btn-cancel");

      if (e.target.classList.contains("btn-cancel")) {
        editBtn.html("Edit");
        $("input").attr("disabled", true);
        cancelBtn.attr("disabled", true);
        return;
      }
      if (e.target.classList.contains("btn-edit")) {
        editBtn.html("Save");
        cancelBtn.attr("disabled", false);
        $("input").attr("disabled", false);
      }
    });

    renderCourses($(".courses-list"));
    $("input").attr("disabled", true);
  }
}

renderUserDetails();
