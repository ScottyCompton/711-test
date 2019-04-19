(function() {
    
    // let's do some setup

    let monthsOfTheYear = { // does not take into account leap years... sue me.
        'Jan': 31,
        'Feb': 28,
        'Mar': 31,
        'Apr': 30,
        'May': 31,
        'Jun': 30,
        'Jul': 31,
        'Aug': 31,
        'Sep': 30,
        'Oct': 31,
        'Nov': 30,
        'Dec': 31,
    }
    let dobMonth = document.getElementById('dobMonth');
    let dobDay = document.getElementById('dobDay');
    let dobYear = document.getElementById('dobYear');
    let dobSelect = document.querySelectorAll('select');
    let dobInfo = document.getElementById('dobInfo');
    let dobInfoTip = document.getElementById('dobInfoToolTip');
    let monthNum = 1;
    let d = new Date();
    let yearNow = d.getFullYear();
 
    
    // populate the month dropdown

    dobMonth.options[dobMonth.options.length] = new Option('Month', '');
    for (month in monthsOfTheYear) {
        dobMonth.options[dobMonth.options.length] = new Option(month, monthNum);
        monthNum++;
    }

    // populate the year dropdown

    dobYear.options[dobYear.options.length] = new Option('Year', '');
    for (var i = yearNow - 100; i < yearNow; i++) {
        dobYear.options[dobYear.options.length] = new Option(i, i);
    }


    // add event listener to change the style of the DOB select
    // boxes to the default color when a value is selected

    dobSelect.forEach((sObj) => {
        sObj.addEventListener('change', (e) => {
            if(e.target.selectedIndex !== 0) {
                e.target.classList.remove('lightGrey');
            } else {
                e.target.classList.add('lightGrey');
            }
        });
    });



    // add event listener to change the DOB days to the correct
    // number of days for that month

    dobMonth.addEventListener('change', (e) => {
        let monthName = e.target.options[e.target.selectedIndex].text;

        removeOptions(dobDay);
        let daysInMonth = monthsOfTheYear[monthName];
        if (e.target.selectedIndex !== 0) {
            dobDay.disabled = false;
            for (var i = 1; i <= daysInMonth; i++) {
                dobDay.options[dobDay.options.length] = new Option(i, i);
            }
        } else {
            // reset the select boxes back the way they were
            dobDay.options[dobDay.options.length] = new Option('Day', '');
            dobDay.classList.add('lightGrey');
            dobYear.selectedIndex = 0;
            dobYear.classList.add('lightGrey');
            dobDay.disabled = true;
        }

    });


    // birthday info tooltip
    // Yes, I know I could have used bootstrap tooltips or jQuery or any number
    // of other libraries, but I have a serious adversion to importing more than I need
    // for just one tooltip :-)

    dobInfo.addEventListener('mouseover', (e) => {
        dobInfoTip.classList.remove('tip-hidden');
    });

    dobInfo.addEventListener('mouseout', (e) => {
        dobInfoTip.classList.add('tip-hidden');
    })

    // removes all the options in a selectbox prior
    // to populating it with whatever values

    function removeOptions(selectbox) {
        var i;
        for (i = selectbox.options.length - 1; i >= 0; i--) {
            selectbox.remove(i);
        }
    }




})();