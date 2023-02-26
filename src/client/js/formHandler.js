function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    //checkForName(formText)
    console.log("length: ", formText.length);

    Client.checkForName(formText)
    if (formText.length > 0)
        Client.getData()
    else alert("field cant be left blank")

    console.log("::: Form Submitted :::")
    fetch('http://localhost:8080/test')
        .then(res => res.json())
        .then(function (res) {
            document.getElementById('results').innerHTML = res.message
        })


}

export { handleSubmit }
