(function() {
    var frmReg = document.getElementById("frmRegister");
    var errContainer = document.getElementById("form-errors");
    var fldsReqd = document.getElementById("fields-reqd");
    var strErrMsg = '';
    var elm, elm2, re, arrErrors;

    function setErrorState(which) {
        document.querySelector('label[for="' + which + '"]').classList.add('errmsg');
        document.getElementById(which).classList.add('errmsg');
    }

    frmReg.addEventListener("submit", (e) => {
            e.preventDefault();

            // clear out the errors if any
            errContainer.innerHTML = '';
            var errors = document.querySelectorAll('.errmsg');
            errors.forEach((err) => {
                err.classList.remove('errmsg');
            })


            arrErrors = [];
            // check the first name
            elm = document.getElementById('firstName');
            if(elm.value.length < 2) {
                arrErrors.push('Invalid First Name');
                setErrorState(elm.id);
            }

            // check the email address
            elm = document.getElementById('email');
            re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(!re.test(elm.value)) {
                arrErrors.push('Invalid Email Address');
                setErrorState(elm.id);
            }

            // check the password - not checking strong password, just length
            elm = document.getElementById('choosePassword');
            if(elm.value.length < 8) {
                arrErrors.push('Invalid Passord');
                setErrorState(elm.id);
            }

            // check that the password confirmation value is the same
            elm2 = document.getElementById('confirmPassword');
            if(elm2.value !== elm.value) {
                arrErrors.push('Passwords don\'t match');
                setErrorState(elm2.id);
            }
           
            // ckeck the user selected a dob
            var dobSelects = document.querySelectorAll('select');
            var dobStillValid = true;
            dobSelects.forEach((sObj) => {
                if(dobStillValid) {
                        // make sure this is only done once...
                        if(sObj.value === '') {
                        dobStillValid = false;
                            arrErrors.push('Invalid Birthdate');
                            setErrorState('dobMonth');
                    }
                }

            });
        

            // check the phone number using a regular expression 
            re = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;
            elm = document.getElementById('phoneNbr');
            if(elm.value !== '') {
                // appears to be not required, but if it is provided, then make the user enter correct format
                if(!re.test(elm.value)) {
                    arrErrors.push('Invalid Phone Number');
                    setErrorState(elm.id);
                }
            }

            // check the zip code
            re = /^\d{5}(?:[-\s]\d{4})?$/;
            elm = document.getElementById('zipCode');
            if(!re.test(elm.value)) {
                arrErrors.push('Invalid Zip Code');
                setErrorState(elm.id);
            }


            // check that the terms where agreed to
            elm = document.getElementById('chkTosPrivacy');
            if(!elm.checked) {
                arrErrors.push('You must accept the terms & conditions and privacy policy');
                setErrorState(elm.id);
                
            }


            if(arrErrors.length !== 0) {
                strErrMsg = 'The following errors have occured:<br /><br />';
                for(var i = 0; i < arrErrors.length; i++) {
                    strErrMsg += '- ' + arrErrors[i] + '<br />';
                }
                errContainer.innerHTML = strErrMsg;
                fldsReqd.classList.add('errmsg');
            } else {
                e.target.submit();
            }

        });


    
})();