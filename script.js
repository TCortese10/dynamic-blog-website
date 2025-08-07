//gets post data from localStorage
function getPosts() {
    return JSON.parse(localStorage.getItem("posts") || "[]");
}
// saves posts to localStorage
function savePosts(posts) {
    localStorage.setItem("posts", JSON.stringify(posts));
}
//adds posts and assigns an id to each one to access later with post.id
function addPost(post) {
    const posts = getPosts();
    post.id = Date.now().toString();
    posts.push(post);
    savePosts(posts);
}
// gets posts saved in local storage
function displayPosts() {
    const posts = getPosts();
    const container = document.getElementById("blogs");

    container.innerHTML = "";

    // loops through each post and creates cards
    posts.forEach(post => {
        const card = document.createElement("div");
        card.className = "blog-card";

        if (post.image) {
            const img = document.createElement("img");
            img.src = post.image;
            img.alt = "Post image";
            img.className = "blog-image"
            card.appendChild(img);
        }

        const title = document.createElement('h1');
        title.className = "blog-title";
        title.textContent = post.title;
        card.appendChild(title);

        const content = document.createElement("p");
        content.className = "blog-information";
        content.textContent = post.content;
        card.appendChild(content);

        const btn = document.createElement("a");
        btn.href = `post.html?id=${post.id}`;
        btn.className = "btn-read";
        btn.textContent = "Edit Post";
        card.appendChild(btn);

        container.appendChild(card);

    });
}

function getPost(id) {
    return getPosts().find(post => post.id === id);
}
//updates and saves posts
function updatePost(id, updatedPost) {
    const posts = getPosts();
    const num = posts.findIndex(post => post.id === id);
    if (num !== -1) {
        posts[num] = { ...posts[num], ...updatedPost };
        savePosts(posts);
    }
}
//deletes posts
function deletePost(id) {
    let posts = getPosts();
    posts = posts.filter(post => post.id !== id);
    savePosts(posts);
}