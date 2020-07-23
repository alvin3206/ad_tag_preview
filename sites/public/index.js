console.log("index.js loaded");

document.querySelector("#disableSelectOption").addEventListener("change", function() {
  if ($(".disableLink").attr('disabled')) {
    $(".disableLink").removeAttr('disabled');
  } else {
    $(".disableLink").attr('disabled', 'disabled');
  }
});
