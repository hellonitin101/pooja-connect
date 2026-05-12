const panditContainer = document.getElementById("panditContainer");

async function fetchPandits() {

  try {

    const response = await fetch("http://localhost:5000/api/pandits");

    const pandits = await response.json();

    panditContainer.innerHTML = "";

    if(pandits.length === 0){

      panditContainer.innerHTML = `
      
      <div class="no-pandits">

        <h3>No Pandits Available</h3>

        <p>
          Be the first pandit to register on PujaConnect.
        </p>

      </div>

      `;

      return;
    }

    pandits.forEach((pandit)=>{

      panditContainer.innerHTML += `

      <div class="pandit-card">

        <div class="pandit-top">

          <div class="pandit-avatar">
            <i class="fas fa-user"></i>
          </div>

          <div>

            <h3>${pandit.name}</h3>

            <p>${pandit.experience || "Experience Not Added"}</p>

          </div>

        </div>

        <div class="pandit-details">

          <div class="detail-box">
            <h4>Location</h4>
            <span>${pandit.location || "Not Added"}</span>
          </div>

          <div class="detail-box">
            <h4>Languages</h4>
            <span>${pandit.languages || "Not Added"}</span>
          </div>

          <div class="detail-box">
            <h4>Rituals</h4>
            <span>${pandit.rituals || "Not Added"}</span>
          </div>

          <div class="detail-box">
            <h4>Pricing</h4>
            <span>${pandit.pricing || "Not Added"}</span>
          </div>

        </div>

        <div class="pandit-bio">

          <h4>About Pandit</h4>

          <p>
            ${pandit.bio || "No bio added yet."}
          </p>

        </div>

        <button 
          class="book-btn"
          onclick="openBookingModal(
            '${pandit._id}',
            '${pandit.name}'
          )"
        >
          Book Now
        </button>

      </div>

      `;

    });

  } catch (error) {

    console.log(error);

  }

}

fetchPandits();

/* OPEN MODAL */

function openBookingModal(panditId,panditName){

  document.getElementById("bookingModal").style.display = "flex";

  document.getElementById("panditId").value = panditId;

  document.getElementById("panditName").value = panditName;

}

/* CLOSE MODAL */

function closeBookingModal(){

  document.getElementById("bookingModal").style.display = "none";

}

/* BOOKING FORM */

const bookingForm = document.getElementById("bookingForm");

bookingForm.addEventListener("submit",async(e)=>{

  e.preventDefault();

  const bookingData = {

    userName:document.getElementById("userName").value,

    userEmail:document.getElementById("userEmail").value,

    phone:document.getElementById("phone").value,

    address:document.getElementById("address").value,

    pujaType:document.getElementById("pujaType").value,

    bookingDate:document.getElementById("bookingDate").value,

    bookingTime:document.getElementById("bookingTime").value,

    message:document.getElementById("message").value,

    panditId:document.getElementById("panditId").value,

    panditName:document.getElementById("panditName").value,

  };

  try {

    const response = await fetch("http://localhost:5000/api/bookings",{

      method:"POST",

      headers:{
        "Content-Type":"application/json",
      },

      body:JSON.stringify(bookingData),

    });

    const data = await response.json();

    if(response.ok){

      alert("Booking Request Sent");

      bookingForm.reset();

      closeBookingModal();

    } else {

      alert(data.message);

    }

  } catch (error) {

    console.log(error);

    alert("Server Error");

  }

});