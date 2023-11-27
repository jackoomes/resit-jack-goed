let lastX, lastY; // To store the previous cursor position
//let totalDistance = 0; // To track the total distance the cursor takes
// let topMost = 0;

// const GROWTH_RATE = 0.25; // Adjust this value to control the growth rate

// const WIDTH_FACTOR = 6;
// const MIN_WIDTH = 800;
// const MAX_WIDTH = 1000;

// function initializeHoverListeners(hoverElement) {
//   function onMouseMove(event) {
//     // Calculate the distance between the previous position and the current position
//     const deltaX = event.clientX - lastX;
//     const deltaY = event.clientY - lastY;

//     // Calculate the distance traveled in this move
//     const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);

//     // Multiply the distance by the growth rate to slow down the growth
//     const scaledDistance = distance * GROWTH_RATE;

//     // Add the scaled distance to the total distance
//     totalDistance += scaledDistance;

//     // Calculate the size based on the total distance
//     const size = MIN_SIZE + totalDistance;

//     const origWdt = hoverElement.dataset.width;
//     const newWdt = MIN_SIZE + totalDistance;
//     const origHgt = hoverElement.clientHeight; //hoverElement.dataset.height;
//     const newHgt = (origHgt * newWdt) / origWdt;

//     console.log(origWdt);
//     hoverElement.style.width = `${origWdt}px`;
//     hoverElement.style.height = `auto`;
//     hoverElement.style.transformOrigin = "0 0";
//     hoverElement.style.transform = `scale( ${newWdt / origWdt}`;

//     // hoverElement.style.width = `${size}px`;
//     // hoverElement.style.height = `${newHgt}px`;
//     hoverElement.style.left = `${event.clientX - size / 2}px`;
//     hoverElement.style.top = `${event.clientY - newHgt / 2}px`;

//     // Update the last cursor position
//     lastX = event.clientX;
//     lastY = event.clientY;
//   }

//   document.addEventListener("mousemove", onMouseMove);

//   function onMouseUp() {
//     document.removeEventListener("mousemove", onMouseMove);
//     document.removeEventListener("mouseup", onMouseUp);
//   }

//   document.addEventListener("mouseup", onMouseUp);
// }

function startDragPopup(event) {
  const popupHeading = event.currentTarget;
  const popup = popupHeading.parentNode.parentNode;

  const offsetX = event.offsetX;
  const offsetY = event.offsetY;

  popupHeading.style.cursor = "grabbing";
  document.body.style.cursor = "grabbing";

  popup.style.left = `${Math.random() * window.offsetWidth}px`;

  function movePopup(event) {
    const newX = event.clientX - offsetX;
    const newY = event.clientY - offsetY;

    popup.style.left = `${newX}px`;
    popup.style.top = `${newY}px`;

    console.log(event.clientX - offsetX);
  }
  document.addEventListener("mousemove", movePopup);

  function stopDrag() {
    document.removeEventListener("mousemove", movePopup);
    document.removeEventListener("mouseup", stopDrag);

    document.body.style.cursor = "";
    popupHeading.style.cursor = "";
  }
  document.addEventListener("mouseup", stopDrag);
}

function closeParagraph(event) {
  const paragraph = event.currentTarget.parentNode.parentNode;
  paragraph.style.visibility = "";
  paragraph.style.transform = "";
}

//function showHoverElement(hoverElement, originalElement, event) {
function showHoverElement(hoverElement, event) {
  // Reset the total distance when showing the hover element
  // totalDistance = 0;
  lastX = event.clientX;
  lastY = event.clientY;

  // const size = MIN_SIZE; // Initial size

  const elementWdt = hoverElement.clientWidth;
  const elementHgt = hoverElement.clientHeight;

  // hoverElement.style.width = `${elementWdt}px`;
  hoverElement.style.height = `${elementHgt}px`;

  // hoverElement.dataset.width = Math.min(
  //   MAX_WIDTH,
  //   Math.max(MIN_WIDTH, window.innerWidth / WIDTH_FACTOR)
  // );
  // hoverElement.style.width = `${hoverElement.dataset.width}px`;
  hoverElement.style.height = `auto`;

  hoverElement.style.left = `${lastX}px`;
  hoverElement.style.top = `${lastY}px`; // - hoverElement.offsetHeight / 2}px`;

  //hoverElement.style.zIndex = topMost;
  // topMost++;

  // hoverElement.addEventListener( 'click', ( ) => {
  //   hoverElement.style.zIndex = topMost;

  //   topMost++;
  // } );

  const popupTitle = hoverElement.querySelector("h2");
  if (popupTitle) popupTitle.addEventListener("mousedown", startDragPopup);

  const closeButton = hoverElement.querySelector(".close-button");
  closeButton.addEventListener("click", closeParagraph);

  //initializeHoverListeners(hoverElement);
  hoverElement.style.visibility = "visible";
}

function clickHandler(event) {
  const clickedLink = event.currentTarget;
  const clickedHoverClass = clickedLink.classList[0] + "hover";
  const clickedHoverElement = document.querySelector("." + clickedHoverClass);
  console.log(clickedHoverElement);

  showHoverElement(clickedHoverElement, event);
}

const MIN_SIZE = 50; // Minimum size for the hover elements

const clickableLinks = document.querySelectorAll(
  ".gridcontainer > div > div, " + ".paragraphhover > span > span"
);

clickableLinks.forEach((clickableLink) => {
  clickableLink.addEventListener("click", clickHandler);
});
