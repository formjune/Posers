let traits = [];
let assets = [];
let selected_type = "sheep";
let currentTrait = 0;
let asset_name;
let trait_name;
let previewSize = 250;

let render_layers = [];
let canvas = document.getElementById("render-canvas");
let ctx = canvas.getContext("2d");

// ______________________________________________________

// 0. Load Assets

window.onload = function () {
    selectCharacter();
    selectType();
    randomize();
};

// ______________________________________________________
// 1. Select Character Type

let typeSelector = document.getElementById("typeSelector");
typeSelector.addEventListener("change", function () {
    selectCharacter(typeSelector.value);
});

let sheepButton = document.getElementById("sheep-button");
sheepButton.addEventListener("click", function () {
    selectCharacter("sheep");
});

let wolfButton = document.getElementById("wolf-button");
wolfButton.addEventListener("click", function () {
    selectCharacter("wolf");
});

function selectCharacter(value = selected_type) {
    typeSelector.value = value;
    selected_type = typeSelector.value;
    selectType(typeSelector.value);
    resetImage();
    document.querySelector("#sub-title-2").innerHTML = '<h3 class="sub-title-2">Customize your ' + selected_type + '</h3>';
    if (typeSelector.value === "sheep") document.getElementById("sheep-button").style.display = "none";
    else if (typeSelector.value === "wolf") document.getElementById("sheep-button").style.display = "flex";
    if (typeSelector.value === "wolf") document.getElementById("wolf-button").style.display = "none";
    else if (typeSelector.value === "sheep") document.getElementById("wolf-button").style.display = "flex";
}

let randomButton = document.getElementById("random-button");
randomButton.addEventListener("click", function () {
    randomize();
});

function randomize() {
    resetImage();
    for (let i = 0; i < traits.length; i++) {
        let randomAsset = Math.floor(Math.random() * assets[i].length);
        selectAsset(i, randomAsset);
    }
}


// ______________________________________________________

// 2. Select Trait

function selectType(value) {
    if (typeSelector.value === "sheep") {
        traits = ["Fur", "Head", "Ears", "Eyes", "Nose", "Mouth", "Feet"];
        assets = [
            ["Black.png", "Brown.png", "Gray.png", "Survivor.png", "White.png"],
            ["None.png", "Beanie.png", "Blue Hat.png", "Blue Horns.png", "Bucket Hat.png", "Capone.png", "Cowboy Hat.png", "Curved Brown Horns.png", "Curved Golden Horns.png", "Fedora.png", "Mailman.png", "Pointy Brown Horns.png", "Pointy Golden Horns.png", "Rainbow Fro.png", "Red Cap.png", "Santa.png", "sheep_head_1_Reggae_Poncho.png", "sheep_head_2_Partially_Shaved.png", "sheep_head_3_Brain.png", "sheep_head_4_Pointy_Red_Horns.png", "sheep_head_5_Crown.png", "sheep_head_6_Mushroom.png", "Silky.png", "Sun Hat.png", "Visor.png", "White Cap.png"],
            ["None.png", "Diamond Bling.png", "Diamond Stud.png", "Gold Bling.png", "Gold Hoop.png", "sheep_ears_1_Hearts.png", "sheep_ears_1_Hearts_blacked.png", "sheep_ears_2_Plums.png", "sheep_ears_3_Pears.png", "sheep_ears_4_Cola.png", "sheep_ears_5_Golden_Chains.png", "sheep_ears_6_DNA.png", "sheep_ears_7_Long_Eared.png", "sheep_ears_8_Cross.png", "sheep_ears_9_Lock.png", "Two Gold Piercings.png"],
            ["Angry.png", "Basic Sun Protection.png", "Big Blue.png", "Black Glasses.png", "Bloodshot.png", "Confused.png", "Cross Eyed.png", "Cyclops.png", "Dork.png", "Face Painted.png", "Fake Glasses.png", "Fearful.png", "Fearless.png", "Happy.png", "Leafy Green.png", "Livid.png", "Night Vision Visor.png", "OMG.png", "Rainbow Sunnies.png", "Red Glasses.png", "Rolling.png", "sheep_eyes_1_Drunk.png", "sheep_eyes_2_xX.png", "sheep_eyes_3_Three_Eyed.png", "sheep_eyes_4_Crying.png", "sheep_eyes_5_Eyepatch_Red.png", "sheep_eyes_6_Eyepatch_Black.png", "sheep_eyes_7_Hypno.png", "sheep_eyes_8_Bored.png", "Sleepy.png", "Small Blue.png", "Spacey.png", "Squint Left.png", "Squint Right.png", "Staring Contest.png", "X Ray.png"],
            ["Dot.png", "Dots.png", "Gold.png", "Normal.png", "Punched.png", "Red.png", "sheep_nose_1_Snotty.png", "sheep_nose_2_Wide_Nostrills.png", "sheep_nose_2_Wide_Nostrills_Brown.png", "sheep_nose_3_Human.png", "sheep_nose_4_Piggo.png", "sheep_nose_5_Acne.png", "sheep_nose_6_Cotton_Wool.png", "Triangle.png", "U.png", "Wide.png", "X.png"],
            ["Beard.png", "Big Smile.png", "Cheese.png", "Chill Smile.png", "Chinstrap.png", "Cigarette.png", "Grillz.png", "Missing Tooth.png", "Mustache.png", "Narrow Open Mouth.png", "Neutral.png", "Pipe.png", "Pouting.png", "sheep_mouth_10_Chin_Guard.png", "sheep_mouth_1_Wide_tongue_pill_green.png", "sheep_mouth_2_Tongue_Pill_Red.png", "sheep_mouth_3_Dotted.png", "sheep_mouth_4_Shaolin.png", "sheep_mouth_5_Vampire.png", "sheep_mouth_6_Eating_Grass.png", "sheep_mouth_7_Eating_Carrot.png", "sheep_mouth_7_Eating_Carrot_left.png", "sheep_mouth_8_WoW.png", "sheep_mouth_9_Bristle.png", "Smirk.png", "Teasing.png", "Wide Open Mouth.png"],
            ["None.png", "Blue Sneakers.png", "Clogs.png", "Dress Shoes.png", "Elf.png", "Frozen.png", "Gray Shoes.png", "Green Sneakers.png", "High.png", "Ice Skates.png", "Purple Sneakers.png", "Red Sneakers.png", "Roller Blades.png", "sheep_feet_1_Golden_Rings.png", "sheep_feet_2_Elephant.png", "sheep_feet_3_Suction_Cups.png", "sheep_feet_4_Rainbow_High.png", "sheep_feet_5_Shackles.png", "Slippers.png", "Snowboard.png", "Striped Socks.png", "White and Gray Sneakers.png", "White Boots.png", "Yellow Sneakers.png"],
        ];
    } else {
        traits = ["Fur", "Head", "Eyes", "Mouth", "Neck"];
        assets = [
            ["Black.png", "Brown.png", "Cyborg.png", "Demon.png", "Golden.png", "Gray.png", "Skeleton.png", "White.png", "Zombie.png"],
            ["Omega.png", "Alpha.png", "Beta.png", "Delta.png", "wolf_head_Luna (emerald).png", "wolf_head_Luna (sapphire).png"],
            ["3D Glasses.png", "Calm.png", "Challenged.png", "Closed.png", "Crossed.png", "Curious.png", "Deep Blue.png", "Downward Gaze.png", "Expressionless.png", "Flashy Sunnies.png", "Full Moon.png", "Hipster Glasses.png", "Leftward Gaze.png", "Lovable.png", "Mascara.png", "Narrow Dots.png", "Non.png", "Pouncing.png", "Restless.png", "Rightward Gaze.png", "Simple.png", "Standard Sunnies.png", "Sus.png", "The Intellectual.png", "Triangle.png", "Unibrow.png", "Wide Dots.png", "wolf_eyes_1_Heterochromia.png", "wolf_eyes_2_Zorro.png", "wolf_eyes_3_Scar.png", "wolf_eyes_4_Ski_Goggles.png", "wolf_eyes_5_Dreaming.png", "wolf_eyes_6_Ski_Goggles_Plum.png", "wolf_eyes_7_.png"],
            ["Brown Nose Smirk.png", "Flared Nostrils.png", "Frown.png", "Gray Nose Smirk.png", "Howling.png", "Mischievous.png", "Narrow Smile.png", "Neutral.png", "Red Nose Smirk.png", "Relaxed.png", "Smoking.png", "Tongue Out.png", "Wide Smile.png", "wolf_mouth_1_Good_Boy.png", "wolf_mouth_2_Grin.png", "wolf_mouth_3_P.png", "wolf_mouth_4_Tongue_Up.png", "wolf_mouth_5_Yummy.png", "wolf_mouth_6_Deadpan.png"],
            ["None.png", "Bandana.png", "Bowtie.png", "Clock.png", "Diamond.png", "Dress Tie.png", "Flowers.png", "Gold.png", "Mask.png", "Pearls.png", "Secret Society.png", "Sheep Heart.png", "Silver.png", "Sunglasses.png", "Teeth.png", "wolf_neck_1_Gold_Medal.png", "wolf_neck_2_Bone.png", "wolf_neck_3_Whistle.png", "wolf_neck_4_Earphones.png", "wolf_neck_5_Plum.png", "wolf_neck_6_Key.png", "wolf_neck_7_Sheep_Horn.png"],
        ];
    }
    reloadImages(0);
    defaultImageF();
}

function reloadImages(value) {
    currentTrait = value;
    customizerHTMLsetup();
}

function customizerHTMLsetup() {
    let html = "";
    let trait = traits[currentTrait];
    let assetList = assets[currentTrait];
    // html += '  <h3>CHOOSE TRAITS : ' + trait + '</h3>';
    // all traits are listed here
    html += '  <h3 class="chtr">CHOOSE TRAITS : ';
    for (let i = 0; i < traits.length; i++) {
        let trait = traits[i];
        if (i === currentTrait) html += '<span class="qw cur">' + trait + '</span>';
        else html += '<span class="qw" onclick="reloadImages(' + i + ')">' + trait + '</span>';
        html += '  <span class="cube"></span>';
    }
    html = html.slice(0, -27);
    html += '</h3>';
    html += '  <div class="asset-list">';
    for (let j = 0; j < assetList.length; j++) {
        let asset = assetList[j];
        let assetSrc = 'assets/images/' + selected_type + '/' + trait + '/' + asset;
        html += '    <img title="' + asset.slice(0, -4) + '" class="asset" src="' + assetSrc + '" onclick="selectAsset(' + currentTrait + ', ' + j + ', true)" style="background-image:url(assets/images/' + selected_type + '/default.png)\n" alt="">';
    }
    html += '</div>';
    document.querySelector("#customizer").innerHTML = html;
    document.querySelector("#back-button").disabled = currentTrait === 0;
    document.querySelector("#next-button").disabled = (currentTrait === 6 && typeSelector.value === "sheep") || (currentTrait === 4 && typeSelector.value === "wolf");
}

function selectAsset(trait_id = 0, asset_id = 0, need_render = true) {
    trait_name = traits[trait_id];
    asset_name = assets[trait_id][asset_id];
    asset_id = trait_id;
    render_layers[asset_id] = `assets/images/${selected_type}/${trait_name}/${asset_name}`;
    if (need_render) renderImage();
    let trait = trait_name;
    let asset = asset_name.slice(0, -4);
    let html = "";
    html += '  <div class="trait">';
    html += '<h4>' + trait + ' : <span class="asset">' + asset + '</span>' + '</h4>';
    html += '</div>';
    if (document.querySelector("#confirmed-traits").innerHTML.includes(trait)) {
        let traitHTML = document.querySelector("#confirmed-traits").innerHTML;
        let traitHTMLArray = traitHTML.split("</div>");
        let traitHTMLArray2 = [];
        for (let i = 0; i < traitHTMLArray.length; i++) {
            if (traitHTMLArray[i].includes(trait)) traitHTMLArray2.push(html);
            else traitHTMLArray2.push(traitHTMLArray[i] + "</div>");
        }
        document.querySelector("#confirmed-traits").innerHTML = traitHTMLArray2.join("");
    } else document.querySelector("#confirmed-traits").innerHTML += html;
}

function renderImage() {
    if (render_layers.length === 0) defaultImageF();
    else {
        ctx.imageSmoothingEnabled = false;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < render_layers.length; i++) {
            let image = new Image();
            image.src = render_layers[i];
            image.onload = function () {
                ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
                // let opacity = 0.5;
                // let interval = setInterval(function () {
                //     if (opacity >= 1) {
                //         clearInterval(interval);
                //     }
                //     canvas.style.opacity = opacity;
                //     opacity += 0.01;
                // }, 0.5);
            }
            canvas.style.backgroundImage = "none";
            canvas.src = canvas.toDataURL();
        }
        // console.log("rendered : " + render_layers + " on canvas _______________________________");
        // canvas.style.backgroundImage = "none";
        // canvas.src = canvas.toDataURL();
    }
}

//_______________________________________________________________

// 3. SAVE IMAGE

document.getElementById("save-button").addEventListener("click", saveImage);

function saveImage() {
    let dataURL = canvas.toDataURL();
    let link = document.createElement("a");
    link.download = selected_type + ".png";
    link.href = dataURL;
    link.click();
}

//_______________________________________________________________

// 4. RESET IMAGE

let resetButton = document.getElementById("reset-button");
resetButton.addEventListener("click", function () {
    document.getElementById("warning-window").classList.remove("hidden");
});

let yesButton = document.getElementById("yes-button");
yesButton.addEventListener("click", function () {
    resetImage();
    document.getElementById("warning-window").classList.add("hidden");
});

function resetImage() {
    defaultImageF();
    render_layers = [];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    reloadImages(0);
//     clear confirmed-traits
    document.querySelector("#confirmed-traits").innerHTML = "";
}

let noButton = document.getElementById("no-button");
noButton.addEventListener("click", function () {
    document.getElementById("warning-window").classList.add("hidden");
});

//_______________________________________________________________

// 5. CUSTOMIZER NAVIGATION

let backButton = document.getElementById("back-button");
backButton.addEventListener("click", function () {
    if (currentTrait > 0) {
        currentTrait--;
        if (currentTrait < 0) currentTrait = traits.length - 1;
        customizerHTMLsetup();
    }
});

let nextButton = document.getElementById("next-button");
nextButton.addEventListener("click", function () {
    if (document.querySelector("#confirmed-traits").innerHTML.includes(traits[currentTrait])) {
        if (currentTrait < traits.length - 1) {
            currentTrait++;
            if (currentTrait > traits.length - 1) currentTrait = 0;
            customizerHTMLsetup();
        }
    } else {
        document.getElementById("info-window").classList.remove("hidden");
    }
});

let html = '<h3 class="sub-title-2">Customize your ' + selected_type + '</h3>';
document.querySelector("#sub-title-2").innerHTML = html;

let okButton = document.getElementById("ok-button");
okButton.addEventListener("click", function () {
    document.getElementById("info-window").classList.add("hidden");
});

function defaultImageF() {
    document.getElementById("render-canvas").style.backgroundImage = "url(assets/images/" + selected_type + "/default.png)";
    document.getElementById("render-canvas").style.backgroundSize = previewSize + "px";
    document.getElementById("render-canvas").src = canvas.toDataURL();
}






