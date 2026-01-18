const toggleButton=document.getElementById("byToggle"):
const body=document.body;

if(toggleButton) {
    toggleButton.addEventListerner("click", ()=.{
        body.classList.toggle("bg-one");
        body.classList.toiggle("bg-two");
    });
} else{
    console.warn('bgToggle button not found');
}