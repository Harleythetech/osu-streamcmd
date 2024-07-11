     var APIKEY = 'https://osutrack-api.ameo.dev/peak?user=21943340&mode=0';

    try {
        const Getapi = await fetch(APIKEY, { method: "GET" });
        if (!Getapi) {
            document.getElementById("api").innerHTML = "No data response from osutrack-api, try again later. :(";
        } else {
            const jsonapi = await Getapi.json();
            const apitext = JSON.stringify(jsonapi);
            const modtext = apitext.replace("]", '');
            const finalapi = modtext.replace("[", "");
            const response = JSON.parse(finalapi);
            const FeedData = "Global rank: " + response.best_global_rank + ", " + "Accuracy: " + response.best_accuracy
            document.getElementById("api").innerHTML = FeedData;
            console.log(response);
        }

    } catch (exception) {
        document.getElementById("api").innerHTML = "No data response from osutrack-api, try again later. :(";
        console.error(exception);
    }


