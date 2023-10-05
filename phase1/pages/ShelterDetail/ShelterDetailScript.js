function scrollToNextImage() {
  const slider = document.querySelector(".slider");
  const sliderWidth = slider.clientWidth;
  const currentScrollLeft = slider.scrollLeft;
  const nextScrollLeft = currentScrollLeft + sliderWidth;

  // Check if we've reached the last image
  if (nextScrollLeft >= slider.scrollWidth) {
    // If so, smoothly scroll back to the first image
    slider.scrollTo({
      left: 0,
      behavior: "smooth",
    });
  } else {
    // Otherwise, scroll to the next image with smooth behavior
    slider.scrollTo({
      left: nextScrollLeft,
      behavior: "smooth",
    });
  }
}

setInterval(scrollToNextImage, 8000); // 5000 milliseconds = 5 seconds

const slider = document.querySelector(".slider");
let currentIndex = 0;

function moveSlider(direction) {
  scrollToNextImage();
  const translateX = -currentIndex * 100;
  slider.style.transform = `translateX(${translateX}%)`;
}
