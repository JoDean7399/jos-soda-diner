//this is my iffe to get everything on the dom that needs to be there for everything to work
(() => {
    const navDiv = document.getElementById('navBar');
    const rootDiv = document.getElementById('root');
    const footerDiv = document.getElementById('footer');
    navDiv.innerHTML = `<nav class="navbar navbar-expand-lg fixed-top">
    <a class="navbar-brand brand-color" href="#">JOs Sodas && Diners</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
            <li class="nav-item">
                <a href="#" onclick="showList(event)" name="soda"  class="blue">All Sodas</a>
            </li>
            <li class="nav-item diner-li">
                <a href="#" onclick="showList(event)" name='diner'  class="blue">All Diners</a>
            </li>
        </ul>
    </div>
    </nav>`;
    rootDiv.innerHTML = `<h1 class="text-center mt-5">WELCOME TO JO's SODAS && DINERS</h1>
    <form id="inputs"></form>
    <div class="text-center" id="allInfo"></div>`;
    footerDiv.innerHTML = `
    <footer class="footer-color mt-5">
      <div class="row">
        <div class="col-lg-6 col-md-6 col-sm-12 text-center p-0">
          <p class="mt-3 p-0">Indiana Women's Prison<br>2596 Girls School Rd<br>Indianapolis, IN 46214</p>
        </div>
      </div>
      <div class="col-lg-6 col-md-6 col-sm-12 ml-auto p-0">
        <p>Created By: JoDean M Neher&copy;</p>
      </div>
    </footer>
  `;
})();
let sodasArray = [];
let payloadObj = new Object();
let sodaName = [];
let sodaBoolean = false;
//this gets the users info to add the soda info to the database
function createSoda(e) {
    e.preventDefault();
    let payload = {
        name: document.getElementById('sodaName').value,
        fizziness: parseInt(document.getElementById('fizziness').value),
        taste: parseInt(document.getElementById('taste').value),
        served: sodaBoolean
    };
    fetch('http://localhost:7399/sodaRoute/createSoda', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(data => {
        if (data.message) {
            $('#mongooseModal').modal("show");
            document.getElementById('message').innerText = data.message;
            let btn = document.getElementById('modalBTN');
    
            if (data.type === "soda") {
                btn.innerText = "Soda List";
                btn.name = data.type;
            } else {
                btn.innerText = "Diner List";
                btn.name = data.type;
            };
            btn.removeEventListener('click', sodasAndDiners);
            btn.addEventListener('click', showList);
        };       
        showList(e); 
    });
};
//this gets the users info to add the diner info to the database
function createDiner(e) {
    e.preventDefault();    
    let payload = {
        name: document.getElementById('dinerName').value,
        location: document.getElementById('dinerLocal').value,
        sodas: sodaArray
    };      
    fetch('http://localhost:7399/dinerRoute/createDiner', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(data => {
        if (data.message) {
            $('#mongooseModal').modal("show");
            document.getElementById('message').innerText = data.message;
            let btn = document.getElementById('modalBTN');
    
            if (data.type === "soda") {
                btn.innerText = "Soda List";
                btn.name = data.type;
            } else {
                btn.innerText = "Diner List";
                btn.name = data.type;
            };
            btn.removeEventListener('click', sodasAndDiners);
            btn.addEventListener('click', showList);
        };       
        showList(e); 
    });
};
//this builds the html for the respective forms with an onsubmit for respective info
function sodasAndDiners(e) {
    e.preventDefault();
    let inputs = document.getElementById('inputs');
    const allInfo = document.getElementById('allInfo');
    allInfo.innerHTML = '';
    if (e.target.name === 'soda') {
        inputs.innerHTML = `
        <div class='text-center mt-5'>
        <input type="text" id="sodaName" placeholder="Soda Name" required>
        </div>
        <div class='text-center'>
        <h5 class='mt-5'>Rate Fizziness:  <input type="number" id="fizziness" min='1' max='10' required></h5>
        </div>
        <div class='text-center'>
        <h5 class='mt-5'>Rate Taste:  <input type="number" id="taste" min='1' max='10'  required></h5>
        </div>
        <div class='text-center mt-3'>
        <h5><label for='serve'>Serve Soda:</label>  <input type='checkbox' onchange='serveSoda(event)' id='serve'/></h5> 
        </div>
        <div class='text-center'><input class="mt-3 btn" type='submit' value='Click to Create Soda'/></div>
        `;
        inputs.name = 'soda';
        inputs.addEventListener('submit', createSoda);

    } else {
        inputs.innerHTML = ""
        inputs.innerHTML = `<div class='text-center'>
        <input class="mt-5" type="text" id="dinerName" placeholder="Diner Name" required></div>
        <div class='text-center'><input class="mt-5" type="text" id="dinerLocal" placeholder="Diner Location" required></div>
       
        <div class='text-center'><input class="mt-5 button" type='submit' value='Click to Create Diner'/></div>`;
        inputs.name = 'diner'; 
        inputs.addEventListener('submit', createDiner);
    };
};
//this creates the elements for the respective pages
function createElements(data) {
    const info = document.getElementById('allInfo');
    const createBtn = document.createElement('button');
    const infoUl = document.createElement('ul');
    info.classList.add('mt-3');
    infoUl.classList.add('mt-3');
    info.innerHTML = '';
    createBtn.classList.add('createBtn');
    createBtn.id = 'createBtn';
    createBtn.addEventListener('click', sodasAndDiners);
    
    if (data.type === 'soda') {
        const sodaListh3 = document.createElement('h3');
        sodaListh3.innerText = 'SODA LIST';
        info.appendChild(sodaListh3);
        for (let i = 0; i < data.soda.length; i++) {
            let info = JSON.stringify(data.soda[i]);   
            let infoLis = document.createElement('li');
            
            if(data.soda[i].served===true){
                infoLis.innerHTML = `<h4>Now Serving:   <a href="#" class='decoration' onclick="showDetails(event)" data-info='${info}' name='sodas'>${data.soda[i].name}</a></h4>`;
            }else{
                infoLis.innerHTML = `<h4>Available to Serve:   <a href="#" class='decoration' onclick="showDetails(event)" data-info='${info}' name='sodas'>${data.soda[i].name}</a></h4>`;
            }
            createBtn.name = 'soda';
            createBtn.innerText = 'Add Soda';
            infoUl.appendChild(infoLis);
        };
        info.appendChild(infoUl);
        info.appendChild(createBtn);
    }
    else {
        const dinerListh3 = document.createElement('h3');
        dinerListh3.innerText = 'DINER LIST';
        info.appendChild(dinerListh3);        
        for (let i = 0; i < data.diner.length; i++) {
            let info = JSON.stringify(data.diner[i]);
            let infoLis = document.createElement('li');
            infoLis.id = data.diner[i];
            infoLis.innerHTML = `<h4 class='decoration'><a href="#" onclick="showDetails(event)" data-info='${info}' name='diners'>${data.diner[i].name}</a></h4>`;
            createBtn.name = 'diner';
            createBtn.innerText = 'Add Diner';
            infoUl.appendChild(infoLis);
        };
        info.appendChild(infoUl);
        info.appendChild(createBtn);
    };
};
//this shows the list of sodas to be chosen from 
function sodaDinerList(e){
    e.preventDefault();
    let x = e.target
    fetch('http://localhost:7399/sodaRoute/sodaInfo')
    .then(res => res.json())
    .then(data => {   
        dinerSodaList(data, x)
    });
};
//this makes the list of sodas to be chosen from to add to a diner
function dinerSodaList(data, x){
    const parent = $(x).parent();  
    
    if(data.message){
        const p = document.createElement('p');
        p.innerHTML =  `<h4 class='mt-3'>There Are No Sodas At This Time</h4><h6><a href='#' onclick='showList(event)' name='soda' class='decoration'>Click Here to Add Some</a></h6>`;
        parent[0].appendChild(p); 
    } else{
        const messageDiv = document.createElement('div');
        const message = document.createElement('h5');
        messageDiv.classList.add('text-center');
        message.innerHTML= 'Check the Soda(s) You Want to Serve';
        messageDiv.appendChild(message);
        parent[0].appendChild(messageDiv);
        for (let i = 0; i < data.soda.length; i++) {
            const p = document.createElement('p');
            parent[0].classList.add('mt-3');
            p.innerHTML = `${data.soda[i].name}  <input type='checkbox' name='${data.soda[i].name}' onchange='collectSodas(event)'/>`;
            parent[0].appendChild(p);        
        };
        
    };
    x.remove();
};
//this collects the value of the input and pushes it into an array
let sodaArray = []
function collectSodas(e) {
    e.preventDefault();
    console.log(e.target, 'e.target in collectSodas');
     
    
    if (e.target.checked) {
        e.target.value = true
        sodaArray.push(e.target.name)
    }else if (e.target.checked === false) {
        let sodaArrayPush = sodaArray.indexOf(e.target.name)
        sodaArray.splice(sodaArrayPush, 1)
    };    
};
//this shows the list of sodas or diners to the user
function showList(e) {
    e.preventDefault();
    let fetchAddress;
    let inputsForm = document.getElementById('inputs');
    inputsForm.innerHTML = "";
    //this displays the respective form depending on the link you click on the navbar
    if (e.target.name === 'soda') {
        fetchAddress = 'http://localhost:7399/sodaRoute/sodaInfo';
    } else {
        fetchAddress = 'http://localhost:7399/dinerRoute/dinerInfo';
    };

    fetch(fetchAddress)
        .then(res => res.json())
        .then(data => {

            if (e.target.id === "extraSodas") {
                let infoObj = {
                    dinerId: e.target.dataset.id,
                    list: JSON.parse(e.target.dataset.list)

                }
                extraSodas(data, infoObj)
            }else {
                if (data.hasOwnProperty('soda') === true || data.hasOwnProperty('diner') === true) {
                    createElements(data);
                };
            };
            if (data.message) {
                $('#mongooseModal').modal("show");
                document.getElementById('message').innerText = data.message;
                let btn = document.getElementById('modalBTN');
        
                if (data.type === "soda") {                    
                    btn.innerText = "Add Soda";
                    btn.name = data.type;
                } else {
                    btn.innerText = "Add Diner";
                    btn.name = data.type;
                };
            };
        });
};
//this creates the inputs for the respective pages
function createInputs(e){
    e.preventDefault();
    const deleteBtn = document.getElementById('deleBtn');  
    const updateInfo = e.target.dataset.update;
    const correctElement = $(e.target).parent();  
    $(correctElement[0]).replaceWith(`<input type='text' placeholder='${updateInfo}' data-key='${e.target.dataset.key}' onkeyup='collectValues(event)'/>`);
    deleteBtn.classList.add('hidden');
};
//this collects the values of the checkboxes and adds them to the array 
function collectValues(e) {
    e.preventDefault();
    let key = e.target.dataset.key;
    let updateValue;
    
    if (key === "taste" || key === "fizziness") {
        updateValue = parseInt(e.target.value)
    }else {
        updateValue = e.target.value;
    }
    payloadObj[key] = updateValue

    if (key === "sodas") {
        if (e.target.checked === true) {
            sodasArray.push(e.target.name)
            
        }else {
            let postion = sodasArray.indexOf(e.target.name)
            sodasArray.splice(postion, 1)
            
        };
        payloadObj[key] = sodasArray  
    };
}; 
//this shows the details of the repective page
function showDetails(e) {
    e.preventDefault();
    console.log(e.target, 'e.target in showDetails');
    const details = JSON.parse(e.target.dataset.info);    
    const detailInfo = document.getElementById('allInfo');   
    let sodaList = JSON.stringify(details.sodas)
    if (e.target.name === 'sodas') {
        const sodaKeys = Object.keys(details);
        
        if(details.served===true){
            detailInfo.innerHTML =  ` <div class='mt-3'>
            <h4>Soda Name: ${details.name}  <input type="checkbox" onchange="createInputs(event)" data-key='${sodaKeys[1]}' data-update='${details.name}' data-id='${details._id}'/></h4>
            <button onclick='deleteData(event)' id='deleBtn' name='soda' data-id='${details._id}' class='mt-3'>DELETE THIS SODA</button>
            </div>
            <div class='mt-3'>
            <h4>Soda Fizziness: ${details.fizziness}  <input type="checkbox" onchange="createInputs(event)"  data-key='${sodaKeys[2]}' data-update='${details.fizziness}' data-id='${details._id}'/></h4>
            </div>
            <div class='mt-3'>
            <h4>Soda Taste: ${details.taste}  <input type="checkbox" onchange="createInputs(event)" data-key='${sodaKeys[3]}' data-update='${details.taste}' data-id='${details._id}'/></h4>
            </div>
            <div class='mt-3'>
            <h4><label for='${details.name}'>Stop Serving Soda:</label> <input type="checkbox" onchange='stopServeSoda(event)' name='${details.name}' id='updateBoolean'/>
            </h4>
            </div>
            <div>
            <button onclick='sodasAndDiners(event)' name='soda' data-id='${details._id}' class='mt-3'>ADD A SODA</button>
            <button onclick='updateData(event)' name='soda' data-id='${details._id}' class='mt-3'>UPDATE THIS SODA</button>
            </div>`;
        }else{
            detailInfo.innerHTML = `<div class='text-center mt-5'><h4>Check the box for Soda Name, Fizziness Taste and/or Serve Soda to Update Soda</h4>
            <div class='mt-3'>
            <h4>Soda Name: ${details.name}  <input type="checkbox" onchange="createInputs(event)" data-key='${sodaKeys[1]}' data-update='${details.name}' data-id='${details._id}'/></h4>
            <button onclick='deleteData(event)' id='deleBtn' name='soda' data-id='${details._id}' class='mt-3'>DELETE THIS SODA</button>
            </div>
            <div class='mt-3'>
            <h4>Soda Fizziness: ${details.fizziness}  <input type="checkbox" onchange="createInputs(event)"  data-key='${sodaKeys[2]}' data-update='${details.fizziness}' data-id='${details._id}'/></h4>
            </div>
            <div class='mt-3'>
            <h4>Soda Taste: ${details.taste}  <input type="checkbox" onchange="createInputs(event)" data-key='${sodaKeys[3]}' data-update='${details.taste}' data-id='${details._id}'/></h4>
            </div>`

            


            if(details.served === false){
                detailInfo.innerHTML +=`<div class='mt-3'>
                <h4><label for='${details.name}'>Serve Soda:</label>   <input type="checkbox" onchange='serveSoda(event)' name='${details.name}' id='updateBoolean'/>
                </h4>
                </div>
                <div>
                <button onclick='sodasAndDiners(event)' name='soda' data-id='${details._id}' class='mt-3'>ADD A SODA</button>
                <button onclick='updateData(event)' name='soda' data-id='${details._id}' class='mt-3'>UPDATE THIS SODA</button>
                </div>` 
            }else{
                detailInfo.innerHTML +=`<div class='mt-3'>
                <h4><label for='${details.name}'>Serve Soda:</label>   <input type="checkbox" onchange='serveSoda(event)' name='${details.name}'/>
                </h4>
                </div>
                <div>
                <button onclick='sodasAndDiners(event)' name='soda' data-id='${details._id}' class='mt-3'>ADD A SODA</button>
                <button onclick='updateData(event)' name='soda' data-id='${details._id}' class='mt-3'>UPDATE THIS SODA</button>
                </div>`
            }
            
        };
    } else {
        detailInfo.innerHTML='';
        const dinerKeys = Object.keys(details);
        const checkMessageDiv = document.createElement('div');
        const dinerNameDiv = document.createElement('div');
        const dinerLocationDiv = document.createElement('div');
        const checkMessage = document.createElement('h3');
        const dinerName = document.createElement('h4');
        const dinerLocation = document.createElement('h4');
        const dinerNameInput = document.createElement('input');
        const dinerLocationInput = document.createElement('input');
        const dinerSodasDiv = document.createElement('div');
        const sodaMessage = document.createElement('h4');
        const dinerSodas = document.createElement('h5');
        const deleteBtn = document.createElement('button');
        const addBtn = document.createElement('button');
        const updateBtn = document.createElement('button');
        dinerNameInput.type = 'checkbox';
        dinerLocationInput.type = 'checkbox';
        dinerNameInput.dataset.key = `${dinerKeys[1]}`;
        dinerLocationInput.dataset.key =`${dinerKeys[2]}`;
        dinerNameInput.dataset.update = `${details.name}`;
        dinerLocationInput.dataset.update = `${details.location}`;
        dinerSodasDiv.id = 'dinerSodasDiv';
        deleteBtn.dataset.id = `${details._id}`;
        dinerNameInput.dataset.id = `${details._id}`;
        dinerLocationInput.dataset.id = `${details._id}`;
        dinerName.innerText =`Diner Name: ${details.name}   `;
        dinerLocation.innerText = `Diner Location: ${details.location}   `;
        checkMessage.innerText = 'Check the Box for Diner Name or Location to Update Diner';
        checkMessageDiv.appendChild(checkMessage);
        dinerNameDiv.classList.add('mt-5');
        dinerLocationDiv.classList.add('mt-3')       
        sodaMessage.classList.add('mt-3');
        deleteBtn.classList.add('mt-3');
        addBtn.classList.add('mt-3');
        updateBtn.classList.add('mt-3');
        deleteBtn.innerText = 'DELETE THIS DINER';
        addBtn.innerText = 'ADD A SODA';
        updateBtn.innerText = 'UPDATE THIS DINER';
        deleteBtn.name = 'diner';
        addBtn.name = 'soda';
        updateBtn.name = 'diner';
        updateBtn.id = 'updateBtn';
        deleteBtn.id = 'deleBtn'
        addBtn.id = "extraSodas";
        addBtn.dataset.list=`${sodaList}`
        addBtn.dataset.id = `${details._id}`;
        updateBtn.dataset.id = `${details._id}`;
        dinerNameInput.addEventListener('change', createInputs);
        dinerLocationInput.addEventListener('change', createInputs);
        deleteBtn.addEventListener('click', deleteData);
        addBtn.addEventListener('click', showList);
        updateBtn.addEventListener('click', updateData);
        checkMessageDiv.appendChild(checkMessage);
        dinerName.appendChild(dinerNameInput);
        dinerLocation.appendChild(dinerLocationInput);
        dinerNameDiv.appendChild(dinerName);
        dinerNameDiv.appendChild(deleteBtn);
        dinerLocationDiv.appendChild(dinerLocation);
        detailInfo.appendChild(checkMessageDiv);
        detailInfo.appendChild(dinerNameDiv);
        detailInfo.appendChild(dinerLocationDiv);


        if(details.sodas.length === 0){
            sodaMessage.innerText = 'There are no sodas being served at this time';
        }else{
            sodaMessage.innerText = 'Check the Soda(s) You Want to Stop Serving';
            dinerSodasDiv.appendChild(dinerSodas);
        }; 
        dinerSodasDiv.appendChild(sodaMessage);

        for (let i = 0; i < details.sodas.length; i++) {
           let x = JSON.stringify(details.sodas)
           const listedSodas = document.createElement('h5');
           const listedInputs = document.createElement('input');
           listedInputs.id = details.sodas[i];
           listedSodas.innerText = details.sodas[i];
           listedInputs.type = 'checkbox';
           listedInputs.checked  = true;
           listedInputs.dataset.info  = x;
           listedInputs.name = details.sodas[i];
           listedInputs.dataset.key = "sodas"
           listedInputs.addEventListener('change', collectValues);
           listedSodas.appendChild(listedInputs);
           dinerSodasDiv.appendChild(listedSodas); 
        };
        dinerSodasDiv.appendChild(dinerSodas);
        dinerSodasDiv.appendChild(addBtn);
        dinerSodasDiv.appendChild(updateBtn);
        detailInfo.appendChild(dinerSodasDiv);
    };
};
//this deletes the data from the respective databases
function deleteData(e) {
    e.preventDefault();
    let address;
    let id;   
    
    if (e.target.name === 'soda') {
        id = e.target.dataset.id;
        address = `http://localhost:7399/sodaRoute/${id}`;
    } else {
        id = e.target.dataset.id;
        address = `http://localhost:7399/dinerRoute/${id}`;
    };

    fetch(address, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(data => {
            if (data.message) {
                $('#mongooseModal').modal("show");
                document.getElementById('message').innerText = data.message;
                let btn = document.getElementById('modalBTN');

                if (data.type === "soda") {
                    btn.innerText = "Soda List";
                    btn.name = data.type;
                    btn.addEventListener('click', showList);
                } else {
                    btn.innerText = "Diner List";
                    btn.name = data.type;
                    btn.addEventListener('click', showList);
                };
            };
            
        });
};
//this updates the soda data
function updateData(e) {
    e.preventDefault();
    let updateAddress;
    const id = e.target.dataset.id;  
    
    if(e.target.name === 'soda'){
   
        updateAddress = `http://localhost:7399/sodaRoute/${id}`;
    }else{
     
        
        updateAddress = `http://localhost:7399/dinerRoute/diner/${id}`
    };

    fetch(updateAddress, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payloadObj)
    })
    .then(res => res.json())
    .then(data => {
        $('#mongooseModal').modal("show");
        document.getElementById('message').innerText = data.message;
        let btn = document.getElementById('modalBTN');

        if (data.type === "soda") {
            btn.innerText = "Soda List";
            btn.name = data.type;
            btn.addEventListener('click', showList);
        } else {
            btn.innerText = "Diner List";
            btn.name = data.type;
            btn.addEventListener('click', showList);
        };
    });    
};
//this adds a soda to the soda list as well as to the diner choice options when it's created
function serveSoda(e){
    e.preventDefault();
    console.log(e.target, 'e.target in serveSoda');
    
    let key = e.target.id
    if(e.target.id === 'serve'){
        if(e.target.checked){
            sodaBoolean = true;
        }else{
            sodaBoolean = false;
        };
    };

    if(e.target.id === 'updateBoolean'){
        updateBoolean = true;
    }else{
        updateBoolean = false;
    }; 
    payloadObj[key]= updateBoolean;   
};
//this removes the serve from the soda in the soda list
function stopServeSoda(e){
    e.preventDefault()
    let stopBoo;
    let key = e.target.
    console.log(e.target, 'e.target in stopServeSoda');
    if(e.target.checked){
        stopBoo = false;
    }else{
        stopBoo = true;
    };
    payloadObj[key]= stopBoo;  
}
//this creates the list of sodas for the user to choose from to add to their diner
function extraSodas(data, infoObj) {
    const sodasInfo = document.getElementById('allInfo');
    const sodasInfoUl = document.createElement('ul');
    const addSodaMessage = document.createElement('h5');
    const addBtn = document.getElementById('extraSodas');
    const updateBtn = document.getElementById('updateBtn');
    const newUpdateBtn = document.createElement('button');
    addSodaMessage.classList.add('mt-3');
    addSodaMessage.innerText = 'Check the Soda(s) You Want to Add to Your Diner';
    addBtn.classList.add('hidden');
    updateBtn.classList.add('hidden');
    newUpdateBtn.name = 'diner';
    newUpdateBtn.innerText = 'UPDATE THIS DINER';
    newUpdateBtn.dataset.id = infoObj.dinerId
    newUpdateBtn.addEventListener('click', updateData);
    
    for (let i = 0; i < data.soda.length; i++) {
        sodaName.push(data.soda[i].name)
    }
    
    for (let j = 0; j < infoObj.list.length; j++) {
        let index = sodaName.indexOf(infoObj.list[j])
        sodaName.splice(index, 1);
        data.soda.splice(index, 1);
    };
 sodasArray.push(...infoObj.list)
                        // NOTES::::
// ********************************************************************************************

// Because the array we are reaching into is only holding on to the name,  I recreated another array that is holding on to all of the soda names and nothing else.  The postion each soda holds is the same index for each of the arrays.  So we can identify where the index is inside of the data.soda by using the sodaName
// My biggest issue was making sure I spliced them from both arrays or it will take the wrong one.
// meaning if the index was 0 & 1
// and removed ['coke', 'root beer', 'grape']
// first it would remove 0 ['root beer', 'grape']
// and then it would remove 1 ["root beer"]
// which is wrong it should have removed what was in the first array not the changed array
// ["grape"]   **THIS IS CORRECT**  we wanted 0 & 1 from the start not the changed

// ********************************************************************************************
    

// ********************************************************************************************
// Now you can take the data.soda and loop over it to create the soda List for the soda

// This array now has the elements that were already choosen taken out

// ********************************************************************************************   
    for (let i = 0; i < data.soda.length; i++) {
        let li = document.createElement('li');   
        li.innerHTML = `<h5>${data.soda[i].name}  <input type="checkbox" data-key='sodas' name='${data.soda[i].name}' onchange='collectValues(event)'></h5>
        `;
        sodasInfoUl.appendChild(li);
    };         
    sodasInfo.appendChild(addSodaMessage);
    sodasInfo.appendChild(sodasInfoUl);
    sodasInfo.appendChild(newUpdateBtn);
};