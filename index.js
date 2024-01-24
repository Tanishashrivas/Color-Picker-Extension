const pickColorButton = document.querySelector("#pickBtn");
const colorList = document.querySelector("#color-list");// ul
const colorsPicked = JSON.parse(localStorage.getItem("colorsPicked") || "[]");
const secondBox = document.querySelector(".picked-colors");
const clearAll = document.querySelector("#clear-all");


const copyColor = (el) => {
    navigator.clipboard.writeText(el.dataset.color);

    el.innerHTML = "Copied!";
    setTimeout(()=>{
    el.innerHTML = `${el.dataset.color}`;
    }, 1000);//after one sec, change the text to the color again
}

const showColors = () => {
    //if array is empty, then return;
        if(!colorsPicked.length)
        return;
        /* if color is white, add a grey border*/
        /* Storing the value of color in data-color variable, accessed through the dataset*/
        colorList.innerHTML = colorsPicked.map(color => `
        <li id="color">
        <span id="rectangle" style="background: ${color}; border: 1px solid ${color == "#FFFFFF" ? "#ccc" : color} "></span>
        <span id="color-name" data-color = "${color}">${color}</span>
        </li>`
        ).join(""); //generated li for all the colors and stored it in ul
        
        secondBox.classList.remove("hide"); //make the pickedcolors box visible
        
        document.querySelectorAll("#color").forEach(li => {
            // li's last child is the span element containing color code. Adding click event to it.
            li.addEventListener("click", e => copyColor(e.currentTarget.lastElementChild));
        })
    }
    showColors();
    

    const activateEyeDropper = async () => {
    try{
    const eyeDropper = new EyeDropper();
    const {sRGBHex} = await eyeDropper.open();
    const validColor = sRGBHex.toUpperCase();

    //copying the particular color to clipboard
    navigator.clipboard.writeText(validColor);
    
    //pushing colors into an array
    if(!colorsPicked.includes(validColor)){
    colorsPicked.push(validColor);

    //pushing the data in the local storage(adding the color not already present)
    localStorage.setItem("colorsPicked", JSON.stringify(colorsPicked));
    showColors();
}
// //creating elements and display
// colorsFetch.forEach((color) => {
    //     createElement(color);
    // });
    }
    catch(error){
        console.error(error);
    }
}

const clearColors = () => {
    //remove all colors and updating the local storage.
    colorsPicked.length = 0;
    localStorage.setItem("colorsPicked", JSON.stringify(colorsPicked));
    secondBox.classList.add("hide");

// console.log('Pop-up dimensions on load:', document.querySelector('.pop-up').getBoundingClientRect());
}

clearAll.addEventListener("click", clearColors);
pickColorButton.addEventListener("click", activateEyeDropper);
/*
const createElement = (color) => {
    const element = document.createElement("li");
    element.id = "color";

    const rectangle = document.createElement("span");
    rectangle.id = "rectangle";
    rectangle.style.backgroundColor = `${color}`;

    const colorName = document.createElement("span");
    colorName.id = "color-name";
    colorName.innerHTML = `${color}`;

    element.appendChild(rectangle);
    element.appendChild(colorName);

    colorList.appendChild(element);
}
*/