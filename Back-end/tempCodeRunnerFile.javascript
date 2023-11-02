fetch("http://127.0.0.1:8000/api/v1/users/register", {
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    username: "asdkhi234",
    email: "asdkhi234@gmail.com",
    password: "asdkhi234edas132",
    password_confirm: "asdkhi234edas132",
    first_name: "asdasfdg",
    last_name: "dsfgfghgfh",
  }),
})
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then((response) => console.log(JSON.stringify(response)))
  .catch((error) => console.error("Error:", error));
