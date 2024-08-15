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
  if (Array.isArray(course.userId)) {
    return course.userId.includes(user.id);
  }
  return user.id === course.userId;
});

function renderCourseDetails() {
  if (!course) {
    userContainer.html(`Error 404 course not found`);
  } else {
    userContainer.html(`
    <nav aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><a href="index.html">Home</a></li>
    <li class="breadcrumb-item"><a href="user.html?userId=${user.id}">${user.first_name}</a></li>
    <li class="breadcrumb-item active" aria-current="page">${course.title}</li> 
  </ol>
</nav>

 <div class="card d-flex flex-md-row w-100 shadow" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title">${course.category}</h5>
    <p class="card-text">${course.title}</p>
    <p class="card-text">${course.duration}</p>
  </div>
</div> 
  `);
    enrolledUsers.forEach((user) => {
      $(".card-body").append(`
  <p class="card-text" >${user.first_name} ${user.last_name}</p>
  `);
    });
  }
}

renderCourseDetails();
