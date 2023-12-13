search_button = document.getElementById("search_button");
search_button.onclick = function () {
    zipcode_input = document.getElementById("zipcode");
    zipcode = zipcode_input.value;
    address = fetch_address(zipcode);
}

function fetch_address(zipcode) {
    const formData = new FormData();
    formData.append('zipcode', zipcode); //string
    fetch('/address', {
        method: 'POST',
        body: formData
    }).then((response) => {
        console.log(response.json().then((data) => {
            draw_result(data);
            return data; //json
        }));
    }).catch((error) => {
        alert(error);
    });
}

function draw_result(data) {
    result_div = document.getElementById("result");

    if (data.address == '-1'){
        alert("error");
        return;
    }

    zipcode_div = document.createElement("div");
    zipcode_div.innerHTML = 'zipcode: ' + data.zipcode;
    result_div.appendChild(zipcode_div);

    address_div = document.createElement("div");
    address_div.innerHTML = 'address: ' + data.address;
    result_div.appendChild(address_div);

    map_div = document.createElement("div");
    map_div.innerHTML = '<a href="' + url_for_map(data) + '" target="_blank">map</a>';
    result_div.appendChild(map_div);
}

function url_for_map(data) {
    return 'https://www.google.com/maps/search/?api=1&query=' + data.address;
}