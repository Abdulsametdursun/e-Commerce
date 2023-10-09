const url = "https://jsonplaceholder.typicode.com/users";

// fetch: allows us to make requests to APIs
fetch(url)
  // successful answer
  .then((response) => {
    //makes incoming json data usable in js
    return response.json();
  })
  //runs after data is processed
  .then(renderUsers)
  //  unsuccessful answer
  .catch(() => {
    console.log("ERROR");
  });

//return users and prints them on the screen
function renderUsers(data) {
  data.forEach((user) => document.write(user.name + "<br>"));
}
