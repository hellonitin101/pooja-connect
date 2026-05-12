const usersContainer =
document.getElementById("usersContainer");

const panditsContainer =
document.getElementById("panditsContainer");

const bookingsContainer =
document.getElementById("bookingsContainer");

/* FETCH USERS */

async function fetchUsers(){

  try {

    const response = await fetch(
      "http://localhost:5000/api/auth/users"
    );

    const users = await response.json();

    const normalUsers = users.filter(
      user => user.role === "user"
    );

    const pandits = users.filter(
      user => user.role === "pandit"
    );

    /* STATS */

    document.getElementById("totalUsers").innerText =
    normalUsers.length;

    document.getElementById("totalPandits").innerText =
    pandits.length;

    /* USERS */

    usersContainer.innerHTML = "";

    normalUsers.forEach((user)=>{

      usersContainer.innerHTML += `

      <div class="admin-card">

        <h3>${user.name}</h3>

        <p>${user.email}</p>

        <button
          class="delete-btn"
          onclick="deleteUser('${user._id}')"
        >
          Delete
        </button>

      </div>

      `;

    });

    /* PANDITS */

    panditsContainer.innerHTML = "";

    pandits.forEach((pandit)=>{

      panditsContainer.innerHTML += `

      <div class="admin-card">

        <h3>${pandit.name}</h3>

        <p>${pandit.email}</p>

        <p>${pandit.location || ""}</p>

        <button
          class="delete-btn"
          onclick="deleteUser('${pandit._id}')"
        >
          Delete
        </button>

      </div>

      `;

    });

  } catch (error) {

    console.log(error);

  }

}

fetchUsers();

/* FETCH BOOKINGS */

async function fetchBookings(){

  try {

    const response = await fetch(
      "http://localhost:5000/api/bookings"
    );

    const bookings = await response.json();

    document.getElementById("totalBookings").innerText =
    bookings.length;

    bookingsContainer.innerHTML = "";

    bookings.forEach((booking)=>{

      bookingsContainer.innerHTML += `

      <div class="admin-card">

        <h3>${booking.userName}</h3>

        <p>${booking.pujaType}</p>

        <p>${booking.bookingDate}</p>

        <p>Status:
          <span class="${booking.status}">
            ${booking.status}
          </span>
        </p>

      </div>

      `;

    });

  } catch (error) {

    console.log(error);

  }

}

fetchBookings();

/* DELETE USER */

async function deleteUser(id){

  const confirmDelete =
  confirm("Delete this user?");

  if(!confirmDelete) return;

  try {

    const response = await fetch(

      `http://localhost:5000/api/auth/users/${id}`,

      {
        method:"DELETE",
      }

    );

    const data = await response.json();

    if(response.ok){

      alert("Deleted Successfully");

      fetchUsers();

    } else {

      alert(data.message);

    }

  } catch (error) {

    console.log(error);

  }

}

/* LOGOUT */

document.getElementById("adminLogoutBtn")
.addEventListener("click",()=>{

  localStorage.clear();

  window.location.href = "index.html";

});