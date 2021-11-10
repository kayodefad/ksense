window.addEventListener("DOMContentLoaded", function () {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => response.json())
    .then(users => {
      const table = document.querySelector("table tbody");

      for (let user of users) {
        let tr = document.createElement("tr");
        tr.dataset.id = user.id;
        let tableRowContent = `
          <tr>
            <th scope="row">${user.id}</th>
            <td id="name" data-id=${user.id}>${user.name}</td>
            <td>${user.username}</td>
            <td>@${user.email}</td>
          </tr>
          `;
        tr.innerHTML = tableRowContent;

        table.appendChild(tr);
      }
    });

  document.addEventListener("click", function (e) {
    const main = document.querySelector("#main");
    console.log(main);

    if (e.target && e.target.id == "name") {
      let id = e.target.getAttribute("data-id");

      let mainBody = `
      <h4 class="mb-2 text-center">USER ${id} POSTS</h4>
      <hr />
      <div class="row">`;

      fetch("https://jsonplaceholder.typicode.com/posts?userId=" + id)
        .then(response => response.json())
        .then(posts => {
          console.log(posts);

          for (let post of posts) {
            let cardContent = `
                <div class="col-md-6 col-lg-4 my-3">
                <div class="card">
                <div class="card-body">
                  <h5 class="card-title">${post.title.toUpperCase()}</h5>
                  <p class="card-text">${post.body}</p>
                </div>
                </div>
                </div>`;

            mainBody += cardContent;
            // innerDiv.innerHTML = cardContent;

            // div.appendChild(innerDiv);
          }

          mainBody += `</div>`;

          main.innerHTML = mainBody;
        });
    }
  });
});
