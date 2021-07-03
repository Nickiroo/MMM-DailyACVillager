/*alright listen up im shit at coding and this is probably the scrappiest mf magic mirror module you've ever seen i just
wanted to make somethin cool for my girlfriend*/


Module.register("MMM-DailyACVillager", {
	defaults: {
		updateInterval: 864000, //1 Day
		grayscale: false,//Turns villager image and type images gray to match magic mirror styles
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
		wrapper.id = "vill-wrapper";
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

	getData: function(wrapper) { //Sends XHTTPRequest using the random villager's number and then returns stats
		var self = this;
		var villNumber = Math.round(Math.random()*(this.config.maxVill - this.config.minVill) + this.config.minVill);
		var apiURL = "http://acnhapi.com/v1/villagers/" + villNumber + "/";
		var httpRequest = new XMLHttpRequest();

		httpRequest.onreadystatechange = function() {
			if(this.readyState == 4 && this.status == 200) {
				console.log(JSON.parse(this.responseText));
				var responsevillmon = JSON.parse(this.responseText);
				Log.log(responsevillmon);


				self.createContent(responsevillmon, wrapper);
			} else {
				return "Loading...";
			}
		}
		httpRequest.open("GET", apiURL, true);
		httpRequest.send();
	},

	createContent: function(data, wrapper) { //Creates the elements for display
		var villWrapper = document.createElement("div");
		villWrapper.id = "vill-info";
		var flexWrapper = document.createElement("div");
		flexWrapper.id = "flex-wrapper";
		var villName= document.createElement("p");
		//TODO - maybe add an option to get rid of villdex #
		villName.innerHTML = data.name["name-USen"] + " - #" + data.id;
		villName.id = "vill-name";

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
			//TODO - maybe add an option to get rid of villdex #
			villSubName.id = "vill-subname";
			if(this.config.gbaMode) villSubName.style.cssText = "font-family: 'acfontfam'";
			wrapper.appendChild(villSubName);
		}

		var villPic = document.createElement("img");
		villPic.src = data.icon_uri;
		villPic.id = "vill-pic";
		if(this.config.grayscale) {
			villPic.id = "vill-pic-grayscale";
		}
		villWrapper.appendChild(villPic);
		flexWrapper.appendChild(villWrapper);

		statWrapper = document.createElement("div");


		/*If the stats table is enabled in the user's config then it will show the villager's name, personality
		type, species, birthday, gender, and catchphrase.  */
		if(this.config.stats){
			var statTable = document.createElement("table");
			if(this.config.gbaMode) statTable.style.cssText = "font-family: 'acfontfam'";

				let trPersonality = document.createElement("tr");
				let tdPersonality = document.createElement("td");
                let tdName = document.createElement("td");
				let trSpecies = document.createElement("tr");
				let tdSpecies = document.createElement("td");
				let tdSpeciesName = document.createElement("td");
				let trBirthday = document.createElement("tr");
				let tdBirthdayName = document.createElement("td");
				let tdBirthday = document.createElement("td");
				let trGender = document.createElement("tr");
				let tdGenderName = document.createElement("td");
				let tdGender = document.createElement("td");
				let trCatchphrase = document.createElement("tr");
				let tdCatchphraseName = document.createElement("td");
				let tdCatchphrase = document.createElement("td");

				tdName.innerHTML = "personality";
				tdPersonality.innerHTML = data.personality;
				tdSpeciesName.innerHTML = "species";
				tdSpecies.innerHTML = data.species;
				tdBirthdayName.innerHTML = "birthday";
				tdBirthday.innerHTML = data.birthday;
				tdGenderName.innerHTML = "gender";
				tdGender.innerHTML = data.gender;
				tdCatchphraseName.innerHTML = "catchphrase";
				tdCatchphrase.innerHTML = data["catch-phrase"];

				trPersonality.appendChild(tdName);
				trPersonality.appendChild(tdPersonality);
	
				trSpecies.appendChild(tdSpeciesName);
				trSpecies.appendChild(tdSpecies);

				trBirthday.appendChild(tdBirthdayName);
				trBirthday.appendChild(tdBirthday);

				trGender.appendChild(tdGenderName);
				trGender.appendChild(tdGender);

				trCatchphrase.appendChild(tdCatchphraseName);
				trCatchphrase.appendChild(tdCatchphrase);

				statTable.appendChild(trPersonality);
				statTable.appendChild(trSpecies);
				statTable.appendChild(trBirthday);
				statTable.appendChild(trGender);
				statTable.appendChild(trCatchphrase);

			statWrapper.appendChild(statTable);
			flexWrapper.appendChild(statWrapper);
		}
		wrapper.appendChild(flexWrapper);

	},

	getStyles: function() {
		return [this.file('MMM-DailyACVillager.css')]
	}
	});
