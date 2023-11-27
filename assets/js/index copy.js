// const weElement = document.querySelector(".we");
// const mustElement = document.querySelector(".must");
// const becomeElement = document.querySelector(".become");
// const idealistsElement = document.querySelector(".idealists");
// const dsagElement = document.querySelector(".dsag");
// const gvscElement = document.querySelector(".gvsc");
// const violenceElement = document.querySelector(".violence");
// const disassemblyoneElement = document.querySelector(".disassemblyone");
// const disassemblytwoElement = document.querySelector(".disassemblytwo");
// const disassemblythreeElement = document.querySelector(".disassemblythree");
// const disassemblyfourElement = document.querySelector(".disassemblyfour");
// const explosionElement = document.querySelector(".explosion");
// const manualElement = document.querySelector(".manual");
// const implosionElement = document.querySelector(".implosion");
// const expansionElement = document.querySelector(".expansion");
// const hitandfallElement = document.querySelector(".hitandfall");
// const festumfluxorumElement = document.querySelector(".festumfluxorum");
// const pianoElement = document.querySelector(".piano");
// const closedpianoElement = document.querySelector(".closedpiano");
// const fireElement = document.querySelector(".fire");
// const selfElement = document.querySelector(".self");
// const waroneElement = document.querySelector(".warone");
// const wartwoElement = document.querySelector(".wartwo");
// const bodyElement = document.querySelector(".body");
// const conclusionElement = document.querySelector(".conclusion");

// const weHoverElement = document.querySelector(".wehover");
// const mustHoverElement = document.querySelector(".musthover");
// const becomeHoverElement = document.querySelector(".becomehover");
// const idealistsHoverElement = document.querySelector(".idealistshover");
// const dsagHoverElement = document.querySelector(".dsaghover");
// const gvscHoverElement = document.querySelector(".gvschover");
// const violenceHoverElement = document.querySelector(".violencehover");
// const disassemblyoneHoverElement = document.querySelector(
//   ".disassemblyonehover"
// );
// const disassemblytwoHoverElement = document.querySelector(
//   ".disassemblytwohover"
// );
// const disassemblythreeHoverElement = document.querySelector(
//   ".disassemblythreehover"
// );
// const disassemblyfourHoverElement = document.querySelector(
//   ".disassemblyfourhover"
// );
// const explosionHoverElement = document.querySelector(".explosionhover");
// const manualHoverElement = document.querySelector(".manualhover");
// const implosionHoverElement = document.querySelector(".implosionhover");
// const expansionHoverElement = document.querySelector(".expansionhover");
// const hitandfallHoverElement = document.querySelector(".hitandfallhover");
// const festumfluxorumHoverElement = document.querySelector(
//   ".festumfluxorumhover"
// );
// const pianoHoverElement = document.querySelector(".pianohover");
// const closedpianoHoverElement = document.querySelector(".closedpianohover");
// const fireHoverElement = document.querySelector(".firehover");
// const selfHoverElement = document.querySelector(".selfhover");
// const waroneHoverElement = document.querySelector(".waronehover");
// const wartwoHoverElement = document.querySelector(".wartwohover");
// const bodyHoverElement = document.querySelector(".bodyhover");
// const conclusionHoverElement = document.querySelector(".conclusionhover");

let lastX, lastY; // To store the previous cursor position
let totalDistance = 0; // To track the total distance the cursor takes
let topMost = 0;

const GROWTH_RATE = 0.25; // Adjust this value to control the growth rate

const WIDTH_FACTOR = 6;
const MIN_WIDTH = 100;
const MAX_WIDTH = 400;

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
    const origHgt = hoverElement.clientHeight; //hoverElement.dataset.height;
    const newHgt = (origHgt * newWdt) / origWdt;

    console.log(origWdt);
    hoverElement.style.width = `${origWdt}px`;
    hoverElement.style.height = `auto`;
    hoverElement.style.transformOrigin = "0 0";
    hoverElement.style.transform = `scale( ${newWdt / origWdt}`;

    // hoverElement.style.width = `${size}px`;
    // hoverElement.style.height = `${newHgt}px`;
    hoverElement.style.left = `${event.clientX - size / 2}px`;
    hoverElement.style.top = `${event.clientY - newHgt / 2}px`;

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
function closeParagraph(event) {
  const paragraph = event.currentTarget.parentNode.parentNode;
  paragraph.style.visibility = "";
  paragraph.style.transform = "";
}
//function showHoverElement(hoverElement, originalElement, event) {
function showHoverElement(hoverElement, event) {
  totalDistance = 0; // Reset the total distance when showing the hover element
  lastX = event.clientX;
  lastY = event.clientY;

  // const size = MIN_SIZE; // Initial size

  const elementWdt = hoverElement.clientWidth;
  const elementHgt = hoverElement.clientHeight;

  hoverElement.style.width = `${elementWdt}px`;
  hoverElement.style.height = `${elementHgt}px`;

  if (hoverElement.firstElementChild.nodeName == "IMG") {
    hoverElement.dataset.width = elementWdt;
    hoverElement.dataset.height = elementHgt;

    hoverElement.style.left = `${lastX - elementWdt / 2}px`;
    hoverElement.style.top = `${lastY - elementHgt / 2}px`;
  } else {
    hoverElement.dataset.width = Math.min(
      MAX_WIDTH,
      Math.max(MIN_WIDTH, window.innerWidth / WIDTH_FACTOR)
    );
    hoverElement.style.width = `${hoverElement.dataset.width}px`;
    hoverElement.style.height = `auto`;

    hoverElement.style.left = `${lastX - hoverElement.dataset.width / 2}px`;
    hoverElement.style.top = `${lastY - hoverElement.offsetHeight / 2}px`;
  }

  hoverElement.style.zIndex = topMost;
  topMost++;

  const closeButton = hoverElement.querySelector(".close-button");
  closeButton.addEventListener("click", closeParagraph);

  initializeHoverListeners(hoverElement);
  hoverElement.style.visibility = "visible";

  // Remove event listeners after the hover element is shown
  // originalElement.removeEventListener("click", clickHandler);
}

function clickHandler( event ) {
  const clickedLink = event.currentTarget;
  const clickedHoverClass = clickedLink.classList[ 0 ] + 'hover';
  const clickedHoverElement = document.querySelector( '.' + clickedHoverClass );
console.log( clickedHoverElement );
  showHoverElement(clickedHoverElement, event );
/*
  if (this === weElement) {
    console.log("dgdfgd");
    showHoverElement(weHoverElement, weElement, event);
  } else if (this === mustElement) {
    showHoverElement(mustHoverElement, mustElement, event);
  } else if (this === becomeElement) {
    showHoverElement(becomeHoverElement, becomeElement, event);
  } else if (this === idealistsElement) {
    showHoverElement(idealistsHoverElement, idealistsElement, event);
  } else if (this === dsagElement) {
    showHoverElement(dsagHoverElement, dsagElement, event);
  } else if (this === gvscElement) {
    showHoverElement(gvscHoverElement, gvscElement, event);
  } else if (this === violenceElement) {
    showHoverElement(violenceHoverElement, violenceElement, event);
  } else if (this === disassemblyoneElement) {
    showHoverElement(disassemblyoneHoverElement, disassemblyoneElement, event);
  } else if (this === disassemblytwoElement) {
    showHoverElement(disassemblytwoHoverElement, disassemblytwoElement, event);
  } else if (this === disassemblythreeElement) {
    showHoverElement(
      disassemblythreeHoverElement,
      disassemblythreeElement,
      event
    );
  } else if (this === disassemblyfourElement) {
    showHoverElement(
      disassemblyfourHoverElement,
      disassemblyfourElement,
      event
    );
  } else if (this === explosionElement) {
    showHoverElement(explosionHoverElement, explosionElement, event);
  } else if (this === manualElement) {
    showHoverElement(manualHoverElement, manualElement, event);
  } else if (this === implosionElement) {
    showHoverElement(implosionHoverElement, implosionElement, event);
  } else if (this === expansionElement) {
    showHoverElement(expansionHoverElement, expansionElement, event);
  } else if (this === hitandfallElement) {
    showHoverElement(hitandfallHoverElement, hitandfallElement, event);
  } else if (this === festumfluxorumElement) {
    showHoverElement(festumfluxorumHoverElement, festumfluxorumElement, event);
  } else if (this === pianoElement) {
    showHoverElement(pianoHoverElement, pianoElement, event);
  } else if (this === closedpianoElement) {
    showHoverElement(closedpianoHoverElement, closedpianoElement, event);
  } else if (this === fireElement) {
    showHoverElement(fireHoverElement, fireElement, event);
  } else if (this === selfElement) {
    showHoverElement(selfHoverElement, selfElement, event);
  } else if (this === waroneElement) {
    showHoverElement(waroneHoverElement, waroneElement, event);
  } else if (this === wartwoElement) {
    showHoverElement(wartwoHoverElement, wartwoElement, event);
  } else if (this === bodyElement) {
    showHoverElement(bodyHoverElement, bodyElement, event);
  } else if (this === conclusionElement) {
    showHoverElement(conclusionHoverElement, conclusionElement, event);
  }

  */
}

const MIN_SIZE = 50; // Minimum size for the hover elements

// weElement.addEventListener("click", clickHandler);
// mustElement.addEventListener("click", clickHandler);
// becomeElement.addEventListener("click", clickHandler);
// idealistsElement.addEventListener("click", clickHandler);
// dsagElement.addEventListener("click", clickHandler);
// gvscElement.addEventListener("click", clickHandler);
// violenceElement.addEventListener("click", clickHandler);
// disassemblyoneElement.addEventListener("click", clickHandler);
// disassemblytwoElement.addEventListener("click", clickHandler);
// disassemblythreeElement.addEventListener("click", clickHandler);
// disassemblyfourElement.addEventListener("click", clickHandler);
// explosionElement.addEventListener("click", clickHandler);
// manualElement.addEventListener("click", clickHandler);
// implosionElement.addEventListener("click", clickHandler);
// expansionElement.addEventListener("click", clickHandler);
// hitandfallElement.addEventListener("click", clickHandler);
// festumfluxorumElement.addEventListener("click", clickHandler);
// pianoElement.addEventListener("click", clickHandler);
// closedpianoElement.addEventListener("click", clickHandler);
// fireElement.addEventListener("click", clickHandler);
// selfElement.addEventListener("click", clickHandler);
// waroneElement.addEventListener("click", clickHandler);
// wartwoElement.addEventListener("click", clickHandler);
// bodyElement.addEventListener("click", clickHandler);
// conclusionElement.addEventListener("click", clickHandler);





const clickableLinks = document.querySelectorAll( '.gridcontainer > div > div' );
clickableLinks.forEach( clickableLink => {
  //console.log( clickableLink );
  clickableLink.addEventListener("click", clickHandler);

} )
