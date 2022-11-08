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
