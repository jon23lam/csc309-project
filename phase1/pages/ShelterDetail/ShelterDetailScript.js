const slider = document.querySelector(".slider");
const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");

let currentIndex = 0;
let slideCount = slider.children.length;

prevButton.addEventListener("click", () => {
  moveSlider(-1);
});

nextButton.addEventListener("click", () => {
  moveSlider(1);
});

function moveSlider(direction) {
  currentIndex += direction;

  if (currentIndex < 0) {
    currentIndex = slideCount - 1;
  } else if (currentIndex >= slideCount) {
    currentIndex = 0;
  }

  slider.children[currentIndex].scrollIntoView({
    block: "nearest",
    behavior: "smooth",
    inline: "center",
  });
}
