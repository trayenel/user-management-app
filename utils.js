export async function getData(path) {
  const res = await fetch(path);
  return res.json();
}

export function getQueryParam(param) {
  return Number(new URLSearchParams(window.location.search).get(param));
}

export const fetchStorage = function (name) {
  const userData = localStorage.getItem(name);
  if (!userData) {
    return false;
  }
  return JSON.parse(userData);
};

export const saveStorage = function (name, data) {
  localStorage.setItem(name, JSON.stringify(data));
};

//Loading data from JSON if not in localstorage
if (!fetchStorage("users")) {
  $(".user-container").html(`
 <div class="d-flex justify-content-center mt-5">
          <div class="spinner-border" role="status" style="width: 3rem; height: 3rem;">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
`);
  const userData = await getData("./assets/users.json");

  saveStorage("users", userData.users);
}

export const users = fetchStorage("users");

export const courses = await getData("./assets/courses.json");

export const defaultPicLink = "./assets/silhouette-profile-pic-1.png";
