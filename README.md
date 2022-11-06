# MMM-DailyACVillager

Inspired by NolanKingdon, creator of the DailyPokemon module for the magic mirror

This is a module for the MagicMirror².

MMM-DailyACVillager provides a unique Animal Crossing villager each day, as well as information about that villager.

Built Using the RESTful ACNHAPI

![Daily villager](https://user-images.githubusercontent.com/16111897/124363599-03115180-dbf1-11eb-9e17-eb194c9b46aa.jpg)


Using the module
To install, clone this repo into ~/MagicMirror/modules directory. Then move in the folder and install required libraries

git clone https://github.com/Nickiroo/MMM-DailyACVillager
cd MMM-DailyACVillager
npm install
To use this module, add the following configuration block to the modules array in the config/config.js file:

var config = {
    modules: [
        {
            module: "MMM-DailyACVillager",
            position: "top_center",
            config: {
                updateInterval: 600000,
                minPoke: 4,
                maxPoke: 151,
                grayscale: true,
                showType: true,
                language: "en",
                genera: true,
                gbaMode: true,
                nameSize: 26,
                flavorText: false
            }
        }
    ]
}
Configuration options
Option	Description
updateInterval	Optional How frequently you want it to update. Defaulted to once a day
showType	Optional Displays the Pokemon's type
grayscale	Optional Makes all images black and white to fit Mirror themes
minPoke	Optional Start of your range. MUST be at least 1.
maxPoke	Optional End of your range. MUST be 802 or below

Generations

Gen 1 - 001 to 151
Gen 2 - 152 to 251
Gen 3 - 252 to 386
Gen 4 - 387 to 493
Gen 5 - 494 to 649
Gen 6 - 650 to 721
Gen 7 - 722 to 802 (Technically 809, but the API only supports 802)
stats	Optional Displays Pokemon stats
language	Optional Change Pokemon name.

Languages supported

zh-Hans -
ja - Japanese
en - English (default)
it - Italian
es - Spanish
de - Deutsch
fr - French
zh-Hant - Chinese
ko - Korean
roomaji - Japanese (In Roomaji, latin alphabet)
ja-Hrkt - Czech

genera	Optional Displays the genera (One or two words to describe the Pokemon) from the official Pokedex
gbaMode	Optional Displays text like in GBA Pokedex (Old-school font and old labels).
nameSize	Optional Set title size (Name of the Pokemon), in pixels. 32 By default.
flavorText	Optional Displays the flavor text (short description of the pokemon) from the official Pokedex. When more than one version is returned, picks first one matching the selected language
Default Configuration
var config = {
    modules: [
        {
            module: "MMM-DailyPokemon",
            position: "top_center",
            config: {
                updateInterval: 86400000, //1 Day
                grayscale: true,//Turns pokemon image and type images gray to match magic mirror styles
                minPoke: 1, //Default to all pokemon
                maxPoke: 802,//Highest number - 802 pokemon currently exist
                showType: true, //Shows type icons below pokemon's image
                stats: true,
                language: "en",
                genera: true,
                gbaMode: true,
                nameSize: 32,
                flavorText: false // Whether to display flavor text for pokemon
            }
        }
    ]
}
