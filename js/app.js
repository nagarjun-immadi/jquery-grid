$(document).ready(function() {
    var tbody = $('#grid-body');
    var searchInput = $('#search');
    var addUser = $('#add-user');
    var formHolder = $('#form-holder');
    var close = $('#close');
    var save = $('#save');
    var usersData = [];

    function buildTable(users) {
        var rows = '';
        for (var index = 0; index < users.length; index++) {
            var user = users[index];
            rows += '<tr> \
                        <td>'+ user.id +'</td> \
                        <td>'+ user.first_name +'</td> \
                        <td>'+ user.last_name +'</td> \
                        <td>'+ user.email +'</td> \
                        <td>'+ user.gender +'</td> \
                        <td>'+ user.phone +'</td> \
                        <td>'+ user.address +'</td> \
                        <td>'+ user.university +'</td> \
                        <td>'+ user.country +'</td> \
                        <td>'+ user.dob +'</td> \
                        <td>'+ user.skills +'</td> \
                        <td>'+ user.experience +'</td> \
                    </tr>';
        }
        tbody.html(rows);
    }

    function getUsers() {
        tbody.html('<tr class="message"><td colspan=12><img src="img/loader.gif" /></td></tr>');
        $.get('http://localhost:3000/users', function(data, status) {
            usersData = data;
            buildTable(usersData);
        });
    }

    getUsers();

    searchInput.keyup(function(event) {
        var searchTerm = event.target.value;
        if(searchTerm.length > 1) {
            var filteredRecords = [];
            var userObj = usersData[0];
            var keys = Object.keys(userObj);
            for (var index = 0; index < usersData.length; index++) {
                var user = usersData[index];
                for (var j = 0; j < keys.length; j++) {
                    var key = keys[j];
                    var value = String(user[key]).toLowerCase();
                    if(value.indexOf(searchTerm) !== -1) {
                        filteredRecords.push(user);
                        break;
                    }
                }
            }
            if(filteredRecords.length > 0) {
                buildTable(filteredRecords);
            } else {
                tbody.html('<tr class="message"><td colspan=12>No Records Founds</td></tr>');
            }
        } else {
            buildTable(usersData);
        }
    });

    addUser.click(function(event){
        formHolder.addClass("show");
        formHolder.removeClass("hide");
        clearErrors();
        var userForm = document.getElementsByName('user-form')[0];
        userForm.reset();
    });

    close.on('click', function(event){
        formHolder.addClass("hide");
        formHolder.removeClass("show");
    });

    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    function clearErrors() {
        var errorDivIds = [
            'first_name_error',
            'last_name_error',
            'email_error',
            'gender_error',
            'phone_error',
            'address_error',
            'university_error',
            'country_error',
            'dob_error',
            'skills_error',
            'experience_error',
        ];

        for (var index = 0; index < errorDivIds.length; index++) {
            var element = document.getElementById(errorDivIds[index]);
            element.innerHTML = '';
        }
    }

    $("form[name='user-form']").validate({
        rules: {
            first_name: "required",
            last_name: "required",
            email: {
                required: true,
                email: true
            }
        },
        messages: {
            first_name: "Please enter your firstname",
            last_name: "Please enter your lastname",
            email: "Please enter a valid email address"
        },
        submitHandler: function(form) {
            // Gett all form data and Do Ajax call here
        }
    });

});