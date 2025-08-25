const mainContainer = document.querySelector(".container");
const miniContainer = document.querySelector(".sub-container")
const videoURL = document.getElementById("link")
const mediaType = document.getElementById("selected")
const downloadBtn = document.getElementById("download") 
const progressReport = document.querySelector(".progress")
const spin = document.getElementById("spinner")
const pasteCurrentText = document.getElementById('btn')
let validUrl = false;
 //Demo before getting The main API


        showarn = document.createElement("i")
        showarn.style.color = "red"
        showarn.style.textAlign = "center"
        miniContainer.appendChild(showarn)
        
 
    pasteCurrentText.addEventListener('click', async() => {
     try{
                
        const pastedData = await navigator.clipboard.readText();
        videoURL.value = pastedData

            if(!pastedData.startsWith("https://")) { 
                    showarn.textContent = "invalid link";
                setTimeout(() => {
                    validUrl = false;
                    downloadBtn.disabled = true;
                    location.reload()
                }, 2000)
            
            } 

            else {
                validUrl = true;
                showarn.style.display = "none"
                downloadBtn.disabled = false;
            }
     } catch(error) {
        console.error('Error pasting', error)
     }
    })
  


    const mediaQualities = document.querySelector(".Media")

        downloadBtn.addEventListener("click", () => {
        const mp4 = document.createElement("button")
        const mp3 = document.createElement("button")
        const hd = document.createElement("button")

            mp4.innerHTML = "Mp4"
            mp3.innerHTML = "Mp3"
            hd.innerHTML = "HD"

     if(mediaQualities.childElementCount === 0) {
        mediaQualities.appendChild(mp4)
        mediaQualities.appendChild(mp3)
        mediaQualities.appendChild(hd)
        }    

   [mp4, mp3, hd].forEach(btn => {

        btn.addEventListener("click", () => {

            if(!validUrl) {
                mediaType.textContent = "Please enter a valid link"
             } else {

                 mediaQualities.style.display = "none";
                mediaType.textContent = `${btn.innerHTML} selected`
                 downloadBtn.style.backgroundColor = "red"
                downloadBtn.addEventListener("click", function() {
                    spin.style.display = "block";
                    mediaType.style.display = "none";
                    progressReport.textContent = "initializing"
                            //calling Backend Endpoint
                        window.open(`http://localhost:3000/download?url=${videoURL}`);
                     setTimeout(() => {
                        progressReport.textContent = "Checking video availability...";
                        setTimeout(() => {
                            progressReport.textContent = "Fetching video data...";
                            setTimeout(() => {
                                progressReport.textContent = "Configuring core modules..."
                                setTimeout(() => {
                                    progressReport.innerHTML = "Failed"
                                    spin.style.display = "none"
                                }, 5000)
                            }, 3000)
                        }, 2000)
                    }, 1000);
                })
            }
        })
   })
})
                                      
