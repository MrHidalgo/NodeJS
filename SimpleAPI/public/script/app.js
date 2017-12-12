/**
 *
 * @param user
 * @returns {string}
 */
let row = function (user) {
    const template = `
        <tr data-rowid="${user.id}">
           <td>${user.id}</td>          
           <td>${user.name}</td>          
           <td>${user.age}</td>          
           <td>
               <a class="editLink" data-id="${user.id}">Change</a> | <a class="removeLink" data-id="${user.id}">Delete</a>
           </td>          
        </tr>
    `;

    return template;
};

/**
 *
 * @constructor
 */
function GetUsers() {
    $.ajax({
        url: "/api/users/",
        type: "GET",
        contentType: "application/json",
        success: (users) => {
            let rows = "";

            $.each(users, (index, user) => {
                rows += row(user);
            });

            $('table tbody').append(rows);
        }
    });
}

/**
 *
 * @param id
 * @constructor
 */
function GetUser(id) {
    $.ajax({
        url: "/api/users/" + id,
        type: "GET",
        contentType: "application/json",
        success: (user) => {
            let form = document.forms["userForm"];

            form.elements["id"].value = user.id;
            form.elements["name"].value = user.name;
            form.elements["age"].value = user.age;
        }
    });
}

/**
 *
 * @param userName
 * @param userAge
 * @constructor
 */
function CreateUser(userName, userAge) {
    $.ajax({
        url: "api/users",
        contentType: "application/json",
        method: "POST",
        data: JSON.stringify({
            name: userName,
            age: userAge
        }),
        success: (user) => {

            reset();

            $("table tbody").append(row(user));
        }
    })
}

/**
 *
 * @param userId
 * @param userName
 * @param userAge
 * @constructor
 */
function EditUser(userId, userName, userAge) {
    $.ajax({
        url: "api/users",
        contentType: "application/json",
        method: "PUT",
        data: JSON.stringify({
            id: userId,
            name: userName,
            age: userAge
        }),
        success: (user) => {
            reset();
            $("tr[data-rowid='" + user.id + "']").replaceWith(row(user));
        }
    })
}

/**
 *
 */
function reset() {
    let form = document.forms["userForm"];

    form.reset();
    form.elements["id"].value = 0;
}

/**
 *
 * @param id
 * @constructor
 */
function DeleteUser(id) {
    $.ajax({
        url: "api/users/" + id,
        contentType: "application/json",
        method: "DELETE",
        success: (user) => {
            console.log(user);

            $("tr[data-rowid='" + user.id + "']").remove();
        }
    })
}

/**
 *
 */
(() => {
    const BODY = "body";

    GetUsers();

    $("#reset").click((event) => {
        event.preventDefault();
        reset();
    });

    $("form").submit((event) => {
        event.preventDefault();

        let id = event.target.elements["id"].value,
            name = event.target.elements["name"].value,
            age = event.target.elements["age"].value;

        if (Number(id) === 0) {
            CreateUser(name, age);
        } else {
            EditUser(id, name, age);
        }
    });

    $(BODY).on("click", ".editLink", (event) => {
        let id = $(event.target).attr("data-id");

        GetUser(id);
    });

    $(BODY).on("click", ".removeLink", (event) => {
        let id = $(event.target).data("id");

        DeleteUser(id);
    });

})();
