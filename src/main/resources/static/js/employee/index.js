const baseurl = "http://localhost:9999/api/";
let table = null;
$(document).ready( function () 
{
   table =  $('#myTable').DataTable({
        "ajax" : {
            "url" :  baseurl + "employee",
            "type" : "GET",
            "dataSrc" : "data"
    },
    "columnDefs": [
        {
            "targets": [0],
            "width": "2%",
        },
        {
            "targets": [1],
            "visible": false,
        },
        {
            "targets": [2],
            "width": "50%",
        },
        {
            "targets": [3],
            "width": "50%",
            "searchable": false,
            "orderable": false,
        },

    ],
    "columns": [
        {
            data: null,
            name: "no",
            autowith: true,
            render: function (data, type, row, meta){
                return meta.row + meta.settings._iDisplayStart + 1;
            }
        },
        {data: "id", name: "id", autowith: true},
        {data: "fullname", name: "fulname", autowith: true},
        {data: "email", name: "email", autowith: true},
        {data: null,
         className:"dt-centere editor-update",
         defaultContent:
         '<button type="submit" id="update" data-id="id" class="btn btn-warning" dt-bs-toggle="modal" data-bs-target="Modal_addEmp">update</button>' 
        }

    ]
        
    });

    $("#submit").on("click", function(e) {
        e.preventDefault();
        submit();
    })
});

function submit() {
    var id = $("#id").val();
    if(id == "" || id == " ") {
        Post();
    }else{
        Put(id);
    }
}

function Post(){
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
        }else if(result.status == 400){
            Swal.fire(
                'watch out!',
                'Duplicate Data!',
                'error'
            )
        }
        Reset();
    }).fail((error) =>{
        Swal.fire(
            'warning!',
            'Check your internet connection!',
            'warning'
        )
        Reset();
    });
}

function Put(id) {
    
}

function Delete(id) {
    
}

function Reset() {
    $("#fullname").val("");
    $("#email").val("");
    $("#id").val("");
}
