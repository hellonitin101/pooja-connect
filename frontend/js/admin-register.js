const adminRegisterForm =
document.getElementById("adminRegisterForm");

adminRegisterForm.addEventListener("submit",async(e)=>{

  e.preventDefault();

  const adminData = {

    name:document.getElementById("name").value,

    email:document.getElementById("email").value,

    password:document.getElementById("password").value,

    role:"admin"

  };

  try {

    const response = await fetch(

      "http://localhost:5000/api/auth/register",

      {

        method:"POST",

        headers:{
          "Content-Type":"application/json",
        },

        body:JSON.stringify(adminData),

      }

    );

    const data = await response.json();

    if(response.ok){

      alert("Admin Registered Successfully");

      window.location.href = "admin-login.html";

    } else {

      alert(data.message);

    }

  } catch (error) {

    console.log(error);

    alert("Server Error");

  }

});