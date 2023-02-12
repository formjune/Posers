var traits = [];
var assets = [];
var selected_type = "sheep";
var currentTrait = 0;


let render_layers = [];
let canvas = document.getElementById("render-canvas");
let ctx = canvas.getContext("2d");
let typeSelector = document.getElementById("typeSelector");

let previewSize = 250;

var backButton = document.getElementById("back-button");
var nextButton = document.getElementById("next-button");

var sheepButton = document.getElementById("sheep-button");
var wolfButton = document.getElementById("wolf-button");


nextButton.addEventListener("click", nextFunction);
backButton.addEventListener("click", backFunction);

var html = '<h3 class="sub-title-2">Customize your ' + selected_type + '</h3>';
document.querySelector("#sub-title-2").innerHTML = html;
typeSelector.addEventListener("change", function () {
    selected_type = typeSelector.value;
    selectType(typeSelector.value);
    resetImage();
    var html = '<h3 class="sub-title-2">Customize your ' + selected_type + '</h3>';
    document.querySelector("#sub-title-2").innerHTML = html;
});

document.getElementById("save-button").addEventListener("click", function () {
    saveImage();
});

document.getElementById("sheep-button").addEventListener("click", function () {
    typeSelector.value = "sheep";
    selected_type = typeSelector.value;
    selectType(typeSelector.value);
    resetImage();
    var html = '<h3 class="sub-title-2">Customize your ' + selected_type + '</h3>';
    document.querySelector("#sub-title-2").innerHTML = html;
});

document.getElementById("wolf-button").addEventListener("click", function () {
    typeSelector.value = "wolf";
    selected_type = typeSelector.value;
    selectType(typeSelector.value);
    resetImage();
    var html = '<h3 class="sub-title-2">Customize your ' + selected_type + '</h3>';
    document.querySelector("#sub-title-2").innerHTML = html;
});

window.onload = function () {
    selectType();

};

let resetButton = document.getElementById("reset-button");
resetButton.addEventListener("click", function () {
    document.getElementById("warning-window").classList.remove("hidden");
});

let yesButton = document.getElementById("yes-button");
yesButton.addEventListener("click", function () {
    resetImage();
    document.getElementById("warning-window").classList.add("hidden");
});

let noButton = document.getElementById("no-button");
noButton.addEventListener("click", function () {
    document.getElementById("warning-window").classList.add("hidden");
});

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

function defaultImageF() {
    document.getElementById("render-canvas").style.backgroundImage = "url(assets/images/" + selected_type + "/default.png)";
    document.getElementById("render-canvas").style.backgroundSize = previewSize + "px";
    document.getElementById("render-canvas").src = canvas.toDataURL();
}

function reloadImages(value) {
    currentTrait = value;
    var html = "";
    var trait = traits[currentTrait];
    var assetList = assets[currentTrait];
    html += '  <h3>CHOOSE TRAITS : ' + trait + '</h3>';
    html += '  <div class="asset-list">';
    for (var j = 0; j < assetList.length; j++) {
        var asset = assetList[j];
        var assetSrc = 'assets/images/' + selected_type + '/' + trait + '/' + asset;
        html += '    <img title="' + asset.slice(0, -4) + '" class="asset" src="' + assetSrc + '" onclick="selectAsset(' + currentTrait + ', ' + j + ', true)" style="background-image:url(assets/images/' + selected_type + '/default.png)\n">';
    }
    html += '</div>';
    document.querySelector("#customizer").innerHTML = html;
}

function selectAsset(trait_id = 0, asset_id = 0, need_render = false) {
    let trait_name = traits[trait_id];
    let asset_name = assets[trait_id][asset_id];
    asset_id = trait_id;
    render_layers[asset_id] = `assets/images/${selected_type}/${trait_name}/${asset_name}`;
    if (need_render) renderImage();
}

function renderImage() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.imageSmoothingEnabled = false;
    for (var i = 0; i < render_layers.length; i++) {
        var image = new Image();
        image.src = render_layers[i];
        console.log(image.src);
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    }
    document.getElementById("render-canvas").style.backgroundImage = "none";
    document.getElementById("render-canvas").src = canvas.toDataURL();
}

function saveImage() {
    let dataURL = canvas.toDataURL();
    let link = document.createElement("a");
    link.download = selected_type + ".png";
    link.href = dataURL;
    link.click();
}

function resetImage() {
    defaultImageF();
    render_layers = [];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    reloadImages(0);
}

function nextFunction() {
    if (render_layers[currentTrait] !== undefined) {
        if (currentTrait < traits.length - 1) {
            currentTrait++;
            if (currentTrait >= traits.length) currentTrait = 0;
            var html = "";
            var trait = traits[currentTrait];
            var assetList = assets[currentTrait];
            html += '  <h3>CHOOSE TRAITS : ' + trait + '</h3>';
            html += '  <div class="asset-list">';
            for (var j = 0; j < assetList.length; j++) {
                var asset = assetList[j];
                var assetSrc = 'assets/images/' + selected_type + '/' + trait + '/' + asset;
                html += '<img title="' + asset.slice(0, -4) + '" class="asset" src="' + assetSrc + '" onclick="selectAsset(' + currentTrait + ', ' + j + ', true)" style="background-image:url(assets/images/' + selected_type + '/default.png)\n">';
            }
            html += '</div>';
            document.querySelector("#customizer").innerHTML = html;
        }
    }
}

function backFunction() {
    if (currentTrait > 0) {
        currentTrait--;
        if (currentTrait < 0) {
            currentTrait = traits.length - 1;
        }
        var html = "";
        var trait = traits[currentTrait];
        var assetList = assets[currentTrait];
        html += '  <h3>CHOOSE TRAITS : ' + trait + '</h3>';
        html += '  <div class="asset-list">';
        for (var j = 0; j < assetList.length; j++) {
            var asset = assetList[j];
            var assetSrc = 'assets/images/' + selected_type + '/' + trait + '/' + asset;
            html += '    <img title="' + asset.slice(0, -4) + '" class="asset" src="' + assetSrc + '" onclick="selectAsset(' + currentTrait + ', ' + j + ', true)" style="background-image:url(assets/images/' + selected_type + '/default.png)\n">';
        }
        html += '</div>';
        document.querySelector("#customizer").innerHTML = html;
    }
}



