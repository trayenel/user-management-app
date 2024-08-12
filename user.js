import { users } from "./script.js";
import {getData} from "./utils.js";

//Get DOM container
const $userContainer = $(".user-container");

//Get user based on query params
const userId = new URLSearchParams(window.location.search).get("userId");

const user = users[userId];

console.log(user)
/*

const relevatCourses = data.filter((course) => course.userId === userId)
console.log(relevatCourses)

*/
//Dynamically render user details on page
function renderUserDetails() {
  $userContainer.html(`<p>${user.first_name}</p>
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
                <p>${user.id}</p>
  <h1>COURSES</h1>
  <p></p>
  
  `);
}

renderUserDetails();
