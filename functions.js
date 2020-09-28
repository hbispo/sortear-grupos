// Auto-resizing textarea, obtained at https://stackoverflow.com/a/25621277 (and modified)
window.onload = function () {
    const tx = document.getElementsByTagName('textarea');
    for (let i = 0; i < tx.length; i++) {
        tx[i].setAttribute('style', 'height:' + (tx[i].scrollHeight) + 'px;overflow-y:hidden;');
        tx[i].addEventListener("input", OnInput, false);
    }
};

function OnInput() {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
}
// End of auto-resizing textarea, obtained at https://stackoverflow.com/a/25621277 (and modified)


// Random number in an interval, obtained at https://stackoverflow.com/a/7228322
function randomIntFromInterval(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}
// End of random number in an interval, obtained at https://stackoverflow.com/a/7228322


// Download file from text, obtained at https://stackoverflow.com/a/18197341
function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}
// End of download file from text, obtained at https://stackoverflow.com/a/18197341


function loadPreviousGroups() {
    let file = groupsForm.previousGroups.files[0];
    if (file.type.toLowerCase().indexOf('json') < 0) {
        groupsForm.previousGroups.value = '';
        alert('Please choose a .json file previously generated by this page.');
        return;
    }

    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
        let previousGroups = JSON.parse(event.target.result);
        groupsForm.people.value = previousGroups.people.join("\n");
    });
    reader.readAsDataURL(file);
}

function pickGroups(max, min = 0) {
    let previousGroups = {
        people: [],
        groups: []
    };

    // Splitting the lines, trimming them, removing non-letters from the beginning of each one and removing the empty ones
    let people = groupsForm.people.value.split("\n").map(function (word) {
        return word.trim().replace(/^[\d]*[\W]*/, '').trim();
    }).filter(function (word) {
        return word.length > 0;
    });

    // Removing all duplicate values
    people = [...new Set(people)];
    previousGroups.people = [...people];

    let groups = [];
    while (people.length) {
        let group = [];

        for (let i = 0; i < max && people.length; ++i) {
            let person = randomIntFromInterval(0, people.length - 1);
            group.push(people.splice(person, 1));
        }

        groups.push(group);
    }

    previousGroups.groups.push(groups);

    console.log(previousGroups);
}