Module.register("MMM-DailyPokemon", {
	defaults: {
		updateInterval: 86400000, //1 Day
		grayscale: true,//Turns villager image and type images gray to match magic mirror styles
		minVill: 1, //Default to all villagers
		maxVill: 391,//Highest number -391 villagers are available for the module
		showType: true, //Shows type icons below villager's image
		stats: true,  //Displays villager trait table
		language: "en",
		genera: true,  //Sub-description for the villager
		gbaMode: true, //Changes font to GBA style
		nameSize: 32, //Changes header size - px
	},

	requiresVersion: "2.1.0", // Required version of MagicMirror

	start: function() { //Setting up interval for refresh
		var self = this;

		setInterval(function() {
			self.updateDom();
		}, this.config.updateInterval);
	},

	getDom: function() { //Creating initial div
		var wrapper = document.createElement("div");
		wrapper.id = "poke-wrapper";
		if(this.config.stats === true){
			wrapper.style.width = "400px";
		} else {
			wrapper.style.width = "200px";
		}
		var header = document.createElement("h4");
		header.innerHTML = "Daily Villager";
		header.id = "vill-header";

		//wrapper.appendChild(header);
		this.getData(wrapper);//Sending the request
		return wrapper;
	},

	getData: function(wrapper) { //Sends XHTTPRequest
		var self = this;
		var villNumber = Math.round(Math.random()*(this.config.maxVill - this.config.minVill) + this.config.minVill);
		var apiURL = "http://acnhapi.com/v1/villagers/" + villNumber + "/";
		var httpRequest = new XMLHttpRequest();

		var translatedName;
		var languageChosen = this.config.language;

	

		httpRequest.onreadystatechange = function() {
			if(this.readyState == 4 && this.status == 200) {
				console.log(JSON.parse(this.responseText));
				var responsePokemon = JSON.parse(this.responseText);
				Log.log(responsePokemon);


				self.createContent(responsePokemon, wrapper);
			} else {
				return "Loading...";
			}
		}
		httpRequest.open("GET", apiURL, true);
		httpRequest.send();
	},

	createContent: function(data, wrapper) { //Creates the elements for display
		var pokeWrapper = document.createElement("div");
		pokeWrapper.id = "poke-info";
		var flexWrapper = document.createElement("div");
		flexWrapper.id = "flex-wrapper";
		var villName= document.createElement("p");
		//TODO - maybe add an option to get rid of Pokedex #
		villName.innerHTML = data.name.charAt(0).toUpperCase() + data.name["name-USen"] + " - #" + data.id;
		villName.id = "poke-name";

		if(this.config.gbaMode) villName.style.fontFamily = "'acfontfam'";

		// Font size/style modification
		if(this.config.nameSize != 32) {
			if(this.config.gbaMode){
				villName.style.cssText = "font-size:" + this.config.nameSize + "px; font-family: 'acfontfam';";
			} else {
				villName.style.cssText = "font-size:" + this.config.nameSize + "px;";
			}
		} else if(this.config.nameSize == 32) {//Changing default size if gbaMode is enabled without size changes added
			if(this.config.gbaMode){
				villName.style.cssText = "font-size: 22px; font-family: 'acfontfam';";
			}
		}

		wrapper.appendChild(villName);

		if(this.config.genera){
			var villSubName = document.createElement("p");
			//TODO - maybe add an option to get rid of Pokedex #
			villSubName.id = "poke-subname";
			if(this.config.gbaMode) villSubName.style.cssText = "font-family: 'acfontfam'";
			wrapper.appendChild(villSubName);
		}

		var pokePic = document.createElement("img");
		pokePic.src = data.icon_uri;
		pokePic.id = "poke-pic";
		if(this.config.grayscale) {
			pokePic.id = "poke-pic-grayscale";
		}
		pokeWrapper.appendChild(pokePic);


		statWrapper = document.createElement("div");
		//TODO - Add in a stats table
		if(this.config.stats){
			var statTable = document.createElement("table");
			if(this.config.gbaMode) statTable.style.cssText = "font-family: 'acfontfam'";

			for(let i=5; i>=0; i--){//Inverted to list stats in right order
				let tr = document.createElement("tr");
				let tdName = document.createElement("td");
				let tdPersonality = document.createElement("td");
				let tdSpecies = document.createElement("td");
				let tdBirthday = document.createElement("td");
				let tdGender = document.createElement("td");
				let tdCatchphrase = document.createElement("td");

				tdName.innerHTML = "personality";
				tdPersonality.innerHTML = data.personality;
				tdSpecies.innerHTML =  data.species;
				tdBirthday.innerHTML = data.birthday;
				tdGender.innerHTML = data.gender;
				tdCatchphrase.innerHTML = data.catchphrase;

				tr.appendChild(tdName);
				tr.appendChild(tdPersonality);
				tr.appendChild(tdSpecies);
				tr.appendChild(tdBirthday);
				tr.appendChild(tdGender);
				tr.appendChild(tdCatchphrase);
				statTable.appendChild(tr);
			}

			statWrapper.appendChild(statTable);
			flexWrapper.appendChild(statWrapper);
		}
		wrapper.appendChild(flexWrapper);

	},

	getStyles: function() {
		return [this.file('MMM-DailyACVillager.css')]
	},

	getTranslations: function() {
		return {
			en: "translations/en.json",
			fr: "translations/fr.json"
		}
	}
	});