let showsignup= document.getElementsByClassName("signup")[0]
let showlogin= document.getElementsByClassName("login")[0]
let signupdata= document.getElementsByClassName("signupdata")
let logindata= document.getElementsByClassName("logindata")
const formContainer = document.querySelector(".second-container");
const loaderContainer = document.querySelector(".loader-container");

function ShowSignup() {
  showlogin.style.display = "none";
  showsignup.style.display = "block";
}
function ShowLogin() {
  showlogin.style.display = "block";
  showsignup.style.display = "none";
}

function showLoaderAndRedirect() {
    formContainer.style.display = "none";
    loaderContainer.style.display = "flex";

    setTimeout(() => {
        window.location.href = "index.html";
    }, 2000); 
}

function toast(message, type = "success") {
    Toastify({
        text: message,
        duration: 2000,
        close: true,
        gravity: "top",
        position: "center",
        stopOnFocus: true,
        style: {
            background:"#f2bd12",
        },
    }).showToast();
}


 function Login() {
 const userlogindata = {
 email: logindata[0].value.trim(),
 password: logindata[1].value.trim(),
 };
 if (!logindata[0].value || !logindata[1].value) {
toast("Please Enter the data");
 return;
 }

 const users = JSON.parse(localStorage.getItem("users")) || [];

 const user = users.find(
   (user) => user.email === userlogindata.email && user.password === userlogindata.password
 );

 if (user) {
  toast("Login Successfully");
   sessionStorage.setItem('loggedInUser', JSON.stringify(user));
   showLoaderAndRedirect();
 } else {
   toast("Please Enter Correct Data");
 }
}

 function Signup() {
 const userData ={
 name: signupdata[0].value.trim(),
 email: signupdata[1].value.trim(),
 password: signupdata[2].value.trim(),
 };
 if (!signupdata[0].value || !signupdata[1].value || !signupdata[2].value) {
  toast("Please Enter the data");
 return;
 }

 const users = JSON.parse(localStorage.getItem("users")) || [];

 if (users.some(user => user.email === userData.email)) {
   toast("User already exists! Please login.");
   return;
 }
 users.push(userData);
 localStorage.setItem("users", JSON.stringify(users));
 sessionStorage.setItem('loggedInUser', JSON.stringify(userData));
 toast("Signup Successfully");
 showLoaderAndRedirect();
 }

  function togglePasswordVisibility(inputId) {
    const passwordInput = document.getElementById(inputId);
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
    } else {
        passwordInput.type = "password";
    }
  }