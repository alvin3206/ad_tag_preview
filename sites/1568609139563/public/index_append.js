var gptNumber = document.querySelectorAll("[id*='div-gpt']").length;

document.querySelectorAll(".bubble, .ui-draggable ,.ui-draggable-handle")[0].addEventListener("click", function() {
  console.log(gptNumber);
  document.querySelector(".message-mit").innerHTML = "DFP 廣告空間：" + gptNumber;
});
