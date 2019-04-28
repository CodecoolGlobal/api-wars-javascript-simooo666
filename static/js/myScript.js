let sourceOfPlanets = "https://swapi.co/api/planets";
let loadingSign = document.querySelector('#loading');

let fillUpTable = function (data) {
    console.log(data);
    for (let i = 0; i < data.results.length; i++) {
        document.querySelector('#name' + [i]).innerText = data.results[i].name;
        if (data.results[i].diameter === "unknown") {
            document.querySelector('#diameter' + [i]).innerText = 'unknown'
        } else {
            document.querySelector('#diameter' + [i]).innerText = data.results[i].diameter.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " km";
        }
        document.querySelector('#climate' + [i]).innerText = data.results[i].climate;
        document.querySelector('#terrain' + [i]).innerText = data.results[i].terrain;
        if (data.results[i].surface_water === "unknown") {
            document.querySelector('#surface-water' + [i]).innerText = "unknown";
        } else {
            document.querySelector('#surface-water' + [i]).innerText = data.results[i].surface_water + "%"
        }
        if (data.results[i].population === "unknown") {
            document.querySelector('#population' + [i]).innerText = "unknown";
        } else {
            document.querySelector('#population' + [i]).innerText = data.results[i].population.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " people";
        }
        document.querySelector('#residents' + [i]).innerText = 'No known residents';
        document.querySelector('#residents' + [i]).setAttribute('data-order', [i]);
        if (data.results[i].residents.length !== 0) {
            let btn = document.createElement('button');
            document.querySelector('#residents' + [i]).innerText = '';
            btn.innerText = data.results[i].residents.length + ' resident(s)';
            btn.setAttribute('data-target', "#exampleModal");
            btn.setAttribute('data-toggle', "modal");
            document.querySelector('#residents' + [i]).appendChild(btn);
        }
    }
};


let showPlanetNames = function (linkOfTheSource) {
    document.querySelector('#planets-table').dataset.pageNumber = 1;
    $.get(linkOfTheSource, function (data) {
        fillUpTable(data)
    });
};

let fillUpModalOnResidentBtnClick = function () {
    let planetTable = document.querySelector('#planets-table');
    let modalTable = document.querySelector('#modal-table');
    let modalTitle = document.querySelector('.modal-title');
    planetTable.addEventListener('click', function (e) {
        clearModal();
        let pageNumber = document.querySelector('#planets-table').getAttribute('data-page-number');
        let sourceLink = "https://swapi.co/api/planets/?page=" + pageNumber ;
        $.get(sourceLink, function (data) {
            if (e.target.parentNode.tagName === "TD") {
                console.log(data)
                let orderNumberFromDataAttribute = e.target.parentNode.getAttribute('data-order');
                modalTitle.innerText = 'Residents of ' + data.results[orderNumberFromDataAttribute].name;
                //let chosenArray = data.results[orderNumberFromDataAttribute].residents;
                for (let i = 0; i < data.results[orderNumberFromDataAttribute].residents.length; i++) {
                    $.get(data.results[orderNumberFromDataAttribute].residents[i], function (resident) {
                        console.log(resident);
                        modalTable.insertAdjacentHTML('beforeend', `<tr> 
                                                                                    <td> ${resident.name}</td>
                                                                                    <td> ${resident.height}</td>
                                                                                    <td> ${resident.mass}</td>
                                                                                    <td> ${resident.hair_color}</td>
                                                                                    <td> ${resident.skin_color}</td>
                                                                                    <td> ${resident.eye_color}</td>
                                                                                    <td> ${resident.birth_year}</td>
                                                                                    <td> ${resident.gender}</td> 
                                                                                </tr>`)
                    });
                }

            }
        });
    });
};


let clearModal = function () {
    let elements = document.querySelectorAll('#modal-table tbody tr td');
    Array.prototype.forEach.call(elements, function (node) {
        node.parentNode.removeChild(node)
    });

};


let clearTable = function () {
    for (let i = 0; i < 10; i++) {
        document.querySelector('#name' + [i]).innerText = '';
        document.querySelector('#diameter' + [i]).innerText = '';
        document.querySelector('#climate' + [i]).innerText = '';
        document.querySelector('#terrain' + [i]).innerText = '';
        document.querySelector('#surface-water' + [i]).innerText = '';
        document.querySelector('#population' + [i]).innerText = '';
        document.querySelector('#residents' + [i]).innerText = '';
        document.querySelector('#residents' + [i]).removeAttribute('data-order');
    }
};


let eventListeners = function (linkOfTheSource) {
    let pageNumber = document.querySelector('#planets-table').getAttribute('data-page-number');
    let btns = document.querySelector('.wrap-around-btns');
    btns.addEventListener('click', function (e) {
            if (e.target.id === 'btn-next' && pageNumber < 7) {
                loadingSign.innerHTML = '<i class="fa fa-spinner fa-pulse fa-fw"></i>';
                pageNumber++;
                document.querySelector('#planets-table').dataset.pageNumber = pageNumber;
                $.get("https://swapi.co/api/planets/?page=" + pageNumber, function (data) {
                    fillUpTable(data);
                    loadingSign.innerHTML = '';
                });

            } else if (e.target.id === 'btn-prev' && pageNumber > 1) {
                loadingSign.innerHTML = '<i class="fa fa-spinner fa-pulse fa-fw"></i>';
                pageNumber--;
                document.querySelector('#planets-table').dataset.pageNumber = pageNumber;
                $.get("https://swapi.co/api/planets/?page=" + pageNumber, function (data) {
                    fillUpTable(data);
                    loadingSign.innerHTML = '';
                })

            }
        }
    );
    fillUpModalOnResidentBtnClick()

};

showPlanetNames(sourceOfPlanets);
eventListeners(sourceOfPlanets);
