// Declarations
let optionsButtons = document.querySelectorAll(".option-button");
let advancedOptionButton = document.querySelectorAll(".adv-option-button");
let fontName = document.getElementById("fontName");
let fontSizeRef = document.getElementById("fontSize");
let writingArea = document.getElementById("text-input");
let linkButton = document.getElementById("createLink");
let alignButtons = document.querySelectorAll(".align");
let spacingButtons = document.querySelectorAll(".spacing");
let formatButtons = document.querySelectorAll(".format");
let scriptButtons = document.querySelectorAll(".script");

//List of fontlist
let fontList = [
  "Arial",
  "Verdana",
  "Times New Roman",
  "Garamond",
  "Georgia",
  "Courier New",
  "cursive",
];

const initializer = () => {
  highlighter(formatButtons, false)
  highlighter(scriptButtons, true)
  highlighter(spacingButtons, true)
  highlighter(alignButtons, true)

  //create options for font names
  fontList.map(value => {
    let option = document.createElement('option')
    option.value = value
    option.innerHTML = value
    fontName.appendChild(option)
  })

  //fontSize allows only till 7

  for (let i = 1; i <= 7; i++) {
    let option = document.createElement('option')
    option.value = i
    option.innerHTML = i
    fontSizeRef.appendChild(option)
  }

  //default size
  fontSizeRef.value = 3;
}

//main logic

const modifyText = (CommandName, ShowDefaultUI, ValueArgument) => {
  document.execCommand(CommandName, ShowDefaultUI, ValueArgument)
}

optionsButtons.forEach(button => {
  button.addEventListener('click', () => {
    modifyText(button.id, false, null)
  })
})

advancedOptionButton.forEach(button => {
  button.addEventListener('change', () => {
    modifyText(button.id, false, button.value)
  })
})

linkButton.addEventListener('click', () => {
  let userLink = prompt('Enter a URL')

  if (/http/i.test(userLink)) {
    modifyText(button.id, false, userLink)
  } else {
    userLink = "http://" + userLink
    modifyText(linkButton.id, false, userLink)
  }

})
//Highlight clicked button
const highlighter = (className, needsRemoval) => {
  className.forEach(button => {
    button.addEventListener('click', () => {

      // needsRemoval
      if (needsRemoval) {
        let alreadyActive = false

        if (button.classList.contains("active")) {
          alreadyActive = true
        }
        // Remove highlight from other buttons
        highlighterRemover(className)
        if (!alreadyActive) {
          button.classList.add('active')
        }
      } else {
        button.classList.toggle('active')
      }
    })
  });
}

const highlighterRemover = (className) => {
  className.forEach(button => {
    button.classList.remove('active')
  })
}

window.onload = initializer()

