/* When the user clicks on the notifications text, 
toggle on/off the notifications */
function toggleNotifications() {
  document
    .getElementById("notificationsDropdown")
    .classList.toggle("show");
}

// Close the notifications if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    var notifications = document.getElementsByClassName(
      "Notification__dropdown"
    );
    var i;
    for (i = 0; i < notifications.length; i++) {
      var openNotifications = notifications[i];
      if (openNotifications.classList.contains("show")) {
        openNotifications.classList.remove("show");
      }
    }
  }
};