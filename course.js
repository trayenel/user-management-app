import { courseData } from "./user.js";
import { users } from "./script.js";

//Get DOM container
const userContainer = $(".container");

//Get user id based on query params and match with array index
const paramCourseId = new URLSearchParams(window.location.search).get(
  "courseId",
);

//Get course information including users enrolled.
const courseIdx = courseData.findIndex(
  (course) => course.id === Number(paramCourseId),
);
const course = courseData[courseIdx];

const enrolledUsers = users.filter((user) => {
  if (Array.isArray(course.userId)) {
    return course.userId.includes(user.id);
  }
  return user.id === course.userId;
});

function renderCourseDetails() {
  if (!course) {
    userContainer.html(`Error 404 course not found`);
  } else {
    userContainer.html(`<p>${course.title}</p>
    <p>${course.category}</p>
    <p>${course.description}</p>
         <p>${course.duration}</p>
  `);

    enrolledUsers.forEach((user) => {
      userContainer.append(`<p>${user.first_name} ${user.last_name}</p>`);
    });
  }
}

renderCourseDetails();
