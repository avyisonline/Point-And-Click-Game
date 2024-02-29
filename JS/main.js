document.getElementById("mainTitle").innerText = "Peanutbutter Sand Witch";

//Game window reference
const gameWindow = document.getElementById("gameWindow");

// Game state
gameState = {
    "inventory": [],
    "hasKey": false,
    "hasMushroom": false,
}

//Inventory
const inventoryList = document.getElementById("inventoryList");

//Main Character
const mainCharacter = document.getElementById("hero");
const offsetCharacter = 16;

//Speech Bubbles
const heroSpeech = document.getElementById("heroSpeech");
const counterSpeech = document.getElementById("counterSpeech");
const counterAvatar = document.getElementById("counterAvatar");

const heroAudio = document.getElementById("heroAudio");
const counterAudio = document.getElementById("counterAudio");

//Objects
const tree1 = document.getElementById("squareTree");
const inventoryBox = document.getElementById("inventoryBox");

gameWindow.onclick = function (e) {
    var rect = gameWindow.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;

    if (e.target.id !== "heroImage" && counterSpeech.style.opacity == 0 && heroSpeech.style.opacity == 0) {
        mainCharacter.style.left = x - offsetCharacter + "px";
        mainCharacter.style.top = y - offsetCharacter + "px";
    }

    switch (e.target.id) {
        case "squareTree":
            tree1.style.opacity = 0.5;
            break;
        case "inventoryBox": {
            inventoryBox.style.opacity = 0.5;
        }
        case "key":
            if (gameState.hasKey == false) {
                showMessage(heroSpeech, "I found a key, I wonder where that goes...")
                console.log("here's a key for ya ");
                document.getElementById("key").remove;
                changeInventory('key', "add");
                gameState.hasKey = true;
            } else {
                console.log("No keys for you, you only get 1 >:(");
            }
            break;
        case "mushroom":
            if (gameState.hasMushroom == false) {
                showMessage(heroSpeech, "Mushrooms grow down here, I'll take one..")
                document.getElementById("mushroom").remove;
                changeInventory('mushroom', "add");
                gameState.hasMushroom = true;
            } else {
                console.log("No mushrooms for you, you only get 1 >:(");
            }
            break;
        case "keyDoor":
            if (checkItem("key")) {
                changeInventory('key', "remove");
                showMessage("Yes! The door is now opened!")
                console.log("Nice, you can open the door (in theory)");
            } else if (checkItem("mushroom")) {
                changeInventory('mushroom', "remove");
                showMessage(heroSpeech, "Darn, my mushroom doesn't work as a key..")
                console.log("A mushroom does not work as a key, it's mangled beyond belief.");
            } else {
                console.log("Darn");
            }
            break;
        case "statueLady":
            showMessage(heroSpeech, "Hey there statue lady!", heroAudio);
            setTimeout(function () { counterAvatar.style.opacity = 1, 4000; })
            setTimeout(showMessage, 4000, counterSpeech, "Well hello little hero..", counterAudio);
            setTimeout(showMessage, 8000, heroSpeech, "Wow! You can speak?", heroAudio);
            setTimeout(showMessage, 12000, counterSpeech, "Why yes, of course", counterAudio);
            setTimeout(showMessage, 16000, heroSpeech, "That's incredible!", heroAudio);
            setTimeout(showMessage, 20000, counterSpeech, "There's a key in the graveyard, maybe get it?", counterAudio);
            setTimeout(function () { counterAvatar.style.opacity = 0, 24000; })
            console.log("Hello little one, would you like to know a secret?");
            console.log("There's a key by one of those gravestones there, go look. Please ^-^");
            break;
        default:
            tree1.style.opacity = 1;
            inventoryBox.style.opacity = 1;
    }
}

/**
 * Add or remove item in inventory
 * @param {string} itemName 
 * @param {string} action 
 */
function changeInventory(itemName, action) {

    if (itemName == null || action == null) {
        console.error("wrong parameters given to change inventory");
        return;
    }

    switch (action) {
        case 'add':
            gameState.inventory.push(itemName);
            break;
        case 'remove':
            gameState.inventory = gameState.inventory.filter(function (newInventory) {
                return newInventory !== itemName;
            });
            document.getElementById("inv-" + itemName).remove();
            break;

    }
    updateInventory(gameState.inventory, inventoryList);
}

function checkItem(itemName) {
    return gameState.inventory.includes(itemName);
}

function updateInventory(inventory, inventoryList) {
    inventoryList.innerHTML = '';
    inventory.forEach(function (item) {
        const inventoryItem = document.createElement("li");
        inventoryItem.id = 'inv' + item;
        inventoryItem.innerText = item;
        inventoryList.appendChild(inventoryItem);
    })
}

/**
 * It will show dialog
 * @param {getElementById} tragetSound
 * @param {getElementById} targetBubble 
 * @param {string} message 
 */
function showMessage(targetBubble, message, tragetSound) {
    tragetSound.currentTime = 0;
    tragetSound.play();
    targetBubble.innerText = message;
    targetBubble.style.opacity = 1;
    setTimeout(hideMessage, 4000, targetBubble);
}

/**
 * Hides the message, and pauses the audio
 * @param {getElementById} targetBubble 
 * @param {getElementById} tragetSound 
 */
function hideMessage(targetBubble, tragetSound) {
    tragetSound.pause();
    targetBubble.innerText = "..."
    targetBubble.style.opacity = 0;
}