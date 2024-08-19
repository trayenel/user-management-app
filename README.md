## Technical Assignment - Interview

### Installation

- Run npm install
- Start the project with npm start

### Before you start the assignment

After you create your own private repository, git clone this project and **send me an invitation**.

### Important keynotes

- Your assignment should be done in your own github repository (you have to invite me during (preferably) or after completion). The repo should be private.
- Don't manipulate the `users.json` and `courses.json` directly if you only wish to complete #1 and #2. All the code should be implemented in a **programatic way**.
- The overall solution should have three pages: <br>
  \- `index.html` (list of users) <br>
  \- `user.html` <br>
  \- `course.html` <br>
- You don't need to use SQL or any other server-side languages. The whole mock solution should be done in **HTML 5**, **CSS**, **JavaScript** (or any JS framework that you are most comfortable with like e.g React).
- Nope, `courses.json` is not broken. You should find a way to actually determine if you need to show only one or more user/(s) enrolled.
- Try your best to complete atleast #1 and #2. Thus, is not mandatory to complete all of them.
- Be creative, Good luck & take your time :)

### Requirements

#### #1. UI/UX

- Use bootstrap 5 or any css framework that you are most comfortable with.
- The app should have a header with the logo on the left side and a logout button on the right (use bootstrap row, container, col, flexbox etc.).
- For index.html there should be an option for view mode - table view or card view
- The application should be responsive: especially **users listing page** - on larger screens you should display four users in a row, on medium screens two users in a row and on mobile only one user per row.
- The design should be clean and modern - use websites like [Dribble](https://dribbble.com/) or [Behance](https://www.behance.net/) for UI inspiration.

### #2. Data retrieval & display

#### **Users**

1. **Users listing page**: Create a page that displays a list of all users. Each user in the list should display their first name, last name, and email. The user listing page should include a link to view the details of each user.

2. **User insert**: Create a button which opens a modal to simulate adding a new user in the existing JSON. All fields must be validated and it should not allow to insert duplicates (based on email).

3. **User selection**: When a user clicks on a link to view the details of a user, the application should redirect to the user details page with the ID of the selected user as a **query parameter**.

4. **Retrieve user data**: When the user details page loads, retrieve the user data using the ID specified in the query parameter. Use the ID to find the corresponding user object in the JSON data.

5. **User details page**: Create the page that displays the details of a specific user. The user details page should display all the properties of the user, including their ID, first name, last name, age, gender, email, phone, username, birthdate, height, weight, education, and company details. The user details page should also display the list of courses associated with the selected user.

#### **Courses**

1. **Retrieve course data**: Retrieve the course data associated with the user. Filter the course data based on the user ID and display the filtered results on the user details page.

2. **Course selection**: When a user clicks on a link to view the details of a course, the application should redirect to the course details page with the id of the selected course as a **query parameter**

3. **Course details page**: Create the page that displays the details of a specific course. The course page should display all the properties of the course, including the user's enrolled for the selected course.

#### #3. Extra (not mandatory but will be a decision factor)

- Add a filter functionality for user listing page - basically a search - be creative.
- Use Fetch/Ajax to make REST API Calls using [DummyJSON](https://dummyjson.com/docs/posts) with the following functionalities for **POSTS**: <br>
  \- **Get all posts by user id**: retrieve posts for provided userId on User details page <br>
  \- **Add a Post** - Add a post for any user <br>
  \- **Delete post** - Delete post for any user (using a confirmation modal) <br>
- Edit an user and manipulate the existing JSON (using read/write to save it locally).
- Add user images and display in on both pages (index.html and user.html).
- Display last 3 visited users on top of Users listing page.
