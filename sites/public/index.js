console.log("index.js loaded");

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
