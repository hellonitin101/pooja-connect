const panditForm = document.getElementById("panditForm");

panditForm.addEventListener("submit", async (e)=>{

  e.preventDefault();

  const panditData = {

    name: document.getElementById("name").value,

    email: document.getElementById("email").value,

    password: document.getElementById("password").value,

    phone: document.getElementById("phone").value,

    location: document.getElementById("location").value,

    experience: document.getElementById("experience").value,

    languages: document.getElementById("languages").value,

    rituals: document.getElementById("rituals").value,

    pricing: document.getElementById("pricing").value,

    bio: document.getElementById("bio").value,

    role:"pandit"

  };

  try {

    const response = await fetch("https://pooja-connect.onrender.com/api/auth/register",{

      method:"POST",

      headers:{
        "Content-Type":"application/json",
      },

      body:JSON.stringify(panditData),

    });

    const data = await response.json();

    if(response.ok){

      alert("Pandit Registered Successfully");

      window.location.href = "pandit-login.html";

    } else {

      alert(data.message);

    }

  } catch (error) {

    console.log(error);

    alert("Server Error");

  }

});
