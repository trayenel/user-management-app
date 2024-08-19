export async function getData(path) {
  const res = await fetch(path);
  return res.json();
}

export function getQueryParam(param) {
  return Number(new URLSearchParams(window.location.search).get(param));
}

export function fetchStorage(name) {
  const userData = localStorage.getItem(name);
  if (!userData) {
    return false;
  }
  return JSON.parse(userData);
}

export function saveStorage(name, data) {
  localStorage.setItem(name, JSON.stringify(data));
}

export function validateForm(formData, newUser, users) {
  const fieldValidators = {
    email: validateEmail,
    height: validateHeight,
    age: validateNumericField,
    csalary: validateNumericField,
    weight: validateNumericField,
    phone: validatePhone,
    cstart_date: validateDate,
    birthdate: validateDate,
  };

  let isValid = true;

  formData.forEach((value, key) => {
    value = value.trim();
    let inputField = $(`input[name="${key}"]`);
    inputField.siblings(".text-danger, .info-text").remove();

    if (!value) {
      addError(inputField, "Field can't be empty");
      isValid = false;
    } else {
      addSuccess(inputField);
      assignToUser(newUser, key, value);
    }

    if (fieldValidators[key]) {
      const isFieldValid = fieldValidators[key](
        value,
        inputField,
        newUser,
        users,
      );
      isValid = isValid && isFieldValid;
    }
  });

  return isValid && Object.keys(newUser.company).length === 4
    ? newUser
    : isValid;
}

function addError(field, message) {
  field.css({ borderColor: "#dc3545" });
  if (!field.next(".info-text").length) {
    field.after(
      `<span class="text-danger info-text" style="font-size: 12px;">${message}</span>`,
    );
  } else {
    field.next(".info-text").text(message).css({ color: "#dc3545" });
  }
}

function addSuccess(field) {
  field.css({ borderColor: "green" });
  if (!field.next(".info-text").length) {
    field.after(
      `<span class="info-text" style="font-size: 12px; color: green;">Looks good!</span>`,
    );
  }
}

function assignToUser(newUser, key, value) {
  if (key.startsWith("c")) {
    newUser.company[key.slice(1)] = value;
  } else if (key.startsWith("_")) {
    let [first_name, last_name = ""] = value.split(" ");
    newUser.first_name = first_name;
    newUser.last_name = last_name;
  } else {
    newUser[key] = value;
  }
}

function validateEmail(email, field, newUser, users) {
  const mailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const existingUser = users.find((user) => user.email === email);

  if (!email.match(mailRegex)) {
    addError(field, "Invalid email");
    return false;
  } else if (existingUser && existingUser.id !== newUser.id) {
    addError(field, "Duplicate email");
    return false;
  }
  return true;
}

function validateHeight(height, field) {
  const heightRegex = /^([1-9]|[1-9][0-9])['\s]?([0-9]|[0-9][0-9])$/;
  if (!height.match(heightRegex)) {
    addError(field, "Invalid height");
    return false;
  }
  return true;
}

function validateNumericField(value, field) {
  if (isNaN(Number(value))) {
    addError(field, `Invalid ${field.attr("name")}`);
    return false;
  }
  return true;
}

function validatePhone(phone, field) {
  const phoneRegex = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
  if (!phone.match(phoneRegex)) {
    addError(field, "Phone format must be xxx-xxx-xxxx");
    return false;
  }
  return true;
}

function validateDate(date, field) {
  const dateRegex = /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
  if (!date.match(dateRegex)) {
    addError(field, "Date format must be yyyy-mm-dd");
    return false;
  }
  return true;
}

export function storeLastUsers(user) {
  if (!user) return;
  if (!fetchStorage("lastThreeUsers")) {
    let lastUsers = [user.id];
    saveStorage("lastThreeUsers", lastUsers);
    return;
  }

  let lastUsers = fetchStorage("lastThreeUsers");

  if (!lastUsers.includes(user.id)) {
    lastUsers.push(user.id);
    if (lastUsers.length > 3) {
      lastUsers.shift();
    }
  }

  saveStorage("lastThreeUsers", lastUsers);
}

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
