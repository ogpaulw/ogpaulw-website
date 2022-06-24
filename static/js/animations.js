async function introAnimation(nameString) {
  function sleep(ms) { // Defining function inside introAnimation for some weird reason; it doesn't work otherwise, won't bother writing my own guess at why, not because I can't, but because I don't want to out of spite.
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  var blog = document.getElementById("blogLink");
  var projects = document.getElementById("projectsLink");
  var scribbles = document.getElementById("scribblesLink");
  var music = document.getElementById("musicLink");
  var name = document.getElementById("name");

  var elements = [blog, projects, scribbles, music, name];
  var targetStrings = [">&blog", ">&projects", ">&scribbles", ">&music", ">&ogpaulw"]; //replace "&" with SPACE, cant remember why but JS or something doesnt like spaces in chars

  for (j=0; j < elements.length; j++) { // "j" being the index for both "elements" AND "targetStrings".
    if (j > 0) { // Don't wait a longer time on the "&ogpaul" as the ">" is already written into the original HTML (can't remember why, don't want to change it in fear of breaking something).
      await sleep(300);
      elements[j].innerText += "_";
    }
    else if (j == 1) {
      await sleep(80);
      elements[j].innerText += "_";
    }
    else {
      elements[j].innerText += "_";
    }

    for (i=0; i < targetStrings[j].length; i++) { // "i" being the index for the target string's characters (to give the appearance of typing i.e. being added (<italics>"typed"</italics>) one after another).
      await sleep(40);

      if (targetStrings[j][i] == "&") {
        elements[j].innerText = elements[j].innerText.replace("_", "\xa0"); // I'll reiterate, JS doesn't like spaces.
        elements[j].innerText += "_";
      }
      else {
        elements[j].innerText = elements[j].innerText.replace("_", targetStrings[j][i]);
        elements[j].innerText += "_";
        //elements[j].innerText += targetStrings[j][i];
      }
    }

    elements[j].innerText = elements[j].innerText.replace("_", "");
  }

  last = elements.length - 1
  while (true) {
    elements[last].innerText += "_";
    await sleep(530); // "https://www.tenforums.com/tutorials/95372-change-text-cursor-blink-rate-windows.html#:~:text=530%20is%20the%20default%20cursor%20blink%20rate." -- source for blinking speed.
    elements[last].innerText = elements[last].innerText.replace("_", "");
    await sleep(530);
  }
}

function onLoad() {
  introAnimation();
}
