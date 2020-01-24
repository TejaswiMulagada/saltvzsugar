/*
* 
*
*/




/*
* asyc http request returns a promise
* all the instagram data used in the functions should be moved
*/
let dataIds = [];
var apikey = process.env.INSTAGRAM_ACCESSTOKEN;
const mediaUrl = "https://graph.instagram.com/v1.0/17841411489686777/media?access_token=" + apikey;
fetch(mediaUrl, { cache: "reload" })
    .then((response) => response.json())
    .then(function (results) {
        results.data.forEach((element, index) => {
            dataIds.push(element.id);
        });
        let nextUrl = results.paging.next;
        fetch(nextUrl)
            .then((response) => response.json())
            .then(nextResults => {
                nextResults.data.forEach((element, index) => {
                    dataIds.push(element.id);
                });
                getImgData(dataIds);
            })
            .catch(err => {console.log(err);})
    })
    .catch(function (error) {
        console.log(error);
});

/*
* function to retrive image data from the dataIds
*/
function getImgData(u) {
    let dataUrl;
    u.forEach(i => {
        dataUrl = "https://graph.instagram.com/" + i + "?fields=id,thumbnail_url,permalink,media_type,media_url,username,timestamp&access_token="+apikey;
        fetch(dataUrl)
            .then((response) => response.json())
            .then(d => {
                displayData(d);
            })
            .catch(err => {console.log("Error while retriving image data", err);})
    })
}

/*
* function to display image data
*/
function displayData(imgResult) {

    const modal = document.getElementById("myModal");
    const ul = document.getElementById('imgResult');
    const li = document.getElementById('list');
    const image = document.createElement('img');
    const span = document.getElementsByClassName("close")[0];
    const modalImg = document.getElementById("img01");

    image.setAttribute('src', imgResult.media_url);
    image.setAttribute('width', 200);

    image.setAttribute('border', 10);
    image.style.padding = "7px";
    //image.autofocus = true;
    image.setAttribute('alt', "IMage");

    //this can be done better
    image.onclick = function(){
        modal.style.display = "block";
        modal.style.width = "700px";
        modal.style.overflow = "auto",
        modal.style.alignContent = "center";
        modalImg.src = imgResult.media_url;
    }
    window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      }

    span.onclick = function(){
        modal.style.display = "none";
    }

    li.appendChild(image);
    ul.appendChild(li);
}