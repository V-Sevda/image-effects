async function init(){
    let rustApp = null

    try {
        rustApp = await import('../pkg') //try to import the rust file
    } catch (e) {
        console.error(e) //failed to import the rust file
        return;
    }
    console.log(rustApp)

    const input = document.getElementById('upload')
    const fileReader = new FileReader()

    fileReader.onload = ()  =>{
        let base64 = fileReader.result.replace(  //we add the replace() func to remove the meta deta from the uploaded file. They dont need
            /^data:image\/(png|jpeg|jpg);base64,/, ''  //here is the expression
        )
        let img_data_url = rustApp.grayscale(base64)
        document.getElementById('new-img').setAttribute(
            'src', img_data_url
        )
    }

    input.addEventListener('change', () => {
        fileReader.readAsDataURL(input.files[0]) //it transforms the image in to a string
    })
}

init()