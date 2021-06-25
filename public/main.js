var clicks = 0;
var progressInterval;
var timeTotal;


var profiles = new Array(8);
/* var profile1;
var profile2;
var profile3;
var profile4;
var profile5;
var profile6;
var profile7;
var profile8; */
profiles = "";

var result = "";
let setSwitchValue = '0';
let setProfileNum = '1';
let setRowNo = '0';
let setBeginTime = '00.00';
let setEndTime = '00.00'
let setRepeatCount = '1';
let setMethod = '0';
let setNextProfile = '1';
let setTimeTypeValue = 'SEC';

function setup() {
    $('.right').hide();
    $('.middle').hide();
    $('.error').hide();
    for (profile in profiles) {
        profile = true;
    }
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

function gProfile(profileNum) {
    $('.right').show();
    switch (profileNum) {
        case 1:
            getProfileTable(1);
            break;
        case 2:
            getProfileTable(2);
            break;
        case 3:
            getProfileTable(3);
            break;
        case 4:
            getProfileTable(4);
            break;
        case 5:
            getProfileTable(5);
            break;
        case 6:
            getProfileTable(6);
            break;
        case 7:
            getProfileTable(7);
            break;
        case 8:
            getProfileTable(8);
            break;
        default:
            document.getElementById('errorMsg').innerHTML = "Invalid Profile Entry";
            $('.error').show();
    }
}

async function getProfileTable(num) {
    let str = document.getElementById("rowNumber" + num).value;
    setRowNo = str;
    if (str <= 0 || str > 12) {
        document.getElementById('errorMsg').innerHTML = "Invalid Value";
        $('.error').show();
    } else {
        $('.error').hide();
        let totalTime = 0;
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
            totalTime = 0;
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
                totalTime += parseInt(td2.textContent);
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
            totalTime = 0;
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
                totalTime += parseInt(td2.textContent);
                r1.appendChild(td2);

                let td3 = document.createElement('td');
                //td2.textContent = data[i].deadline;
                //td2.textContent = timePowerData[i].power;
                td3.textContent = 25 * i;
                r1.appendChild(td3);

                dataTable.appendChild(r1);
            }
        }
        table = document.getElementById('jsonTable' + num).appendChild(dataTable);
        document.getElementById('jsonTable' + num).appendChild(dataTable);
        progress(totalTime, $('#progressBar' + num));
    }

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
            return gProfile(2);
        }
    }, 1000);
};

var beginResult, endResult;

async function setForBegin() {

    let begin = document.getElementById("begin").value;
    let beginH = parseInt(begin[0] + begin[1]);
    let beginM = parseInt(begin[3] + begin[4]);
    beginResult = beginH * 60 + beginM;
}

async function setForEnd() {

    let end = document.getElementById("end").value;
    let endH = parseInt(end[0] + end[1]);
    let endM = parseInt(end[3] + end[4]);
    endResult = endH * 60 + endM;
}

function controlForTime() {
    let totalMin = endResult - beginResult;
    if (endResult < beginResult) {
        document.getElementById('errorMsg').innerHTML = "The ending time cannot be earlier than the beginning time";
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



async function getRepeatCount() {
    let repeat = document.getElementById("repeatCount").value;
    setRepeatCount = repeat;

}

function getNextProfile() {
    let str = document.getElementById("nextProfile").value;
    return gProfile(str);
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
    result = 'AS';
    result = result.concat(setSwitchValue);
    result = result.concat('#P');
    result = result.concat(setProfileNum);
    result = result.concat('#ROW');
    result = result.concat(setRowNo);
    result = result.concat('#B');
    result = result.concat(setBeginTime);
    result = result.concat('#E');
    result = result.concat(setEndTime);
    result = result.concat('#M');
    result = result.concat(setMethod);
    result = result.concat('#NP');
    result = result.concat(setNextProfile);
    result = result.concat('#R');
    result = result.concat(setRepeatCount);
    result = result.concat('#');
    result = result.concat(setTimeTypeValue);
    console.log(result);
}

setup();