const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", async (e)=>{

  e.preventDefault();

  const userData = {

    name: document.getElementById("name").value,

    email: document.getElementById("email").value,

    password: document.getElementById("password").value,

    role: document.getElementById("role").value,

  };

  try {

    const response = await fetch("https://pooja-connect.onrender.com/api/auth/register",{

      method:"POST",

      headers:{
        "Content-Type":"application/json",
      },

      body:JSON.stringify(userData),

    });

    const data = await response.json();

    if(response.ok){

      alert("Registration Successful");

      window.location.href = "login.html";

    } else {

      alert(data.message);

    }

  } catch (error) {

    console.log(error);

    alert("Server Error");

  }

});
