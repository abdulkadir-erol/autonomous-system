var clicks = 0;
var progressInterval;
var timeTotal = 0;
var profileNum = 1;
var dataTable = document.createElement('table');
var setTable = '';

var profiles = new Array(8);

profiles = "";

var result = "";
let setSwitchValue = '0';
let setProfileNum = '1';
let setRowNo = '0';
let setBeginTime = '00.00';
let setEndTime = '00.00'
let setRepeat = '1';
let setMethod = '1';
let setNextProfile = '0';
let setTimeTypeValue = 'SEC';

function setup() {
    $('.right').hide();
    $('.middle').hide();
    $('.error').hide();
    for (profile in profiles) {
        profile = true;
    }

    /* Setup the table headers */
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

    dataTable.appendChild(r0);
    setRowNo++;
    console.log("row: ", setRowNo);
}

$('#auto_switch').on('change', function() {
    if ($(this).is(':checked')) {
        auto_switch_value = '1';
        setSwitchValue = auto_switch_value;
        $('.middle').show();
    } else {
        $('.middle').hide();
        $('.right').hide();
        auto_switch_value = '0';
        setSwitchValue = auto_switch_value;
    }
});

$('#time_switch').on('change', function() {
    if ($(this).is(':checked')) {
        time_switch_value = 'MIN';
        setTimeTypeValue = time_switch_value;
    } else {
        time_switch_value = 'SEC';
        setTimeTypeValue = time_switch_value;
    }
});

function openProfile(evt, profileName, num) {
    profileNum = num;
    console.log("Entered Profile", num);
    setProfileNum = num;
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

function addProfile(profileNum) {
    alert("Addition will be done");
}

function delProfile() {
    alert("Deletion will be done");
}

async function addToProfileTable(num) {
    let timeAdded = document.getElementById("addTime" + num).value;
    let powerAdded = document.getElementById("addPower" + num).value;

    $('.error').hide();
    setTimeAdded = timeAdded;
    setPowerAdded = powerAdded;
    if (setRowNo <= 12) {
        if (timeAdded <= 0 || timeAdded > 60) {
            document.getElementById('errorMsg').innerHTML = "Time Value must be between 0-60";
            $('.error').show();
        } else if (powerAdded <= 0 || powerAdded > 5) {
            document.getElementById('errorMsg').innerHTML = "Power Value must be between 0-5";
            $('.error').show();
        } else {
            $('.right').show();
            $('.error').hide();

            let r1 = document.createElement('tr');
            let td1 = document.createElement('td');
            //td1.textContent = data[i].todo;
            //td1.textContent = timePowerData[i].time;
            td1.textContent = setRowNo;
            r1.appendChild(td1);

            let td2 = document.createElement('td');
            //td2.textContent = data[i].deadline;
            //td2.textContent = timePowerData[i].power;
            td2.textContent = timeAdded;
            timeTotal += parseInt(td2.textContent);
            r1.appendChild(td2);

            let td3 = document.createElement('td');
            //td2.textContent = data[i].deadline;
            //td2.textContent = timePowerData[i].power;
            td3.textContent = powerAdded;
            r1.appendChild(td3);

            dataTable.appendChild(r1);
            setRowNo++;

            $(function() {
                $("#jsonTable" + num).sortable({
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
    } else {
        document.getElementById('errorMsg').innerHTML = "Row Number must be between 0-12";
        $('.error').show();
    }
    table = document.getElementById('jsonTable' + num).appendChild(dataTable);
    document.getElementById('jsonTable' + num).appendChild(dataTable);
}

async function deleteFromProfileTable(num) {
    $('.right').show();
    if (setRowNo >= 1) {
        $('.error').hide();
        let value = (setRowNo) * 3 - 1;
        timeTotal -= $('tr:last-child').find('td:nth-child(2)').html();
        $('tr:last-child').remove();
        setRowNo--;
        console.log(timeTotal);
        console.log("row: ", setRowNo);
    } else {
        document.getElementById('errorMsg').innerHTML = "There should be data to be deleted";
        $('.error').show();
    }
    table = document.getElementById('jsonTable' + num).appendChild(dataTable);
    document.getElementById('jsonTable' + num).appendChild(dataTable);

}

function progress(timetotal, $element) {
    timeTotal = timetotal;
    timeleft = timetotal;
    clearInterval(progressInterval);
    progressInterval = setInterval(function() {
        // progress(timeleft - 1, timetotal, $element);
        var progressBarWidth = timeleft * $element.width() / timetotal;
        $element.find('div').animate({
            width: progressBarWidth
        }, 500).html(Math.floor(timeleft / 60) + ":" + timeleft % 60);
        timeleft = timeleft - 1;
        if (timeleft == 0) {
            clearInterval(progressInterval);
        }
    }, 1000);
};

var beginResult = 0,
    endResult = 0;

async function setForBegin() {
    let begin = document.getElementById("begin").value;
    let beginH = parseInt(begin[0] + begin[1]);
    let beginM = parseInt(begin[3] + begin[4]);
    if ((Number.isInteger(beginH))) {
        beginResult = beginH * 60 + beginM;
        $('.error').hide();
    } else {
        document.getElementById('errorMsg').innerHTML = "The beginning time is not valid";
        $('.error').show();
    }
}

async function setForEnd() {

    let end = document.getElementById("end").value;
    let endH = parseInt(end[0] + end[1]);
    let endM = parseInt(end[3] + end[4]);
    if ((Number.isInteger(endH))) {
        endResult = endH * 60 + endM;
        $('.error').hide();
    } else {
        document.getElementById('errorMsg').innerHTML = "The beginning time is not valid";
        $('.error').show();
    }
}

function controlForTime() {
    let totalMin = endResult - beginResult;
    if (endResult <= beginResult) {
        document.getElementById('errorMsg').innerHTML = "The ending time cannot be earlier than or equal to the beginning time";
        $('.error').show();
    } else if (totalMin < timeTotal) {
        document.getElementById('errorMsg').innerHTML = "The total time cannot be longer than the profile period ";
        $('.error').show();
    } else {
        $('.error').hide();
        setBeginTime = document.getElementById("begin").value;
        setEndTime = document.getElementById("end").value;
    }
}

function controlForTable() {
    let tableRowLength = dataTable.rows.length;
    console.log("table row length", tableRowLength);
    for (let i = 1; i < tableRowLength; i++) {
        for (let j = 0; j < 3; j++) {
            var tableValue = dataTable.rows[i].cells[j].innerHTML;
            setTable = setTable + tableValue + ":";
        }
        setTable += "#";
    }
}

async function setRepeatCount() {
    let repeat = document.getElementById("repeatCount").value;
    if (repeat < 0 || repeat > 12) {
        document.getElementById('errorMsg').innerHTML = "Repeat must be between 0-12";
        $('.error').show();
    } else {
        $('.error').hide();
        setRepeat = repeat;
    }
}

function getMethod() {
    let methodNo = document.getElementById("select").value;
    setMethod = methodNo;
}

function getNextProfile() {
    let nextProfileNo = document.getElementById("nextProfile").value;
    setNextProfile = nextProfileNo;
}

function submitResult() {
    controlForTime();
    controlForTable();
    progress(timeTotal, $('#progressBar' + profileNum));
    result = '#AS';
    result = result.concat(setSwitchValue);
    result = result.concat('#P');
    result = result.concat(setProfileNum);
    result = result.concat('#ROW');
    result = result.concat(setRowNo - 1);
    result = result.concat('#DATA');
    result = result.concat(setTable);
    result = result.concat('B');
    result = result.concat(setBeginTime);
    result = result.concat('#E');
    result = result.concat(setEndTime);
    result = result.concat('#M');
    result = result.concat(setMethod);
    result = result.concat('#NP');
    result = result.concat(setNextProfile);
    result = result.concat('#R');
    result = result.concat(setRepeat);
    result = result.concat('#');
    result = result.concat(setTimeTypeValue);
    console.log(result);
}

setup();