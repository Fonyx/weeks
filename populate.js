// @ts-check
function populate(birthdate) {
    let age = getAgeInWeeks(birthdate);
    let lifetime = getExpectedLifetimeWeeks(birthdate);
    console.log('lifetime: ', lifetime);
    console.log('weeks: ', age);
    let height = determineHeight(lifetime);
    adjustSvgSize(height);
    addWeeksToDoc(age, lifetime);
}

function determineHeight(lifetime){
    let lines = Math.round(lifetime/52) + 1
    let height = lines*11.6;
    return height;
}

function adjustSvgSize(height){
    console.log('Setting height: ', height)
    let svg = d3.select('#svg')
        .attr('height', height+20)
        .attr('width', 530);
}

function getAgeInWeeks(birthdate) {
    // get users age in weeks from birth
    var birth = new Date(birthdate);
    var current = new Date();
    // Difference in milliseconds
    var diff = current.getTime() - birth.getTime();
    // How many milliseconds in a week
    var week = 60 * 60 * 24 * 7 * 1000;
    var weeks = Math.round(diff / week);
    return weeks;
}

function getExpectedLifetimeWeeks(birthdate) {
    // A function that returns the number of weeks in life-expectancy.json for a given birth year
    // Assuming Australia
    // Assuming ignore gender
    // Assuming birthyear expected average lifetime, this is a very coerced assumption, more accurate would be to 
    //      assume further along in time as a person spends most of their life living in years with higher expected
    //      lifetimes so unless they die in the year they were born their expected lifetime is longer
    var birth = new Date(birthdate);
    var birthyear = +birth.getFullYear();
    let expectedLifetimeYears = getYearExpectationFromYear(birthyear);
    return roundYearsToWeeks(expectedLifetimeYears)
}

function getYearExpectationFromYear(year){
    // This equation is derived from the expected csv file
    let expectation = 0.2268*year - 374.26;
    return expectation;
}

function roundYearsToWeeks(years) {
    var weeks = Math.round(years * 52);
    return weeks;
}

function addWeeksToDoc(age, lifetime) {
    // Store a reference to canvas.
    const svg = d3.select('#svg');
    let lived_color = 'orange';
    let lifetime_color = 'blue';
    let layer = 1;
    let position = 1;
    let active_color = lived_color;
    let node_size = 3
    let node_spacing = 1

    for (let i = 1; i <= lifetime; i++){
        if (i > age){
            active_color = lifetime_color;
        }
        svg.append('circle')
            .attr('cx', 10*position)
            .attr('cy', 10*layer)
            .attr('r', node_size)
            .style('fill', active_color);

        if (i % 52 == 0){
            layer += 1;
            position = node_spacing;
        } else {
            position += node_spacing;
        }
    }
}
