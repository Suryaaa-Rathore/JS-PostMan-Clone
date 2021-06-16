console.log('postman');
// for counting number of custom parameters
let addParamCount = 0;
// Hide the custom parameters box initially as json is selected by default
let paramenters = document.getElementById('parameters');
paramenters.style.display = 'none';
let jsonBox = document.getElementById('jsonBox');
// If user clicks on "custom parameters" radio then show the "parameters box" and hide "request json box"
let jsonRadio = document.getElementById('json');
jsonRadio.addEventListener('click', () => {
    paramenters.style.display = 'none';
    jsonBox.style.display = 'block';
});
let customRadio = document.getElementById('custom');
customRadio.addEventListener('click', () => {
    paramenters.style.display = 'block';
    jsonBox.style.display = 'none';
});
// If we need more custome parameters then we need to add more parameters by clicking + button
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', () => {
    let addParameters = document.getElementById('addParameters');
    let para = `<div class="form-row my-2">
                    <label for="parameters" class="col-sm-2 col-form-label">Parameter ${addParamCount + 2}</label>
                    <div class="col-md-4">
                        <input type="text" class="form-control" id="parameterKey${addParamCount + 2}" placeholder="Key">
                    </div>
                    <div class="col-md-4">
                        <input type="text" class="form-control" id="parameterValue${addParamCount + 2}" placeholder="Value">
                    </div>
                    <button class="btn btn-primary delete"> - </button>
                </div>`;
    addParamCount++;
    addParameters.innerHTML += para;
    let deleteParam = document.getElementsByClassName('delete');
    for (const item of deleteParam) {
        item.addEventListener('click', (e) => {
            e.target.parentElement.remove();

        })
    }
})
// On clicking submit button we have to fetch data 
let submit = document.getElementById('submitBtn');
submit.addEventListener('click', () => {
    // console.log('submit btn is clicked');
    //We can show a message to user for keeping patience and wait for response
    // document.getElementById('responseText').value = "Please wait...";
    document.getElementById('responsePrism').innerHTML = "Please wait...";
    let url = document.getElementById('url').value;
    let method = document.querySelector("input[name='method']:checked").value;
    let dataType = document.querySelector("input[name='dataType']:checked").value;
    if (dataType == 'custom') {
        data = {};
        for (let i = 0; i < addParamCount + 1; i++) {
            if (document.getElementById('parameterKey' + (i + 1)) != undefined) {

                let key = document.getElementById('parameterKey' + (i + 1)).value;
                let value = document.getElementById('parameterValue' + (i + 1)).value;
                data[key] = value;
            }
        }
        data = JSON.stringify(data);
    } else {
        data = document.getElementById('jsonText').value;
    }
    // console logs for checking this fields are working
    console.log('url is', url);
    console.log('method is', method);
    console.log('dataType is', dataType);
    console.log('data is', data);
    // Get request fetching api
    if (method == 'get') {
        fetch(url)
            .then(response => response.text())
            .then(text => {
                // document.getElementById('responseText').value = text;
                document.getElementById('responsePrism').innerHTML = text;
                Prism.highlightAll();
            })
    }
    else {
        fetch(url, {
            method: 'POST',
            body: data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.text())
            .then(text => {
                // document.getElementById('responseText').value = text;
                document.getElementById('responsePrism').innerHTML = text;
                Prism.highlightAll();

            });
    }
})