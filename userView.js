import {getQueryParam, saveStorage, storeLastUsers} from "./utils.js";

import User from "./Users.js";

//Get DOM container
const userContainer = $(".user-container");

//Get posts from DummyJson api
const paramUserId = getQueryParam("userId");
const usrIdx = User.users.findIndex((user) => user.id === Number(paramUserId));
const user = User.users[usrIdx];

storeLastUsers(user)

//Create post with DUMMYJson then cache it
async function createPost(body, title) {
    const newPost = await fetch("https://dummyjson.com/posts/add", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            title: title,
            userId: user.id,
            body: body,
            reactions: {likes: 0, dislikes: 0},
        }),
    }).then((res) => res.json());

    newPost.views = 0;

    user.posts.push(newPost);

    saveStorage("users", User.users);
}

//Dynamically render user details on page

await User.cachePosts(paramUserId).then();

User.renderUserDetails(paramUserId);

User.renderCourses($(".courses-list"), paramUserId);

await User.renderPosts(paramUserId);

$(".modal").on("click", "button", (e) => {
    e.preventDefault();
    if ($(e.target).is(".modal-delete")) {
        const checkedBoxes = $(".secondary-checkbox:checked")
            .map(function () {
                return Number($(this).val());
            })
            .get();

        user.posts = user.posts.filter((post) => !checkedBoxes.includes(post.id));

        saveStorage("users", User.users);

        location.reload();
    }
});

$(".post-form").on("click", "button", async (e) => {
    e.preventDefault();

    if ($(e.target).is(".modal-save")) {
        let form = $(".post-form").get(0);
        let submitter = $(".modal-save").get(0);

        const formData = new FormData(form, submitter);

        if (user.posts.find((post) => post.title === formData.get("title").trim()))
            return;

        const newPost = await createPost(
            formData.get("body").trim(),
            formData.get("title").trim(),
        );

        location.reload();
    }
});
