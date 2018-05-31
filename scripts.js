const resultsSection = document.querySelector('.results');
const submitButton = document.querySelector('input[type="submit"]');

submitButton.addEventListener('click', function(evt){
	evt.preventDefault();
	let searchCriteria = document.querySelector('input[type="text"]').value;

	let giphyAPI = "https://api.giphy.com/v1/gifs/search";				//Giphy API url

	let giphyOptions = {												//using the giphy api web page for reference, send in the required parameters			
		api_key: "qw3kjktYq1PdxFUtuBQPDtYci7mGudFy",
		q: searchCriteria,
		limit: 100,
		fmt: "json"
	};

	function displayPhotos(response){									//Defining the callback function upon success of ajax call.
		let imgURLs = [];												//Create empty array for image urls from API

		for(let i=0; i<response.data.length; i++){						//Iterate through all image urls from API and add to empty array
			let imgURL = response.data[i].images.fixed_height_small.url;
			imgURLs.push(imgURL);
		}

		let resultsHTML = '';											//Create empty html that will finally include all <img> html

		for(let i=0; i<imgURLs.length; i++){							//Iterate through imgURLs array and add items to resultsHTML
			resultsHTML += '<img src='+imgURLs[i]+'>'
		}
		
		resultsSection.innerHTML = resultsHTML;							//Finally add the resultsHTML string to the Section element
	};

	$.getJSON(giphyAPI, giphyOptions, displayPhotos);					//ajax call using jquery's getJSON method

	console.log("You searched giphy for: " + searchCriteria);
});