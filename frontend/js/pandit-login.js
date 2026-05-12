const panditLoginForm = document.getElementById("panditLoginForm");

panditLoginForm.addEventListener("submit", async (e)=>{

  e.preventDefault();

  const email = document.getElementById("email").value;

  const password = document.getElementById("password").value;

  try {

    const response = await fetch("http://localhost:5000/api/auth/login",{

      method:"POST",

      headers:{
        "Content-Type":"application/json",
      },

      body:JSON.stringify({
        email,
        password,
      }),

    });

    const data = await response.json();

    if(response.ok){

      localStorage.setItem("token",data.token);

      localStorage.setItem("pandit",JSON.stringify(data.user));

      alert("Pandit Login Successful");

      window.location.href = "pandit-dashboard.html";

    } else {

      alert(data.message);

    }

  } catch (error) {

    console.log(error);

    alert("Server Error");

  }

});