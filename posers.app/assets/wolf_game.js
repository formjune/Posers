let traits = [];
let assets = [];

let selected_type = "sheep";
let selected_assets = [];
let render_layers = [];

function selectType(type = "sheep") {
    // прикрепляем к кнопке выбора типа. также выполнем при загрузке страницы
    if (type == "sheep") {
        traits = ["Fur", "Head", "Ears", "Eyes", "Nose", "Mouth", "Feet"];
        assets = [
            ["Black.png", "Brown.png", "Gray.png", "Survivor.png", "White.png"],
            ["Beanie.png", "Blue Hat.png", "Blue Horns.png", "Bucket Hat.png", "Capone.png", "Cowboy Hat.png", "Curved Brown Horns.png", "Curved Golden Horns.png", "Fedora.png", "Mailman.png", "None.png", "Pointy Brown Horns.png", "Pointy Golden Horns.png", "Rainbow Fro.png", "Red Cap.png", "Santa.png", "sheep_head_1_Reggae_Poncho.png", "sheep_head_2_Partially_Shaved.png", "sheep_head_3_Brain.png", "sheep_head_4_Pointy_Red_Horns.png", "sheep_head_5_Crown.png", "sheep_head_6_Mushroom.png", "Silky.png", "Sun Hat.png", "Visor.png", "White Cap.png"],
            ["Diamond Bling.png", "Diamond Stud.png", "Gold Bling.png", "Gold Hoop.png", "None.png", "sheep_ears_1_Hearts.png", "sheep_ears_1_Hearts_blacked.png", "sheep_ears_2_Plums.png", "sheep_ears_3_Pears.png", "sheep_ears_4_Cola.png", "sheep_ears_5_Golden_Chains.png", "sheep_ears_6_DNA.png", "sheep_ears_7_Long_Eared.png", "sheep_ears_8_Cross.png", "sheep_ears_9_Lock.png", "Two Gold Piercings.png"],
            ["Angry.png", "Basic Sun Protection.png", "Big Blue.png", "Black Glasses.png", "Bloodshot.png", "Confused.png", "Cross Eyed.png", "Cyclops.png", "Dork.png", "Face Painted.png", "Fake Glasses.png", "Fearful.png", "Fearless.png", "Happy.png", "Leafy Green.png", "Livid.png", "Night Vision Visor.png", "OMG.png", "Rainbow Sunnies.png", "Red Glasses.png", "Rolling.png", "sheep_eyes_1_Drunk.png", "sheep_eyes_2_xX.png", "sheep_eyes_3_Three_Eyed.png", "sheep_eyes_4_Crying.png", "sheep_eyes_5_Eyepatch_Red.png", "sheep_eyes_6_Eyepatch_Black.png", "sheep_eyes_7_Hypno.png", "sheep_eyes_8_Bored.png", "Sleepy.png", "Small Blue.png", "Spacey.png", "Squint Left.png", "Squint Right.png", "Staring Contest.png", "X Ray.png"],
            ["Dot.png", "Dots.png", "Gold.png", "Normal.png", "Punched.png", "Red.png", "sheep_nose_1_Snotty.png", "sheep_nose_2_Wide_Nostrills.png", "sheep_nose_2_Wide_Nostrills_Brown.png", "sheep_nose_3_Human.png", "sheep_nose_4_Piggo.png", "sheep_nose_5_Acne.png", "sheep_nose_6_Cotton_Wool.png", "Triangle.png", "U.png", "Wide.png", "X.png"],
            ["Beard.png", "Big Smile.png", "Cheese.png", "Chill Smile.png", "Chinstrap.png", "Cigarette.png", "Grillz.png", "Missing Tooth.png", "Mustache.png", "Narrow Open Mouth.png", "Neutral.png", "Pipe.png", "Pouting.png", "sheep_mouth_10_Chin_Guard.png", "sheep_mouth_1_Wide_tongue_pill_green.png", "sheep_mouth_2_Tongue_Pill_Red.png", "sheep_mouth_3_Dotted.png", "sheep_mouth_4_Shaolin.png", "sheep_mouth_5_Vampire.png", "sheep_mouth_6_Eating_Grass.png", "sheep_mouth_7_Eating_Carrot.png", "sheep_mouth_7_Eating_Carrot_left.png", "sheep_mouth_8_WoW.png", "sheep_mouth_9_Bristle.png", "Smirk.png", "Teasing.png", "Wide Open Mouth.png"],
            ["Blue Sneakers.png", "Clogs.png", "Dress Shoes.png", "Elf.png", "Frozen.png", "Gray Shoes.png", "Green Sneakers.png", "High.png", "Ice Skates.png", "None.png", "Purple Sneakers.png", "Red Sneakers.png", "Roller Blades.png", "sheep_feet_1_Golden_Rings.png", "sheep_feet_2_Elephant.png", "sheep_feet_3_Suction_Cups.png", "sheep_feet_4_Rainbow_High.png", "sheep_feet_5_Shackles.png", "Slippers.png", "Snowboard.png", "Striped Socks.png", "White and Gray Sneakers.png", "White Boots.png", "Yellow Sneakers.png"],
        ];
    } else {
        traits = ["Fur", "Head", "Eyes", "Mouth", "Neck"];
        assets = [
            ["Black.png", "Brown.png", "Cyborg.png", "Demon.png", "Golden.png", "Gray.png", "Skeleton.png", "White.png", "Zombie.png"],
            ["Alpha.png", "Beta.png", "Delta.png", "Omega.png", "wolf_head_Luna (emerald).png", "wolf_head_Luna (sapphire).png"],
            ["3D Glasses.png", "Calm.png", "Challenged.png", "Closed.png", "Crossed.png", "Curious.png", "Deep Blue.png", "Downward Gaze.png", "Expressionless.png", "Flashy Sunnies.png", "Full Moon.png", "Hipster Glasses.png", "Leftward Gaze.png", "Lovable.png", "Mascara.png", "Narrow Dots.png", "Non.png", "Pouncing.png", "Restless.png", "Rightward Gaze.png", "Simple.png", "Standard Sunnies.png", "Sus.png", "The Intellectual.png", "Triangle.png", "Unibrow.png", "Wide Dots.png", "wolf_eyes_1_Heterochromia.png", "wolf_eyes_2_Zorro.png", "wolf_eyes_3_Scar.png", "wolf_eyes_4_Ski_Goggles.png", "wolf_eyes_5_Dreaming.png", "wolf_eyes_6_Ski_Goggles_Plum.png", "wolf_eyes_7_.png"],
            ["Brown Nose Smirk.png", "Flared Nostrils.png", "Frown.png", "Gray Nose Smirk.png", "Howling.png", "Mischievous.png", "Narrow Smile.png", "Neutral.png", "Red Nose Smirk.png", "Relaxed.png", "Smoking.png", "Tongue Out.png", "Wide Smile.png", "wolf_mouth_1_Good_Boy.png", "wolf_mouth_2_Grin.png", "wolf_mouth_3_P.png", "wolf_mouth_4_Tongue_Up.png", "wolf_mouth_5_Yummy.png", "wolf_mouth_6_Deadpan.png"],
            ["Bandana.png", "Bowtie.png", "Clock.png", "Diamond.png", "Dress Tie.png", "Flowers.png", "Gold.png", "Mask.png", "None.png", "Pearls.png", "Secret Society.png", "Sheep Heart.png", "Silver.png", "Sunglasses.png", "Teeth.png", "wolf_neck_1_Gold_Medal.png", "wolf_neck_2_Bone.png", "wolf_neck_3_Whistle.png", "wolf_neck_4_Earphones.png", "wolf_neck_5_Plum.png", "wolf_neck_6_Key.png", "wolf_neck_7_Sheep_Horn.png"],
        ];
    }
    selected_type = type;
    selected_assets = new Array(traits.length);
    render_layers = new Array(traits.length);
    for (let i = 0; i < trait_names.length; i++) {
        selectAsset(i, 0, false);
    }
    renderImage();
    // также тут надо перерисовать списки иконок
}

function selectAsset(trait_id = 0, asset_id = 0, need_render = false) {
    // прикрепляем к кнопкам выбора элементов
    selected_assets[trait_id] = asset_id;
    let trait_name = traits[trait_id];
    let asset_name = assets[trait_id][asset_id];
    render_layers[asset_id] = `assets/${selected_type}/${trait_name}/${asset_name}.png}`;
    if (need_render)
        renderImage();
}

function renderImage() {
    let image;
    for (let layer of render_layers) {
        // тут надо склеить картинки. потом увеличить до нужного размера
    }
}