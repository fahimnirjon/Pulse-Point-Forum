const postContainer = document.getElementById("posts");
const readPostContainer = document.getElementById("readPost");
const readCounter = document.getElementById("readCounter");
const latestPosts = document.getElementById("latestPosts");
let dataContainer = [];
let latestPostContainer = [];

const latestPost = () => {
  latestPostContainer.forEach((data) => {
    console.log(data);
    const div = document.createElement("div");
    const html = ` <div class="card w-80 bg-base-100 shadow-xl border border-solid">
        <div class="card-body space-y-3">
          <figure>
            <img
              class="h-48 rounded-box w-full object-cover"
              src="${data.cover_image}"
              alt="Album"
            />
          </figure>
          <div class="text-neutral-500 flex gap-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
        </svg>
        <p>
        ${data.author.posted_date ? data.author.posted_date : "No Publish Date"}
       </p></div>
          <h2 class="font-bold">
            ${data.title}
          </h2>
          <p class="text-neutral-500">
           ${data.description}
          </p>
          <div class="card-actions gap-4">
            <img
              class="w-12 h-12 rounded-full"
              src="${data.profile_image}"
            />
            <div>
              <h3 class="font-medium">${data.author.name}</h3>
              <p>${
                data.author.designation ? data.author.designation : "Unknown"
              }</p>
            </div>
          </div>
        </div>
      </div>`;
    div.innerHTML = html;
    latestPosts.appendChild(div);
  });
};
const getPost = async (cetagory = "") => {
  let url = "https://openapi.programming-hero.com/api/retro-forum/posts";
  if (cetagory) {
    url = `https://openapi.programming-hero.com/api/retro-forum/posts?category=${cetagory}`;
  }

  try {
    const allPost = await fetch(
      "https://openapi.programming-hero.com/api/retro-forum/latest-posts"
    );
    const allPostBbj = await allPost.json();
    latestPostContainer = allPostBbj;

    const data = await fetch(url);
    const dataObject = await data.json();

    dataContainer = dataObject.posts;
    // const div = document.createElement("div");
    // div.innerHTML = `<span class="text-center loading loading-bars loading-lg"></span>`;
    const loader = `<span class="mx-auto loading loading-bars loading-lg"></span>`;
    postContainer.innerHTML = loader;
    latestPosts.innerHTML = loader;
    setTimeout(() => {
      if (dataContainer.length === 0) {
        postContainer.innerHTML = `<div role="alert" class="alert alert-error">
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>Error! Did not found any post with #${cetagory}.</span>
          </div>`;
      } else {
        postContainer.innerHTML = "";
        post();
      }
      latestPosts.innerHTML = "";
      latestPost();
    }, 2000);
  } catch (error) {
    console.log(error);
  }
};

const post = () => {
  dataContainer.forEach((data, index) => {
    const div = document.createElement("div");

    const html = `   <div class="card items-start card-side bg-base-200 p-6 shadow-xl">
<div class="relative">
  <img
    class="w-16 p-1 rounded-box"
    src="${data.image}"
    alt="Movie"
  />
  <div
    class="w-3 h-3 absolute top-0 right-0 rounded-full bg-${
      data.isActive ? "green" : "rose"
    }-500"
  ></div>
</div>
<div class="card-body py-0 space-y-3">
  <div class="flex gap-6 text-sm inter">
    <span>#${data.category}</span> <span>Author : ${data.author.name}</span>
  </div>
  <h2 class="card-title">
    ${data.title}
  </h2>
  <p class="inter">
   ${data.description}
  </p>
  <div
    class="border-b-2 border-neutral-300 border-dashed"
  ></div>
  <div class="card-actions justify-between">
    <div class="flex gap-6">
      <div class="flex gap-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
          />
        </svg>
        <span> ${data.comment_count} </span>
      </div>
      <div class="flex gap-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>

        <span> ${data.view_count} </span>
      </div>
      <div class="flex gap-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>

        <span> ${data.posted_time} min </span>
      </div>
    </div>
    <div>
      <div onclick="handleRead(${index})" class="cursor-pointer bg-green-600 text-white rounded-full p-[4px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21.75 9v.906a2.25 2.25 0 0 1-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 0 0 1.183 1.981l6.478 3.488m8.839 2.51-4.66-2.51m0 0-1.023-.55a2.25 2.25 0 0 0-2.134 0l-1.022.55m0 0-4.661 2.51m16.5 1.615a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V8.844a2.25 2.25 0 0 1 1.183-1.981l7.5-4.039a2.25 2.25 0 0 1 2.134 0l7.5 4.039a2.25 2.25 0 0 1 1.183 1.98V19.5Z"
          />
        </svg>
      </div>
    </div>
  </div>
</div>
</div>`;
    div.innerHTML = html;
    postContainer.appendChild(div);
  });
};

const handleRead = (index) => {
  const div = document.createElement("div");
  const html = `   <div
  class="flex p-3 rounded-box justify-between bg-white gap-6"
  >
  <p>${dataContainer[index].title}</p>
  <div class="flex gap-3">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-6 h-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
      />
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
      />
    </svg>
    <span> ${dataContainer[index].view_count} </span>
  </div>
  </div>`;

  div.innerHTML = html;
  readPostContainer.appendChild(div);
  readCounter.innerText = parseInt(readCounter.innerText) + 1;
};

getPost();
