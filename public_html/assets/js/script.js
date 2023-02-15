let traits = [];
let assets = [];
let selected_type = "sheep";
let currentTrait = 0;
let asset_name;
let trait_name;

let render_layers = [];
let canvas = document.getElementById("render-canvas");
let ctx = canvas.getContext("2d");

let preview = document.getElementById("render-canvas");
let previewSize = preview.height;

window.onload = function () {
    selectCharacter();
    selectType();
    randomize();
};

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

function selectType(value) {
    if (typeSelector.value === "sheep") {
        traits = ["BG", "Fur", "Head", "Ears", "Eyes", "Nose", "Mouth", "Feet"];
        assets = [
            ["Fairytale.png", "Fire.png", "Foggy.png", "Forest.png", "Illusion.png", "Magic.png", "Meadow.png", "Silent.png", "Sunrise.png", "Underwater.png"],
            ["Black.png", "Brown.png", "Gray.png", "Survivor.png", "White.png"],
            ["None.png", "Blue Hat.png", "Blue Horns.png", "Brain.png", "Bucket Hat.png", "Capone.png", "Cowboy Hat.png", "Crown.png", "Curved Brown Horns.png", "Curved Golden Horns.png", "Fedora.png", "Mailman.png", "Mushroom.png", "Beanie.png", "Partially Shaved.png", "Pointy Brown Horns.png", "Pointy Golden Horns.png", "Pointy Red Horns.png", "Rainbow Fro.png", "Red Cap.png", "Reggae Poncho.png", "Santa.png", "Silky.png", "Seed Hat.png", "Sun Hat.png", "Visor.png", "White Cap.png"],
            ["None.png", "Cross.png", "DNA.png", "Diamond Bling.png", "Diamond Stud.png", "Gold Bling.png", "Gold Hoop.png", "Golden Chains.png", "Hearts blacked.png", "Hearts.png", "Lock.png", "Long Eared.png", "Cola.png", "Pears.png", "Plums.png", "Two Gold Piercings.png"],
            ["Angry.png", "Basic Sun Protection.png", "Big Blue.png", "Black Glasses.png", "Bloodshot.png", "Bored.png", "Confused.png", "Cross Eyed.png", "Crying.png", "Cyclops.png", "Dork.png", "Drunk.png", "Eyepatch Black.png", "Eyepatch Red.png", "Face Painted.png", "Fake Glasses.png", "Fearful.png", "Fearless.png", "Happy.png", "Hypno.png", "Leafy Green.png", "Livid.png", "Night Vision Visor.png", "OMG.png", "Rainbow Sunnies.png", "Red Glasses.png", "Rolling.png", "Sleepy.png", "Seed Glasses.png", "Small Blue.png", "Spacey.png", "Squint Left.png", "Squint Right.png", "Staring Contest.png", "Three Eyed.png", "X Ray.png", "xX.png"],
            ["Acne.png", "Cotton Wool.png", "Dot.png", "Dots.png", "Gold.png", "Human.png", "Normal.png", "Piggo.png", "Punched.png", "Red.png", "Snotty.png", "Triangle.png", "U.png", "Wide Nostrills Brown.png", "Wide Nostrills.png", "Wide.png", "X.png"],
            ["Beard.png", "Big Smile.png", "Bristle.png", "Cheese.png", "Chill Smile.png", "Chin Guard.png", "Chinstrap.png", "Cigarette.png", "Dotted.png", "Eating Carrot left.png", "Eating Carrot.png", "Eating Grass.png", "Grillz.png", "Missing Tooth.png", "Mustache.png", "Narrow Open Mouth.png", "Neutral.png", "Pipe.png", "Pouting.png", "Shaolin.png", "Seed Beard.png", "Smirk.png", "Teasing.png", "Tongue Pill Red.png", "Vampire.png", "Wide Open Mouth.png", "Wide tongue pill green.png", "WoW.png"],
            ["None.png", "Clogs.png", "Dress Shoes.png", "Elephant.png", "Elf.png", "Frozen.png", "Golden Rings.png", "Gray Shoes.png", "Green Sneakers.png", "High.png", "Ice Skates.png", "Blue Sneakers.png", "Purple Sneakers.png", "Rainbow High.png", "Red Sneakers.png", "Roller Blades.png", "Shackles.png", "Slippers.png", "Snowboard.png", "Striped Socks.png", "Suction Cups.png", "White Boots.png", "White and Gray Sneakers.png", "Yellow Sneakers.png"]
        ];
    } else {
        traits = ["BG", "Fur", "Head", "Eyes", "Mouth", "Neck"];
        assets = [
            ["Fairytale.png", "Fire.png", "Foggy.png", "Forest.png", "Illusion.png", "Magic.png", "Meadow.png", "Silent.png", "Sunrise.png", "Underwater.png"],
            ["Black.png", "Brown.png", "Cyborg.png", "Demon.png", "Golden.png", "Gray.png", "Skeleton.png", "White.png", "Zombie.png"],
            ["Alpha.png", "Beta.png", "Delta.png", "Luna emerald.png", "Luna sapphire.png", "Omega.png"],
            ["3D Glasses.png", "Calm.png", "Challenged.png", "Chill.png", "Closed.png", "Crossed.png", "Curious.png", "Deep Blue.png", "Downward Gaze.png", "Dreaming.png", "Expressionless.png", "Flashy Sunnies.png", "Full Moon.png", "Heterochromia.png", "Hipster Glasses.png", "Leftward Gaze.png", "Lovable.png", "Mascara.png", "Narrow Dots.png", "Non.png", "Pouncing.png", "Restless.png", "Rightward Gaze.png", "Scar.png", "Simple.png", "Ski Goggles Plum.png", "Ski Goggles.png", "Standard Sunnies.png", "Sus.png", "The Intellectual.png", "Triangle.png", "Unibrow.png", "Wide Dots.png", "Zorro.png"],
            ["Brown Nose Smirk.png", "Deadpan.png", "Flared Nostrils.png", "Frown.png", "Good Boy.png", "Gray Nose Smirk.png", "Grin.png", "Howling.png", "Mischievous.png", "Narrow Smile.png", "Neutral.png", "P.png", "Red Nose Smirk.png", "Relaxed.png", "Smoking.png", "Tongue Out.png", "Tongue Up.png", "Wide Smile.png", "Yummy.png"],
            ["None.png", "Bone.png", "Bowtie.png", "Clock.png", "Diamond.png", "Dress Tie.png", "Earphones.png", "Flowers.png", "Gold Medal.png", "Gold.png", "Key.png", "Mask.png", "Bandana.png", "Pearls.png", "Plum.png", "Secret Society.png", "Sheep Heart.png", "Sheep Horn.png", "Silver.png", "Sunglasses.png", "Teeth.png", "Whistle.png"]
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
    document.querySelector("#next-button").disabled = (currentTrait === traits.length - 1);
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
        let loaded = 0;
        for (let i = 0; i < render_layers.length; i++) {
            let img = new Image();
            img.src = render_layers[i];
            img.onload = function () {
                loaded++;
                if (loaded === render_layers.length) {
                    for (let j = 0; j < render_layers.length; j++) {
                        let img = new Image();
                        img.src = render_layers[j];
                        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                    }
                }
            };
        }
    }
}

document.getElementById("save-button").addEventListener("click", saveImage);

function saveImage() {
    let canvas2 = document.createElement("canvas");
    canvas2.width = 2048;
    canvas2.height = 2048;
    let ctx2 = canvas2.getContext("2d");
    ctx2.imageSmoothingEnabled = false;
    ctx2.drawImage(canvas, 0, 0, canvas2.width, canvas2.height);
    let dataURL = canvas2.toDataURL();
    let link = document.createElement("a");
    link.download = selected_type + ".png";
    link.href = dataURL;
    link.click();
}

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
    document.querySelector("#confirmed-traits").innerHTML = "";
}

let noButton = document.getElementById("no-button");
noButton.addEventListener("click", function () {
    document.getElementById("warning-window").classList.add("hidden");
});

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
    console.log(previewSize);
    document.getElementById("render-canvas").src = canvas.toDataURL();
}