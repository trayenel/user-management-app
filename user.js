import { users } from "./script.js";
import { getData } from "./utils.js";

//Get DOM container
const userContainer = $(".user-container");

//Get user id based on query params and match with array index
const paramUserId = new URLSearchParams(window.location.search).get("userId");
const usrIdx = users.findIndex((user) => user.id === Number(paramUserId));
const user = users[usrIdx];

//Get courses information including courses with multiple users.
export const courseData = await getData("./assets/courses.json");

const relevatCourses = courseData.filter((course) => {
  if (Array.isArray(course.userId)) {
    return course.userId.includes(Number(paramUserId));
  }
  return course.userId === Number(paramUserId);
});

//Dynamically render user details on page

function renderCourses(container) {
  relevatCourses.forEach((course) => {
    let courseContainer = $(`<span></span>`);
    console.log(course);
    courseContainer.html(`
    <a class="link-primary link-opacity-75-hover link-underline-opacity-0" href="course.html?courseId=${course.id}">${course.title}</a>`);

    container.append(courseContainer);
  });
}

function renderUserDetails() {
  if (!user) {
    userContainer.html(`Error 404 user not found`);
  } else {
    userContainer.html(`<div class="card d-flex flex-row w-100 shadow" style="width: 18rem;">
  <div class="d-flex flex-column align-items-center card-body">
   <img src="./assets/silhouette-profile-pic-1.png" class="user-profile-pic" alt="..."> 
    <h5 class="card-title">${user.first_name} ${user.last_name}</h5>
    <p class="card-text">${user.email}</p>
  </div>
  
  <div class="card-body">
<form class="form w-100 mt-3  d-flex flex-column gap-3">
    <div class="form-group row">
        <label for="name" class="col-sm-2 col-form-label col-form-label-sm">Name</label>
        <div class="col-sm-10">
            <input type="text" class="form-control" id="name" value="${user.first_name}"/>
        </div>
    </div>

    <div class="form-group row">
        <label for="email" class="col-sm-2 col-form-label col-form-label-sm">Email</label>

        <div class="col-sm-10">
            <input type="email" class="form-control" id="email" name="email" value="${user.email}"/>
        </div>
    </div>


    <div class="form-group row">
        <label for="Age" class="col-sm-2 col-form-label col-form-label-sm">Age</label>

        <div class="col-sm-10">
            <input type="text" class="form-control" id="Age" name="age" value="${user.age}"/>
        </div>
    </div>


    <div class="form-group row">
        <label for="Gender" class="col-sm-2 col-form-label col-form-label-sm">Gender</label>
        <div class="col-sm-10">
            <input type="text" class="form-control" id="Gender" name="gender" value="${user.gender}"/>
        </div>
    </div>

    <div class="form-group row">
        <label for="Phone" class="col-sm-2 col-form-label col-form-label-sm">Phone</label>


        <div class="col-sm-10">
            <input type="text" class="form-control" id="Phone" name="phone" value="${user.phone}"/>
        </div>

    </div>


    <div class="form-group row">
        <label for="Username" class="col-sm-2 col-form-label col-form-label-sm">Username</label>

        <div class="col-sm-10">
            <input type="text" class="form-control" id="Username" name="username" value="${user.username}"/>
        </div>

    </div>

    <div class="form-group row">
        <label for="BirthDate" class="col-sm-2 col-form-label col-form-label-sm">Birth Date</label>

        <div class="col-sm-10">
            <input type="text" class="form-control" id="BirthDate" name="birthdate" value="${user.birthdate}"/>
        </div>
    </div>

    <div class="form-group row">

        <label for="Height" class="col-sm-2 col-form-label col-form-label-sm">Height</label>

        <div class="col-sm-10">
            <input type="text" class="form-control" id="Height" name="height" value="${user.height}"/>
        </div>
    </div>


    <div class="form-group row">
        <label for="Weight" class="col-sm-2 col-form-label col-form-label-sm">Weight</label>

        <div class="col-sm-10">
            <input type="text" class="form-control" id="Weight" name="weight" value="${user.weight}"/>
        </div>
        
    <button type="submit" class="btn btn-primary btn-edit"  style="width: 10%" value="save">Edit</button>
    </div>

</form>
</div> 
  </div>
  
  `);

    let input = $("input");

    input.attr("disabled", true);
    // renderCourses(userContainer);
  }
}

renderUserDetails();

let form = $("form");
form.on("click", "button", (e) => {
  e.preventDefault();
  if (e.target.classList.contains("btn-save")) {
    e.target.classList.toggle("btn-edit");
    e.target.classList.toggle("btn-save");
    $("input").attr("disabled", true);
    return;
  }
  if (e.target.classList.contains("btn-edit")) {
    e.target.classList.toggle("btn-edit");
    e.target.classList.toggle("btn-save");
    $("input").attr("disabled", false);
  }
});

/*
<p class="card-title">Age: ${user.age}</p>
<p class="card-title">Gender: ${user.gender}</p>
<p class="card-title">Phone: ${user.phone}</p>
<p class="card-title">Username: ${user.username}</p>
<p class="card-title">Birthdate: ${user.birthdate}</p>
<p class="card-title">Height: ${user.height}</p>
<p class="card-title">Weight: ${user.weight}</p>
<p class="card-title">Education: ${user.education}</p>
*/

/*<button type="submit" className="btn btn-primary btn-save" value="save">Save changes</button>
<button type="button" class="btn btn-secondary btn-cancel">Cancel</button>*/
