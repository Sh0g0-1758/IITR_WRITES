document
  .getElementsByTagName("body")[0]
  .addEventListener("mousemove", function (n) {
    (t.style.left = n.clientX + "px"),
      (t.style.top = n.clientY + "px"),
      (e.style.left = n.clientX + "px"),
      (e.style.top = n.clientY + "px"),
      (i.style.left = n.clientX + "px"),
      (i.style.top = n.clientY + "px");
  });
var t = document.getElementById("cursor"),
  e = document.getElementById("cursor2"),
  i = document.getElementById("cursor3");
function n(t) {
  e.classList.add("hover", "hover-2"), i.classList.add("hover", "hover-2");
}
function s(t) {
  e.classList.remove("hover", "hover-2"),
    i.classList.remove("hover", "hover-2");
}
s();
function o(t) {
  t.addEventListener("mouseover", n), t.addEventListener("mouseout", s);
}
