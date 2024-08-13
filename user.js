import { users } from "./script.js";
import { getData } from "./utils.js";

//Get DOM container
const userContainer = $(".container");

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
    userContainer.html(`<p>${user.first_name}</p>
    <p>${user.last_name}</p>
         <p>Email: ${user.email}</p>
                <p>Age: ${user.age}</p>
                <p>Gender: ${user.gender}</p>
                <p>Phone: ${user.phone}</p>
                <p>Username: ${user.username}</p>
                <p>Birthdate: ${user.birthdate}</p>
                <p>Height: ${user.height}</p>
                <p>Weight: ${user.weight}</p>
                <p>Education: ${user.education}</p>
                <p>Company: ${user.company.name}</p>
  `);

    renderCourses(userContainer);
  }
}

renderUserDetails();
