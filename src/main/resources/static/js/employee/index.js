const baseurl = "http://localhost:9999/api/";
let table = null;
$(document).ready(function() {
    table = $('#myTable').DataTable({
        "ajax": {
            "url": baseurl + "employee",
            "type": "GET",
            "dataSrc": "data"
        },
        "columnDefs": [{
                "targets": [0],
                "width": "2%",
            },
            {
                "targets": [1],
                "visible": false,
            },
            {
                "targets": [2],
                "width": "35%",
            },
            {
                "targets": [3],
                "width": "35%",
                "searchable": false,
                "orderable": false,
            },
            {
                "targets": [4],
                "width": "25%",

            }

        ],
        "columns": [{
                data: null,
                name: "no",
                autowith: true,
                render: function(data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                }
            },
            { data: "id", name: "id", autowith: true },
            { data: "fullname", name: "fulname", autowith: true },
            { data: "email", name: "email", autowith: true },
            {
                "render": function(data, type, full, meta) {

                    return `<button class="btn btn-primary edit"  data-id="` + full.id + `">Edit</button> 
                    <button class="btn btn-danger" id="delete"  data-id="` + full.id + `">Delete</button>`;

                },



            },

        ]

    });

    $("#submit").on("click", function(e) {
        e.preventDefault();
        submit();
    })


    $(document).on('click', '.edit', function() {
        let id = $(this).data('id');
        $.ajax({
            url: baseurl + "employee/" + id,
            type: 'GET',
            dataType: 'json',
            success: function(result) {
                console.log(result.data);
                $('#id').val(result.data.id);
                $('#fullname').val(result.data.fullname);
                $('#email').val(result.data.email);
                $('#Modal_addEmp').modal('show');
            }
        });
    });

    $(document).on('click', '#delete', function() {
        let id = $(this).data('id');
        Swal.fire({
            title: 'Apakah Anda yakin ingin menghapus data ini?',
            text: 'Data yang dihapus tidak dapat dikembalikan.',
            icon: 'warning',
            buttons: true,
            dangerMode: true,
        }).then(function(willDelete) {
            if (willDelete) {
                Delete(id);
            }
        });
    });

});



function submit() {
    var id = $("#id").val();
    if (id == "" || id == " ") {
        Post();
    } else {
        Put(id);
    }
}

function Post() {
    var employee = new Object();
    employee.fullname = $("#fullname").val();
    employee.email = $("#email").val();
    $.ajax({
        url: baseurl + "employee",
        type: "POST",
        data: JSON.stringify(employee),
        headers: {
            'Content-Type': 'application/json',
        }
    }).done((result) => {
        if (result.status == 200) {
            Swal.fire(
                'Good Job!',
                'Your Data has been  Saved',
                'success'
            )
            $("#Modal_addEmp").modal("toggle");
            table.ajax.reload();
        } else if (result.status == 400) {
            Swal.fire(
                'watch out!',
                'Duplicate Data!',
                'error'
            )
        }
        Reset();
    }).fail((error) => {
        Swal.fire(
            'warning!',
            'Check your internet connection!',
            'warning'
        )
        Reset();
    });
}


function Put(id) {
    let employee = new Object();
    employee.fullname = $("#fullname").val();
    employee.email = $("#email").val();
    $.ajax({
        url: baseurl + "employee/" + id,
        type: "PUT",
        data: JSON.stringify(employee),
        headers: {
            'Content-Type': 'application/json'
        }
    }).done((result) => {
        if (result.status == 200) {
            Swal.fire(
                'Good job!',
                'Your data has been updated!',
                'success'
            )
            $("#Modal_addEmp").modal("toggle");
            table.ajax.reload();
        } else if (result.status == 400) {
            Swal.fire(
                'Watch out!',
                'Duplicate Data',
                'error'
            )
        }
        Reset();
    }).fail((error) => {
        Swal.fire(
            'Warning!',
            'Check Your Connection Internet',
            'warning'
        )
        Reset();
    });
}

function Delete(id) {
    $.ajax({
        url: baseurl + "employee/delete/" + id,
        type: 'DELETE',
        dataType: 'json',
        data: { id: id },
        success: function(data) {
            Swal.fire('Data berhasil dihapus', {
                icon: 'success',
            });
            table.ajax.reload();

        },
        error: function() {
            Swal.fire('Terjadi kesalahan saat melakukan request Ajax', {
                icon: 'error',
            });
            table.ajax.reload();

        }
    });
}

function Reset() {
    $("#fullname").val("");
    $("#email").val("");
    $("#id").val("");
}