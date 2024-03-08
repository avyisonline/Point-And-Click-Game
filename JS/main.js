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

//Random Shit
var knightClickCounter = 0;

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
                showMessage(heroSpeech, "Wow! Are you a knight?", heroAudio);
                setTimeout(function () { counterAvatar.style.opacity = 1, 3000; });
                setTimeout(showMessage, 3000, counterSpeech, "Hello there, friend!", counterAudio);
                setTimeout(showMessage, 6000, heroSpeech, "Would you perchance have something for me?", heroAudio);
                setTimeout(showMessage, 9000, counterSpeech, "Why yes, I have a key for you!", counterAudio);
                setTimeout(showMessage, 12000, heroSpeech, "Thank you! I'll take that.", heroAudio);
                setTimeout(showMessage, 15000, counterSpeech, "No problem pal, safe travels!", counterAudio);
                setTimeout(function () { counterAvatar.style.opacity = 0, 15000; });
                console.log("here's a key for ya ");
                document.getElementById("key").remove;
                changeInventory('key', "add");
                gameState.hasKey = true;
            } else if (knightClickCounter == 2 || knightClickCounter == 3) {
                showMessage(counterSpeech, "Come on kid, I'm getting fed up with you.", counterAudio);
                knightClickCounter += 1;
            } else if (knightClickCounter == 4 || knightClickCounter == 5) {
                showMessage(counterSpeech, "Final warning kid, you best be on your way.", counterAudio);
                knightClickCounter += 1;
            } else if (knightClickCounter == 6) {
                showMessage(counterSpeech, "Don't say I didn't warn you...", counterAudio);
                setTimeout(3000, location.reload());
            }

            else {
                showMessage(counterSpeech, "Hey wait a minute..", counterAudio)
                setTimeout(showMessage, 3000, counterSpeech, "I already gave you a key!", counterAudio);
                setTimeout(showMessage, 6000, heroSpeech, "Oh yeah, you did..", heroAudio);
                setTimeout(showMessage, 9000, counterSpeech, "You best be on your way, greedy kid.", counterAudio);
                knightClickCounter += 1;
            }
            break;
        case "mushroom":
            if (gameState.hasMushroom == false) {
                showMessage(heroSpeech, "Ooo, a chest..", heroAudio);
                setTimeout(showMessage, 3000, heroSpeech, "Oh cool, a mushroom!", heroAudio);
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
                showMessage(heroSpeech, "Yes! The door is now opened!", counterAudio);
                console.log("Nice, you can open the door (in theory)");
            } else if (checkItem("mushroom")) {
                changeInventory('mushroom', "remove");
                showMessage(heroSpeech, "Darn, my mushroom doesn't work as a key..", heroAudio);
                console.log("A mushroom does not work as a key, it's mangled beyond belief.");
            } else {
                console.log("Darn");
            }
            break;
        case "statueLady":
            showMessage(counterSpeech, "Hey! Who are you?!", counterAudio);
            setTimeout(showMessage, 3000, heroSpeech, "I could ask you the same, Mister..?", heroAudio);
            setTimeout(showMessage, 6000, counterSpeech, "None of your business, scram.", counterAudio);
            setTimeout(showMessage, 9000, heroSpeech, "Well you're rude..", heroAudio);
            setTimeout(showMessage, 12000, counterSpeech, "You're damn right, go or I'll fight you!", counterAudio);
            break;
        case "door2":
            showMessage(heroSpeech, "Darn, it won't budge!", heroAudio);
            setTimeout(showMessage, 3000, heroSpeech, "Maybe I could try another door..", heroAudio);
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
        console.error("Wrong parameters given to changeInventory()");
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

/**
 * Add or remove item in inventory
 * @param {string} itemName 
 * @param {string} action 
 */
function changeInventory(itemName, action) {
    if (itemName == null || action == null) {
        console.error("Wrong parameters given to changeInventory()");
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

/**
 * This returns string value if it exist within the array
 * @param {string} itemName 
 * @returns 
 */
function checkItem(itemName) {
    return gameState.inventory.includes(itemName);
}

function updateInventory(inventory, inventoryList) {
    inventoryList.innerHTML = '';
    inventory.forEach(function (item) {
        const inventoryItem = document.createElement("li");
        inventoryItem.id = 'inv-' + item;
        inventoryItem.innerText = item;
        inventoryList.appendChild(inventoryItem);
    })
}

/**
 * It will show dialog and trigger sound.
 * @param {getElementById} targetBubble 
 * @param {string} message
 * @param {getElementById} targetSound 
 */
function showMessage(targetBubble, message, targetSound) {
    targetSound.currentTime = 0;
    targetSound.play();
    targetBubble.innerText = message;
    targetBubble.style.opacity = 1;
    setTimeout(hideMessage, 4 * sec, targetBubble, targetSound);
}

/**
 * Hides message and pauze the audio
 * @param {getElementById} targetBubble 
 * @param {getElementById} targetSound 
 */
function hideMessage(targetBubble, targetSound) {
    targetSound.pause();
    targetBubble.innerText = "...";
    targetBubble.style.opacity = 0;
}