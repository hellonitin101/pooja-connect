const pandit = JSON.parse(localStorage.getItem("pandit"));

if(!pandit){

  window.location.href = "pandit-login.html";

}

/* PROFILE DATA */

document.getElementById("panditName").innerText =
pandit.name || "";

document.getElementById("profileName").innerText =
pandit.name || "";

document.getElementById("profileEmail").innerText =
pandit.email || "";

document.getElementById("profileLocation").innerText =
pandit.location || "Not Added";

document.getElementById("profileExperience").innerText =
pandit.experience || "Not Added";

document.getElementById("profileLanguages").innerText =
pandit.languages || "Not Added";

document.getElementById("profilePricing").innerText =
pandit.pricing || "Not Added";

/* LOGOUT */

const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click",()=>{

  localStorage.removeItem("token");

  localStorage.removeItem("pandit");

  alert("Logged Out");

  window.location.href = "index.html";

});

/* FETCH BOOKINGS */

async function fetchBookings(){

  try {

    const response = await fetch("http://localhost:5000/api/bookings");

    const bookings = await response.json();

    const bookingContainer =
    document.getElementById("bookingContainer");

    bookingContainer.innerHTML = "";

    const myBookings = bookings.filter((booking)=>{

      return booking.panditId === pandit._id;

    });

    if(myBookings.length === 0){

      bookingContainer.innerHTML = `

      <div class="empty-booking">

        <h3>No Bookings Yet</h3>

      </div>

      `;

      return;
    }

    myBookings.forEach((booking)=>{

      bookingContainer.innerHTML += `

      <div class="booking-card">

        <h3>${booking.userName}</h3>

        <p><strong>Puja:</strong> ${booking.pujaType}</p>

        <p><strong>Date:</strong> ${booking.bookingDate}</p>

        <p><strong>Time:</strong> ${booking.bookingTime}</p>

        <p><strong>Phone:</strong> ${booking.phone}</p>

        <p><strong>Address:</strong> ${booking.address}</p>

        <p><strong>Status:</strong> 
          <span class="${booking.status}">
            ${booking.status}
          </span>
        </p>

        <div class="booking-actions">

          <button
            class="accept-btn"
            onclick="updateBooking(
              '${booking._id}',
              'accepted'
            )"
          >
            Accept
          </button>

          <button
            class="reject-btn"
            onclick="updateBooking(
              '${booking._id}',
              'rejected'
            )"
          >
            Reject
          </button>

        </div>

      </div>

      `;

    });

  } catch (error) {

    console.log(error);

  }

}

fetchBookings();

/* UPDATE STATUS */

async function updateBooking(id,status){

  try {

    const response = await fetch(

      `http://localhost:5000/api/bookings/${id}`,

      {

        method:"PUT",

        headers:{
          "Content-Type":"application/json",
        },

        body:JSON.stringify({
          status,
        }),

      }

    );

    const data = await response.json();

    if(response.ok){

      alert("Booking Updated");

      fetchBookings();

    } else {

      alert(data.message);

    }

  } catch (error) {

    console.log(error);

  }

}