# MMM-DailyACVillager

Inspired by NolanKingdon, creator of the DailyPokemon module for the magic mirror

## Coming updates:
- Clean up the css and make it just in general better looking
- Add a font option in the config to include animal crossing fonts
- add background option
- add different theme options that match vs code themes

<hr>

### What am I looking at here?
This is a module for the MagicMirror², an open source project for making smart mirrors that uses a modular system for displaying information on a screen that sits under a 1 way mirror. All documentation for that can be found here: https://github.com/MichMich/MagicMirror


MMM-DailyACVillager provides a unique Animal Crossing villager each day, or some other time interval, as well as information about that villager including personality, birthday, species, and a small sprite of the villager's face.

Built Using the RESTful ACNHAPI, so all information is going to be as up to date as possible. The api can be found here: http://acnhapi.com/ and if you wish to donate to the creator of the api that makes most ACNH projects possible you can do so here: https://www.buymeacoffee.com/acnhapi

![Daily villager](https://user-images.githubusercontent.com/16111897/124363599-03115180-dbf1-11eb-9e17-eb194c9b46aa.jpg)

Using the module
To install, clone this repo into ```~/MagicMirror/modules``` directory. Then move in the folder and install required libraries

```git
git clone https://github.com/Nickiroo/MMM-DailyACVillager
cd MMM-DailyACVillager
npm install
```

To use this module, add the following configuration block to the modules array in the ```config/config.js``` file:

```
var config = {
    modules: [
        {
            module: "MMM-DailyACVillager",
            position: "top_center",
            config: {
                updateInterval: 864000,
                minVill: 1,
                maxVill: 391,
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
```

<html><p>
Configuration options

Option	            Description<br>
updateInterval	    Optional How frequently you want it to update. Defaulted to once a day<br>
showType	        Optional Displays the Villager's type<br>
grayscale	        Optional Makes all images black and white to fit Mirror themes<br>
minVill	            Optional Start of your range. MUST be at least 1.<br>
maxVill	            Optional End of your range. MUST be 391 or below<br>
</p></html>
