const adminLoginForm =
document.getElementById("adminLoginForm");

adminLoginForm.addEventListener("submit", async (e)=>{

  e.preventDefault();

  const email =
  document.getElementById("email").value;

  const password =
  document.getElementById("password").value;

  try {

    const response = await fetch(

      "http://localhost:5000/api/auth/login",

      {

        method:"POST",

        headers:{
          "Content-Type":"application/json",
        },

        body:JSON.stringify({
          email,
          password,
        }),

      }

    );

    const data = await response.json();

    if(response.ok){

      /* CHECK ADMIN */

      if(data.user.role !== "admin"){

        alert("Access Denied");

        return;

      }

      /* SAVE ADMIN */

      localStorage.setItem(
        "admin",
        JSON.stringify(data.user)
      );

      localStorage.setItem(
        "token",
        data.token
      );

      alert("Admin Login Successful");

      window.location.href =
      "admin-dashboard.html";

    } else {

      alert(data.message);

    }

  } catch (error) {

    console.log(error);

    alert("Server Error");

  }

});