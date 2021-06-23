var clicks = 0;

function setup() {
    console.log('Lets start, default values are assigned');
    $('.right').hide();
    $('.middle').hide();
    $('.error').hide();
    let auto_switch_value = '0';
    profiles = new Array(8);
}

$('#auto_switch').on('change', function() {
    if ($(this).is(':checked')) {
        auto_switch_value = '1';
        console.log(auto_switch_value);
        $('.middle').show();
        $('.right').show();
    } else {
        $('.middle').hide();
        $('.right').hide();
        auto_switch_value = '0';
        console.log(auto_switch_value);
    }
});

function openProfile(evt, profileName, profileNum) {

    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("profile");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(profileName).style.display = "block";
    evt.currentTarget.className += " active";
};

function addProfile() {
    alert("Addition will be done");
}

function delProfile() {
    alert("Deletion will be done");
}

function gProfile(profileNum) {
    switch (profileNum) {
        case 1:
            console.log("Entering Profile 1");
            getProfileTable(1);
            break;
        case 2:
            console.log("Entering Profile 2");
            getProfileTable(2);
            break;
        case 3:
            console.log("Entering Profile 3");
            getProfileTable(3);
            break;
        case 4:
            console.log("Entering Profile 4");
            getProfileTable(4);
            break;
        case 5:
            console.log("Entering Profile 5");
            getProfileTable(5);
            break;
        case 6:
            console.log("Entering Profile 6");
            getProfileTable(6);
            break;
        case 7:
            console.log("Entering Profile 7");
            getProfileTable(7);
            break;
        case 8:
            console.log("Entering Profile 8");
            getProfileTable(8);
            break;
        default:
            console.log("No Profile");
    }
}

async function getProfileTable(profileNum) {
    let str = document.getElementById("rowNumber").value;
    if (str <= 0 || str > 12) {
        document.getElementById('errorMsg').innerHTML = "Invalid Value";
        $('.error').show();
    } else {
        $('.error').hide();
        const dataTable = document.createElement('table');
        const r0 = document.createElement('tr');
        const h1 = document.createElement('th');
        h1.textContent = 'Index';
        r0.appendChild(h1);
        const h2 = document.createElement('th');
        h2.textContent = "Time";
        r0.appendChild(h2);
        const h3 = document.createElement('th');
        h3.textContent = "Power";
        r0.appendChild(h3);

        if (clicks == 0) {

            dataTable.appendChild(r0);

            for (let i = 0; i < str; i++) {

                let r1 = document.createElement('tr');
                let td1 = document.createElement('td');
                //td1.textContent = data[i].todo;
                //td1.textContent = timePowerData[i].time;
                td1.textContent = i + 1;
                r1.appendChild(td1);

                let td2 = document.createElement('td');
                //td2.textContent = data[i].deadline;
                //td2.textContent = timePowerData[i].power;
                td2.textContent = 10 * i + 20;
                r1.appendChild(td2);

                let td3 = document.createElement('td');
                //td2.textContent = data[i].deadline;
                //td2.textContent = timePowerData[i].power;
                td3.textContent = 25 * i;
                r1.appendChild(td3);

                dataTable.appendChild(r1);
            }
            clicks += 1;
        } else if (clicks > 0) {
            let temp = table.rows.length;
            for (let i = 0; i < temp; i++) {
                $('tr:last-child').remove();
            }

            dataTable.appendChild(r0);

            for (let i = 0; i < str; i++) {

                let r1 = document.createElement('tr');
                let td1 = document.createElement('td');
                //td1.textContent = data[i].todo;
                //td1.textContent = timePowerData[i].time;
                td1.textContent = i + 1;
                r1.appendChild(td1);

                let td2 = document.createElement('td');
                //td2.textContent = data[i].deadline;
                //td2.textContent = timePowerData[i].power;
                td2.textContent = 10 * i + 20;
                r1.appendChild(td2);

                let td3 = document.createElement('td');
                //td2.textContent = data[i].deadline;
                //td2.textContent = timePowerData[i].power;
                td3.textContent = 25 * i;
                r1.appendChild(td3);

                dataTable.appendChild(r1);
            }
        }
        table = document.getElementById('jsonTable').appendChild(dataTable);
        document.getElementById('jsonTable').appendChild(dataTable);
    }

    $(function() {
        $("#jsonTable").sortable({
            items: 'tr:not(tr:first-child)',
            cursor: 'pointer',
            axis: 'y',
            dropOnEmpty: false,
            start: function(e, ui) {
                ui.item.addClass("selected");
            },
            stop: function(e, ui) {
                ui.item.removeClass("selected");
                $(this).find("tr").each(function(index) {
                    if (index > 0) {
                        $(this).find("td").eq(0).html(index);
                    }
                });
            }
        });
    });
}



/* const time = 0;
     const power = 0;

     const data = { time, power };
     const options = {
         method: 'POST',
         headers: {
             'Content-Type': 'application/json'
         },
         body: JSON.stringify(data)
     };

     const response = await fetch('/autonomous', options);
     const json = await response.json();
     console.log(json);

    
} */

setup();