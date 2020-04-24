const btn = document.querySelector(".btn-get-post");
const btnAddPost = document.querySelector(".btn-add-post");

const container = document.querySelector(".container");

function getPosts(cb) {
  const xhr = new XMLHttpRequest();

  xhr.open("get", "https://jsonplaceholder.typicode.com/posts");
  xhr.addEventListener("load", () => {
    const response = JSON.parse(xhr.responseText);
    cb(response);
  });

  xhr.addEventListener("error", () => {
    console.log("error");
  });

  xhr.send();
}

function createPost(body, cb) {
  const xhr = new XMLHttpRequest();

  xhr.open("post", "https://jsonplaceholder.typicode.com/posts");
  xhr.addEventListener("load", () => {
    const response = JSON.parse(xhr.responseText);
    cb(response);
  });

  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

  xhr.addEventListener("error", () => {
    console.log("error");
  });

  xhr.send(JSON.stringify(body));
}

function createTemplate(post) {
  const card = document.createElement("div");
  card.classList.add("card", "mt-2");

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body", "mt-2");

  const title = document.createElement("h5");
  title.classList.add("card-title");
  title.textContent = post.title;

  const article = document.createElement("p");
  article.classList.add("card-text");
  article.textContent = post.body;

  cardBody.appendChild(title);

  cardBody.appendChild(article);

  card.appendChild(cardBody);
  return card;
}

function renderText(response) {
  const fragment = document.createDocumentFragment();

  response.forEach((post) => {
    const card = createTemplate(post);

    fragment.appendChild(card);
  });

  container.appendChild(fragment);
}

btn.addEventListener("click", () => {
  getPosts(renderText);
});

btnAddPost.addEventListener("click", () => {
  const newPost = {
    title: "foo",
    body: "bar",
    userId: 1,
  };
  createPost(newPost, (response) => {
    const card = createTemplate(response);
    container.insertAdjacentElement("afterBegin", card);
  });
});
