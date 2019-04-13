let sourceOfPlanets = "https://swapi.co/api/planets";
let loadingSign = document.querySelector('#loading');

/**
let showPlanetNames = function (linkOfTheSource) {
    $.get(linkOfTheSource, function (data) {
        for (let i = 0; i < data.results.length; i++) {
            document.querySelector('#name' + [i]).innerText = data.results[i].name;
            document.querySelector('#diameter' + [i]).innerText = data.results[i].diameter;
            document.querySelector('#climate' + [i]).innerText = data.results[i].climate;
            document.querySelector('#terrain' + [i]).innerText = data.results[i].terrain;
            document.querySelector('#surface-water' + [i]).innerText = data.results[i].surface_water;
            document.querySelector('#population' + [i]).innerText = data.results[i].population;
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
    });
    fillUpModalOnResidentBtnClick(linkOfTheSource)
};

**/
let fillUpModalOnResidentBtnClick = function (sourceLink) {
    let planetTable = document.querySelector('#planets-table');
    let modalTable = document.querySelector('#modal-table');
    let modalTitle = document.querySelector('.modal-title');
    planetTable.addEventListener('click', function (e) {
        $.get(sourceLink, function (data) {
            console.log('target egy ' + data.results[0].residents);
            console.log('target ketto ' + data.results[0].residents);
            if (e.target.parentNode.tagName === "TD") {
                console.log('target if utan ' + data.results[0].residents);
                let orderNumberFromDataAttribute = e.target.parentNode.getAttribute('data-order');
                modalTitle.innerText = 'Residents of ' + data.results[orderNumberFromDataAttribute].name;
                let chosenArray = data.results[orderNumberFromDataAttribute].residents;
                console.log('for elott ' + data.results[0].residents);
                debugger;
                for (let j = 0; j < chosenArray.length; j++) {
                    $.get(chosenArray[j], function (resident) {
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


let j = 0;


let eventListeners = function () {
    let btns = document.querySelector('.wrap-around-btns');
    btns.addEventListener('click', function (e) {
            if (e.target.id === 'btn-next' && j < 7) {
                loadingSign.innerHTML = '<i class="fa fa-spinner fa-pulse fa-fw"></i>';
                j++;
                $.get("https://swapi.co/api/planets/?page=" + j, function (data) {
                    console.log('ezt itt' + data.results[0].residents);
                    for (let i = 0; i < data.results.length; i++) {
                        document.querySelector('#name' + [i]).innerText = data.results[i].name;
                        document.querySelector('#diameter' + [i]).innerText = data.results[i].diameter;
                        document.querySelector('#climate' + [i]).innerText = data.results[i].climate;
                        document.querySelector('#terrain' + [i]).innerText = data.results[i].terrain;
                        document.querySelector('#surface-water' + [i]).innerText = data.results[i].surface_water;
                        document.querySelector('#population' + [i]).innerText = data.results[i].population;
                        document.querySelector('#residents' + [i]).innerText = 'No known residents';
                        document.querySelector('#residents' + [i]).setAttribute('data-order', [i]);
                        //console.log(data.results[0].residents);
                        if (data.results[i].residents.length !== 0) {
                            let btn = document.createElement('button');
                            document.querySelector('#residents' + [i]).innerText = '';
                            btn.innerText = data.results[i].residents.length + ' resident(s)';
                            btn.setAttribute('data-target', "#exampleModal");
                            btn.setAttribute('data-toggle', "modal");
                            document.querySelector('#residents' + [i]).appendChild(btn);
                        }
                    }
                    console.log(j);
                    console.log(j);
                    console.log(data);
                    loadingSign.innerHTML = '';
                });
                fillUpModalOnResidentBtnClick("https://swapi.co/api/planets/?page=" + j);
            } else if (e.target.id === 'btn-prev' && j > 1) {
                loadingSign.innerHTML = '<i class="fa fa-spinner fa-pulse fa-fw"></i>';
                j--;
                if (j === 1) {
                    $.get("https://swapi.co/api/planets", function (data) {
                        for (let i = 0; i < data.results.length; i++) {
                            document.querySelector('#name' + [i]).innerText = data.results[i].name;
                            document.querySelector('#diameter' + [i]).innerText = data.results[i].diameter;
                            document.querySelector('#climate' + [i]).innerText = data.results[i].climate;
                            document.querySelector('#terrain' + [i]).innerText = data.results[i].terrain;
                            document.querySelector('#surface-water' + [i]).innerText = data.results[i].surface_water;
                            document.querySelector('#population' + [i]).innerText = data.results[i].population;
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
                        loadingSign.innerHTML = '';
                    })
                } else {
                    $.get("https://swapi.co/api/planets/?page=" + j, function (data) {
                        for (let i = 0; i < data.results.length; i++) {
                            document.querySelector('#name' + [i]).innerText = data.results[i].name;
                            document.querySelector('#diameter' + [i]).innerText = data.results[i].diameter;
                            document.querySelector('#climate' + [i]).innerText = data.results[i].climate;
                            document.querySelector('#terrain' + [i]).innerText = data.results[i].terrain;
                            document.querySelector('#surface-water' + [i]).innerText = data.results[i].surface_water;
                            document.querySelector('#population' + [i]).innerText = data.results[i].population;
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
                        loadingSign.innerHTML = '';
                    })
                }
            }
        }
    );
};

showPlanetNames(sourceOfPlanets);
eventListeners(sourceOfPlanets);