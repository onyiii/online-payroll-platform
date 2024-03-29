$('.message a').click(function(){$('Form').animate({height: "toggle",opacity: "toggle"}, "slow");});
$(document).ready(function() {
    
    $('.create').click(function(event) {
      event.preventDefault();
      const fullname = $('#fullname').val();
      const username = $('#username').val();
      const password = $('#password').val();
      const email = $('#email').val(); 
      console.log (fullname, username,password,email);
      if (!fullname || !username || !password || !email) {
        $('.writeup').html('Kindly fill in all fields');
        return;
      }
      $.ajax({
        method: 'GET',
        url: `http://localhost:3000/users?email=${email}`,
        data: {
          email,
        },
        
        success: function(response) {
          if (response.length) {
            $('.writeup').html('User already exist');
          } else {
            $.ajax({
              method: 'POST',
              url: 'http://localhost:3000/users',
              data: {
                fullname,
                username,
                email,
                password,
              },
    
              success: function() {
              $('.writeup').html('Registered');
            
            }
        })  
       }
      }
    })
     
  })
})

$('.signing').click(function(event) {
  event.preventDefault();
  const passwordlogin = $('#passwordlogin').val();
  const usernamelogin = $('#usernamelogin').val();
  if (!passwordlogin || !usernamelogin) {
    $('.writeup').html('Kindly fill in all fields');
    return;
  }
  $.ajax({
    method: 'GET',
    url: `http://localhost:3000/users?username=${usernamelogin}&password=${passwordlogin}`,
    data: {
      username: usernamelogin,
      password: passwordlogin,
    },
    success: function(response) {
      if (response.length) {
        $('.writeup').html('Login successful');
        localStorage.setItem('username', usernamelogin);
        window.location.assign('payroll.html');
      } else {
        $('.writeup').html('Username or password Incorrect');
      }
    },
  });
});