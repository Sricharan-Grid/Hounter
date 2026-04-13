import { debuggerLog } from "./config.js";
import { errorHandler, getJSONdata } from "./helper.js";

const postsContainerEl = document.querySelector(
  ".blogs__posts-container--posts",
);
const moreArticleEl = document.querySelector(".blogs__headings--btn");
const postContainer = document.querySelector(".blogs__posts-container--posts");
const highlightedPostEl = document.querySelector(
  ".blogs__posts-container--highlightedPost",
);
let blogs = [];
let sliceIndex = 0;

// Blog Post
let fetchBlogs = async () => {
  try {
    const blogPosts = await getJSONdata("./propertiesList.json");
    return blogPosts || [];
  } catch (err) {
    errorHandler(err, fetchBlogs(), "blogPostScript");
  }
};

// Render Blog Posts
let renderBlogs = (posts) => {
  try {
    if (posts.length) {
      postsContainerEl.innerHTML = "";
      posts.forEach((post) => {
        let postTemplate = `  <li class="postCard" data-id=${post.id}>
            <img src="${post.propertyImage}" alt="${post.ownerName}'s Post" class="postCard--img" />
            <div class="postCard__details">
              <!-- Author Details  -->
              <div class="postCard__details--card-owner card-owner">
                <img
                  src="${post.ownerImage}"
                  alt="${post.ownerName}'s Image"
                  class="card-owner__profilePic"
                />

                <div
                  class="card-owner__profileDetails postCard__details--owner"
                >
                  <p
                    class="card-owner__profileDetails--ownerName postCard__details--authorName"
                  >
                    ${post.ownerName}
                  </p>
                </div>
              </div>
              <p class="postCard__details--blog-headline">
                ${post.headline}
              </p>

              <div class="postCard__details--metadata">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.99 2C6.47 2 2 6.48 2 12C2 17.52 6.47 22 11.99 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 11.99 2ZM16 16C15.9075 16.0927 15.7976 16.1663 15.6766 16.2164C15.5557 16.2666 15.426 16.2924 15.295 16.2924C15.164 16.2924 15.0343 16.2666 14.9134 16.2164C14.7924 16.1663 14.6825 16.0927 14.59 16L11.3 12.71C11.2055 12.6174 11.1303 12.5069 11.0788 12.3851C11.0273 12.2632 11.0005 12.1323 11 12V8C11 7.45 11.45 7 12 7C12.55 7 13 7.45 13 8V11.59L16 14.59C16.39 14.98 16.39 15.61 16 16Z"
                    fill="#888B97"
                  />
                </svg>

                <p>${post.minsRead} min read</p>
                <span>|</span>
                <p>${post.dateOfPublish}</p>
              </div>
            </div>
          </li>`;

        postsContainerEl?.insertAdjacentHTML("beforeend", postTemplate);
      });
    } else {
      errorHandler(
        { error: `post is ${post}` },
        "renderBlogs()",
        "blogPostScript",
      );
    }
  } catch (err) {
    errorHandler(err, "renderBlogs()", "blogPostScript");
  }
};

// Render Highlighted Posts
let renderHighlitedPost = (blogPostId) => {
  try {
    if (debuggerLog) {
      console.log(`Invoked renderHighlitedPost() blogPostId : ${blogPostId}`);
    }

    let highlightedBlog = [];
    if (blogPostId) {
      highlightedBlog = blogs.filter((e) => e.id === blogPostId) || [];
    } else {
      errorHandler(
        { error: `blogPostId is ${blogPostId}` },
        "renderHighlitedPost()",
        "blogPostScript",
      );
    }

    if (highlightedBlog.length) {
      let highlightedBlogPost = highlightedBlog[0];
      highlightedPostEl.innerHTML = "";
      let highlightedPostTemplate = `<div class="postCard highlight-postCard">
            <img
              src="${highlightedBlogPost.propertyImage}"
              alt="${highlightedBlogPost.ownerName}'s Post"
              class="postCard--img highlight-postCard--img"
            />
            <div class="postCard__details highlight-postCard__details">
              <!-- Author Details  -->
              <div class="postCard__details--card-owner card-owner">
                <img
                  src="${highlightedBlogPost.ownerImage}"
                  alt="${highlightedBlogPost.ownerName}'s Image"
                  class="card-owner__profilePic"
                />

                <div
                  class="card-owner__profileDetails postCard__details--owner highlight-postCard__details--owner"
                >
                  <p
                    class="card-owner__profileDetails--ownerName postCard__details--authorName highlight-postCard__details--authorName"
                  >
                   ${highlightedBlogPost.ownerName}
                  </p>
                  
                </div>
              </div>
              <p
                class="postCard__details--blog-headline highlight-postCard__details--blog-headline"
              >
                ${highlightedBlogPost.headline}
              </p>

              <p
                class="postCard__details--blog-description highlight-postCard__details--blog-description"
              >
                ${highlightedBlogPost.description}
              </p>
              

              <div
                class="postCard__details--metadata highlight-postCard__details--metadata"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.99 2C6.47 2 2 6.48 2 12C2 17.52 6.47 22 11.99 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 11.99 2ZM16 16C15.9075 16.0927 15.7976 16.1663 15.6766 16.2164C15.5557 16.2666 15.426 16.2924 15.295 16.2924C15.164 16.2924 15.0343 16.2666 14.9134 16.2164C14.7924 16.1663 14.6825 16.0927 14.59 16L11.3 12.71C11.2055 12.6174 11.1303 12.5069 11.0788 12.3851C11.0273 12.2632 11.0005 12.1323 11 12V8C11 7.45 11.45 7 12 7C12.55 7 13 7.45 13 8V11.59L16 14.59C16.39 14.98 16.39 15.61 16 16Z"
                    fill="#888B97"
                  />
                </svg>

                <p>${highlightedBlogPost.minsRead} min read</p>
                <span>|</span>
                <p>${highlightedBlogPost.dateOfPublish}</p>
              </div>
            </div>
          </div>`;

      highlightedPostEl?.insertAdjacentHTML(
        "beforeend",
        highlightedPostTemplate,
      );
    } else {
      errorHandler(
        { error: `blogPostId is ${blogPostId}` },
        "renderHighlitedPost()",
        "blogPostScript",
      );
    }
  } catch (err) {
    errorHandler(err, "renderHighlitedPost()", "blogPostScript");
  }
};

// Trigger Render Function
const triggerRender = () => {
  try {
    if (debuggerLog) {
      console.log(`Invoked renderHighlitedPost()`);
    }

    if (blogs.length) {
      let slicedBlogs = blogs.slice(sliceIndex, sliceIndex + 3);
      renderBlogs(slicedBlogs);
    } else {
      errorHandler(
        { error: `blogs is ${blogs}` },
        "triggerRender()",
        "blogPostScript",
      );
    }
  } catch (err) {
    errorHandler(err, "triggerRender()", "blogPostScript");
  }
};

//OnLoad function
const onLoad = async () => {
  try {
    if (debuggerLog) {
      console.log(`Invoked onLoad()`);
    }

    blogs = await fetchBlogs();

    if (blogs.length) {
      triggerRender(blogs);
      renderHighlitedPost("house-1");
    } else {
      errorHandler(
        { error: `blogs is ${blogs}` },
        "onLoad()",
        "blogPostScript",
      );
    }
  } catch (err) {
    errorHandler(err, "onLoad()", "blogPostScript");
  }
};

//More Article Event Listener
moreArticleEl.addEventListener("click", () => {
  try {
    if (debuggerLog) {
      console.log(`Invoked moreArticleEl Event Listener`);
    }

    if (sliceIndex >= 12) {
      sliceIndex = 0;
      triggerRender();
    } else {
      sliceIndex += 3;
      triggerRender();
    }
  } catch (err) {
    errorHandler(err, "moreArticleEl Event Listener", "blogPostScript");
  }
});

postContainer.addEventListener("click", (event) => {
  if (debuggerLog) {
    console.log(`Invoked postContainer Event Listener`);
  }
  const postEl = event.target.closest(".postCard");

  if (postEl) {
    try {
      if (debuggerLog) {
        console.log(`Invoked postEl Event Listener`);
      }
      renderHighlitedPost(postEl?.dataset?.id);
    } catch (err) {
      errorHandler(err, "postCardEl Event Listener", "blogPostScript");
    }
  }
});
window.addEventListener("load", onLoad());
