console.log("index.js loaded");

var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

window.onload = function() {
  $('.toast').toast('show');
  if (w < 768) {
    $('.toast-container').removeClass('toast-position');
  }
  if (!$("#mock").hasClass('disabled')) {
    $('.alert').alert('close');
  }
};



document.querySelector("#disableSelectOption").addEventListener("change", function() {
  if ($(".disableLink").attr('disabled')) {
    $(".disableLink").removeAttr('disabled');
  } else {
    $(".disableLink").attr('disabled', 'disabled');
  }
});

document.querySelector("#start").addEventListener("click", function() {
  console.log("test");
  if (!$("#mock").hasClass('disabled')) {
    $("#mock").addClass('disabled');
  }

});


document.querySelector(".tagForm").addEventListener("submit", function() {
  $("#mock").html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>Loading...');
});
