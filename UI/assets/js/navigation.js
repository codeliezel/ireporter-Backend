
function myFunction() {
  const x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

function Password() {
  const x = document.getElementById("pwd");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}
