$('.message a').click(function(){$('Form').animate({height: "toggle",opacity: "toggle"}, "slow");});
$(document).ready(function() {
    
    $('.create').click(function(event) {
      event.preventDefault();
      const fullname = $('#fullname').val();
      const username = $('#username').val();
      const password = $('#password').val();
      const email = $('#email').val(); 
    })
})
