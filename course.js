import { users } from "./script.js";
import { courseData } from "./user.js";

//Get DOM container
const userContainer = $(".container");

//Get user id based on query params and match with array index
const paramUserId = new URLSearchParams(window.location.search).get("courseId");
const courseIdx = users.findIndex(
  (course) => course.id === Number(paramUserId),
);
const course = courseData[courseIdx];

console.log(courseData);

//Get courses information including courses with multiple users.

function renderCourseDetails() {
  if (!course) {
    userContainer.html(`Error 404 course not found`);
  } else {
    userContainer.html(`<p>${course.title}</p>
    <p>${course.category}</p>
    <p>${course.description}</p>
         <p>${course.duration}</p>
  `);
  }
}

renderCourseDetails();
