import { getQueryParam, courses } from "./utils.js";
import User from "./Users.js";

//Get DOM container
const userContainer = $(".container");

//Get user id based on query params and match with array index
const paramCourseId = getQueryParam("courseId");
const user = User.users.find((user) => user.id === getQueryParam("userId"));

//Get course information including users enrolled.
const courseIdx = courses.findIndex(
  (course) => course.id === Number(paramCourseId),
);

const course = courses[courseIdx];

const enrolledUsers = User.users.filter((user) => {
  if (!course) return;

  if (Array.isArray(course.userId)) {
    return course.userId.includes(user.id);
  }
  return user.id === course.userId;
});

function renderCourseDetails() {
  if (!course || !user) {
    userContainer.html(`
     <div><a href="./index.html">Home</a></div>
     <span>Error 404 course not found</span>`);
  } else {
    userContainer.html(`
      <nav aria-label="breadcrumb" class="align-self-start">
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><a href="index.html">Home</a></li>
    <li class="breadcrumb-item"><a href="user.html?userId=${user.id}">${user.first_name} ${user.last_name}</a></li>
    <li class="breadcrumb-item active" aria-current="page">${course.title}</li> 
  </ol>
</nav>
   `);
    userContainer.append(`
  
 <div class="card d-flex flex-md-row w-50 shadow align-self-center" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title text-center">${course.title}</h5>
    <p class="card-text">Category: ${course.category}</p>
    <p class="card-text">Duration: ${course.duration}</p>
    <li class="card-text users list-group list-group">Enrolled users:</li>
  </div>
</div> 
  `);

    enrolledUsers.forEach((user, index) => {
      let punctuation = index === enrolledUsers.length - 1 ? "." : ",";
      $(".users").append(`<li class="list-group-item">
 <a class="text-nowrap link-primary link-underline-opacity-0" href="./user.html?userId=${user.id}">${user.first_name} ${user.last_name}</a></li>
  `);
    });
  }
}

renderCourseDetails();
