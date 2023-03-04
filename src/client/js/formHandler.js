function handleSubmit(event) {
    event.preventDefault()

    console.log("::: Form Submitted :::")
    fetch('http://localhost:8080/test')
        .then(res => res.json())
        .then(function (res) {
         
        })


}

export { handleSubmit }
