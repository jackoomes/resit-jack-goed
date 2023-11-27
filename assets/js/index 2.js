// pointers
// const pointerElements = document.querySelectorAll('[class^="pointer"]');
// const clickableElements = document.querySelectorAll(
//   ".we, .must, .become, .idealists, .or, .die"
// );

// pointerElements.forEach((element) => {
//   element.style.opacity = "0"; // Hide all pointer elements initially
// });

// const pointerWeElement = document.querySelector(".pointerwe");
// pointerWeElement.style.opacity = "1"; // Show .pointerwe

// const pointerMustElement = document.querySelector(".pointermust");
// const pointerBecomeElement = document.querySelector(".pointerbecome");
// const pointerIdealistsElement = document.querySelector(".pointeridealists");
// const pointerOrElement = document.querySelector(".pointeror");
// const pointerDieElement = document.querySelector(".pointerdie");

// clickableElements.forEach((element) => {
//   element.addEventListener("click", () => {
//     if (
//       element.classList.contains("we") &&
//       pointerWeElement.style.opacity === "1"
//     ) {
//       // Toggle visibility of .pointerwe and .pointermust
//       pointerWeElement.style.opacity = "0";
//       pointerMustElement.style.opacity = "1";
//     } else if (
//       element.classList.contains("must") &&
//       pointerMustElement.style.opacity === "1"
//     ) {
//       // Toggle visibility of .pointermust and .pointerbecome
//       pointerMustElement.style.opacity = "0";
//       pointerBecomeElement.style.opacity = "1";
//     } else if (
//       element.classList.contains("become") &&
//       pointerBecomeElement.style.opacity === "1"
//     ) {
//       // Toggle visibility of .pointerbecome and .pointeridealists
//       pointerBecomeElement.style.opacity = "0";
//       pointerIdealistsElement.style.opacity = "1";
//     } else if (
//       element.classList.contains("idealists") &&
//       pointerIdealistsElement.style.opacity === "1"
//     ) {
//       // Toggle visibility of .pointeridealists and .pointeror
//       pointerIdealistsElement.style.opacity = "0";
//       pointerOrElement.style.opacity = "1";
//     } else if (
//       element.classList.contains("or") &&
//       pointerOrElement.style.opacity === "1"
//     ) {
//       // Toggle visibility of .pointeror and .pointerdie
//       pointerOrElement.style.opacity = "0";
//       pointerDieElement.style.opacity = "1";
//     }
//   });
// });

const weElement = document.querySelector(".we");
const mustElement = document.querySelector(".must");
const becomeElement = document.querySelector(".become");
const idealistsElement = document.querySelector(".idealists");

const weHoverElement = document.querySelector(".wehover");
const mustHoverElement = document.querySelector(".musthover");
const becomeHoverElement = document.querySelector(".becomehover");
const idealistsHoverElement = document.querySelector(".idealistshover");

let lastX, lastY; // To store the previous cursor position
let totalDistance = 0; // To track the total distance the cursor takes
const GROWTH_RATE = 0.5; // Adjust this value to control the growth rate

function initializeHoverListeners(hoverElement) {
  function onMouseMove(event) {
    // Calculate the distance between the previous position and the current position
    const deltaX = event.clientX - lastX;
    const deltaY = event.clientY - lastY;

    // Calculate the distance traveled in this move
    const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);

    // Multiply the distance by the growth rate to slow down the growth
    const scaledDistance = distance * GROWTH_RATE;

    // Add the scaled distance to the total distance
    totalDistance += scaledDistance;

    // Calculate the size based on the total distance
    const size = MIN_SIZE + totalDistance;

    const origWdt = hoverElement.dataset.width;
    const newWdt = MIN_SIZE + totalDistance;
    const origHgt = hoverElement.dataset.height;
    const newHgt = (origHgt * newWdt) / origWdt;

    hoverElement.style.width = `${origWdt}px`;
    hoverElement.style.height = `auto`;
    hoverElement.scale = newWdt / origWdt;

    // hoverElement.style.width = `${size}px`;
    // hoverElement.style.height = `${newHgt}px`;
    hoverElement.style.left = `${event.clientX - size / 2}px`;
    hoverElement.style.top = `${event.clientY - newHgt / 2}px`;

    // hoverElement.style.width = `${size}px`;
    // hoverElement.style.height = `${size}px`;
    // hoverElement.style.left = `${event.clientX - size / 2}px`;
    // hoverElement.style.top = `${event.clientY - size / 2}px`;

    // Update the last cursor position
    lastX = event.clientX;
    lastY = event.clientY;
  }

  document.addEventListener("mousemove", onMouseMove);

  function onMouseUp() {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  }

  document.addEventListener("mouseup", onMouseUp);
}

function showHoverElement(hoverElement, originalElement, event) {
  totalDistance = 0; // Reset the total distance when showing the hover element
  lastX = event.clientX;
  lastY = event.clientY;

  const size = MIN_SIZE; // Initial size

  const elementWdt = hoverElement.clientWidth;
  const elementHgt = hoverElement.clientHeight;

  hoverElement.style.width = `${elementWdt}px`;
  hoverElement.style.height = `${elementHgt}px`;
  // hoverElement.style.left = `${originalElement.getBoundingClientRect().left}px`;
  // hoverElement.style.top = `${originalElement.getBoundingClientRect().top}px`;
  hoverElement.style.left = `${lastX - elementWdt / 2}px`;
  hoverElement.style.top = `${lastY - elementHgt / 2}px`;

  hoverElement.dataset.width = elementWdt;
  hoverElement.dataset.height = elementHgt;

  initializeHoverListeners(hoverElement);
  hoverElement.style.visibility = "visible";

  // Remove event listeners after the hover element is shown
  originalElement.removeEventListener("click", clickHandler);
}

function clickHandler(event) {
  if (this === weElement) {
    showHoverElement(weHoverElement, weElement, event);
  } else if (this === mustElement) {
    showHoverElement(mustHoverElement, mustElement, event);
  } else if (this === becomeElement) {
    showHoverElement(becomeHoverElement, becomeElement, event);
  } else if (this === idealistsElement) {
    showHoverElement(idealistsHoverElement, idealistsElement, event);
  }
}

const MIN_SIZE = 50; // Minimum size for the hover elements

weElement.addEventListener("click", clickHandler);
mustElement.addEventListener("click", clickHandler);
becomeElement.addEventListener("click", clickHandler);
idealistsElement.addEventListener("click", clickHandler);

// hieronder greenwashing code
// const dieContainerElement = document.querySelector(".die-container");
// const orContainerElement = document.querySelector(".or-container");
// const prefaceboxElement = document.querySelector(".prefacebox");
// const prefaceboxTwoElement = document.querySelector(".prefaceboxtwo");
// let intervalIdDie = null;
// let intervalIdOr = null;
// let isIntervalStartedDie = false;
// let isIntervalStartedOr = false;

// prefaceboxTwoElement.style.visibility = "hidden";

// function toggleDieHover() {
//   dieContainerElement.classList.toggle("diehover");
// }

// function toggleOrHover() {
//   orContainerElement.classList.toggle("orhover");
// }

// // Add click event listener to .die-container element
// dieContainerElement.addEventListener("click", function () {
//   // If the die-container is not toggling, create a new interval
//   if (!isIntervalStartedDie) {
//     // Set the flag to indicate that the die-container interval is started
//     isIntervalStartedDie = true;
//     // Use setInterval to repeat the toggle every 50 milliseconds
//     intervalIdDie = setInterval(toggleDieHover, 50);
//   } else {
//     // If it's already toggling, stop the interval and reset the flag
//     clearInterval(intervalIdDie);
//     isIntervalStartedDie = false;
//     // Toggle the die-container class immediately
//     toggleDieHover();
//   }

//   // Disable overflow-y and overflow-x styles, enable overflow: auto
//   document.body.style.overflowY = "auto";
//   document.body.style.overflowX = "auto";
// });

// // Add click event listener to .or-container element
// orContainerElement.addEventListener("click", function () {
//   // If the or-container is not toggling, create a new interval
//   if (!isIntervalStartedOr) {
//     // Set the flag to indicate that the or-container interval is started
//     isIntervalStartedOr = true;
//     // Use setInterval to repeat the toggle every 50 milliseconds
//     intervalIdOr = setInterval(toggleOrHover, 50);
//   } else {
//     // If it's already toggling, stop the interval and reset the flag
//     clearInterval(intervalIdOr);
//     isIntervalStartedOr = false;
//     // Toggle the or-container class immediately
//     toggleOrHover();
//   }
// });

// let lastScrollPosition = window.scrollY;
// let scaleValue = 1.0;

// document.addEventListener("scroll", function (event) {
//   const currentScrollPosition = window.scrollY;
//   const windowHeight = window.innerHeight;
//   const prefaceboxTwoHeight = prefaceboxTwoElement.offsetHeight;

//   // Calculate available scrollable space
//   const availableScrollSpace = prefaceboxTwoHeight - windowHeight;

//   // Calculate the scale factor based on available scrollable space
//   const scaleFactor =
//     1 -
//     (Math.min(currentScrollPosition, availableScrollSpace) /
//       availableScrollSpace) *
//       0.9;

//   // Apply the new scale factor to .prefacebox
//   scaleValue = Math.max(0.8, scaleFactor);
//   prefaceboxElement.style.transform = `scale(${scaleValue})`;

//   // Calculate opacity for prefaceboxtwo
//   const prefaceboxTwoOpacity = Math.min(1, 1 - (scaleValue - 0.8) / 0.1);

//   // Apply opacity to prefaceboxtwo
//   prefaceboxTwoElement.style.opacity = prefaceboxTwoOpacity.toString();

//   // Update visibility of prefaceboxtwo
//   prefaceboxTwoElement.style.visibility =
//     prefaceboxTwoOpacity > 0 ? "visible" : "hidden";

//   // Calculate opacity for prefacebox without any condition
//   const prefaceboxOpacity = Math.min(1, 0.2 + (scaleValue - 0.8) / 0.1);

//   // Apply opacity to prefacebox
//   prefaceboxElement.style.opacity = prefaceboxOpacity.toString();

//   // Update the last scroll position
//   lastScrollPosition = currentScrollPosition;
// });

// function handleHover(baselineClass, hoverClass) {
//   const baseline = document.querySelector(`.${baselineClass}`);
//   const hoverImg = document.querySelector(`.${hoverClass} img`);
//   let hoverTimeout;

//   function activateHover() {
//     hoverImg.style.visibility = "visible";
//     hoverImg.style.opacity = 1;
//     hoverImg.style.transition = "opacity 2s ease-in-out";

//     baseline.removeEventListener("mouseenter", activateHover);

//     hoverTimeout = setTimeout(() => {
//       hoverImg.style.opacity = 0;
//       resetHover();
//     }, 5000); // 7 seconds timeout before fade out
//   }

//   function resetHover() {
//     clearTimeout(hoverTimeout);
//     hoverImg.style.transition = "opacity 4s ease-in-out";
//     hoverImg.style.opacity = 0;

//     setTimeout(() => {
//       hoverImg.style.visibility = "hidden";
//       hoverImg.style.transition = "none";
//       baseline.addEventListener("mouseenter", activateHover);
//     }, 4000); // 4 seconds delay before reactivation
//   }

//   baseline.addEventListener("mouseenter", activateHover);
// }

// // Array of baseline and corresponding hover classes
// const baselineHoverPairs = [
//   ["innovationbaseline", "innovationhover"],
//   ["tomorrowbaseline", "tomorrowhover"],
//   ["empoweringbaseline", "empoweringhover"],
//   ["commitmentbaseline", "commitmenthover"],
//   ["inspiredbaseline", "inspiredhover"],
//   ["responsiblebaseline", "responsiblehover"],
//   ["reducingbaseline", "reducinghover"],
//   ["consciousbaseline", "conscioushover"],
//   ["harmonybaseline", "harmonyhover"],
// ];

// // Set up hover effect for each pair of baseline and corresponding hover image classes
// baselineHoverPairs.forEach((pair) => {
//   const [baselineClass, hoverClass] = pair;
//   handleHover(baselineClass, hoverClass);
// });

// Get all the baseline element
// Get all the baseline elements

// let textInput = document.getElementById("text-input");
// let undoStack = [];
// let redoStack = [];

// textInput.addEventListener("input", function (event) {
//   // Store the current state before making changes
//   undoStack.push(textInput.value);
//   // Clear the redo stack since a new change has been made
//   redoStack = [];
// });

// function undo() {
//   if (undoStack.length > 1) {
//     redoStack.push(undoStack.pop());
//     textInput.value = undoStack[undoStack.length - 1];
//   }
// }

// function redo() {
//   if (redoStack.length > 0) {
//     undoStack.push(redoStack.pop());
//     textInput.value = undoStack[undoStack.length - 1];
//   }
// }
// document.getElementById("undo-button").addEventListener("click", undo);
// document.getElementById("redo-button").addEventListener("click", redo);

// const innovationBaseline = document.querySelector(".innovationbaseline");
// const innovationHoverImg = document.querySelector(".innovationhover img");

// // Add event listener for mouseover
// innovationBaseline.addEventListener("mouseover", () => {
//   // Set styles to make .innovationhover img visible and scaled to 100vw while maintaining center alignment
//   innovationHoverImg.style.visibility = "visible";
//   innovationHoverImg.style.gridColumn = "1";
//   innovationHoverImg.style.opacity = "1";
//   innovationHoverImg.style.width = "50vw"; // You can adjust the width as needed
//   innovationHoverImg.style.height = "12vh";
//   innovationHoverImg.style.transformOrigin = "center"; // Set transform origin to center
//   innovationHoverImg.style.transform = "scale(1)"; // Reset scale before applying transition
//   innovationHoverImg.style.transition = "transform 3s ease-in, opacity 3s ease";
//   innovationHoverImg.style.zIndex = "1"; // Position behind .innovationbaseline

//   // Calculate the top and left values for the center alignment considering scaling effect
//   innovationHoverImg.style.transform = `scale(${scale})`; // Apply scaling transformation
// });

// innovationBaseline.addEventListener("mouseout", () => {
//   // Reset styles when mouse leaves .innovationbaseline
//   innovationHoverImg.style.visibility = "hidden";
//   innovationHoverImg.style.width = "0";
//   innovationHoverImg.style.opacity = "0";
//   innovationHoverImg.style.transform = "scale(0)"; // Reset scale transformation
// });

//TOGGLE VOOR .BECOME
// const becomeElement = document.querySelector(".become");
// let isToggling = false;

// function toggleBecomeHover() {
//   becomeElement.classList.toggle("become");
//   becomeElement.classList.toggle("becomehover");
// }

// function startToggling() {
//   becomeElement.addEventListener("click", function () {
//     if (!isToggling) {
//       isToggling = true;
//       setInterval(toggleBecomeHover, 50);
//     }
//   });
// }
//startToggling();

// Optional: If you want to stop the interval after a specific condition, you can clear it like this
// clearInterval(intervalId);
// dieElement.addEventListener("mouseout", function () {
//   dieElement.classList.remove("diehover");
// });

// THIS IS DE ORIGINAL CODE + DRAG AND DROP WITH OBJECT THAT GROWS WHILE DRAGGING only on .wehover
// const wehover = document.querySelector(".wehover");
// let initialX,
//   initialY,
//   lastX,
//   lastY,
//   totalDistance = 0;
// let isDragging = false;
// let originalWidth, originalHeight;

// wehover.addEventListener("mousedown", (e) => {
//   const boundingRect = wehover.getBoundingClientRect();
//   initialX = e.clientX - boundingRect.left;
//   initialY = e.clientY - boundingRect.top;
//   lastX = e.clientX;
//   lastY = e.clientY;
//   isDragging = true;

//   // Store the original width and height
//   originalWidth = wehover.offsetWidth;
//   originalHeight = wehover.offsetHeight;
// });

// document.addEventListener("mousemove", (e) => {
//   if (!isDragging) return;
//   const currentX = e.clientX;
//   const currentY = e.clientY;
//   const distanceX = currentX - lastX;
//   const distanceY = currentY - lastY;
//   const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
//   totalDistance += distance;

//   const growthFactor = 0.1;
//   const newSize = Math.max(originalWidth, totalDistance * growthFactor);

//   wehover.style.width = `${newSize}px`;
//   wehover.style.height = `${newSize}px`;
//   wehover.style.left = `${currentX - newSize / 2}px`;
//   wehover.style.top = `${currentY - newSize / 2}px`;

//   lastX = currentX;
//   lastY = currentY;
// });

// document.addEventListener("mouseup", () => {
//   isDragging = false;
// });

//HIERONDER IS DE BASIS CODE, DIE HET MOGELIJK MAAKT OM WEHOVER TE DRAG EN DROPPEN

// const wehover = document.querySelector(".wehover");
// let offsetX,
//   offsetY,
//   isDragging = false;

// wehover.addEventListener("mousedown", (e) => {
//   isDragging = true;
//   const boundingRect = wehover.getBoundingClientRect();
//   offsetX = e.clientX - boundingRect.left;
//   offsetY = e.clientY - boundingRect.top;
// });

// document.addEventListener("mousemove", (e) => {
//   if (!isDragging) return;
//   const x = e.clientX - offsetX;
//   const y = e.clientY - offsetY;
//   wehover.style.left = `${x}px`;
//   wehover.style.top = `${y}px`;
// });

// document.addEventListener("mouseup", () => {
//   isDragging = false;
// });
