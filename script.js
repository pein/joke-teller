const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

// Passing Joke to VoiceRSS API
function tellMe(joke) {
  VoiceRSS.speech({
    key: "0639d8eed05744b9b550ba5aed64a0af", //Disabled Key, Use a new one
    src: joke,
    hl: "en-us",
    r: 0,
    c: "mp3",
    f: "11khz_16bit_stero",
    ssml: false,
  });
}
// Get Jokes from Joke API
async function getJokes() {
  let joke = "";
  const apiUrl =
    "https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist";
  try {
    const res = await fetch(apiUrl);
    const data = await res.json();
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivry}`;
    } else {
      joke = data.joke;
    }

    // Disabale button before playing
    button.disabled = true;
    tellMe(joke);
  } catch (error) {
    // Catch errors
    console.log("Woops", error);
  }
}

// Event Listeners
button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", () => {
  button.disabled = false;
});
