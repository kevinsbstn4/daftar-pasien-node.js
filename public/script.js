getData();
async function getData() {
  const response = await fetch("/read");
  const json = await response.json();
  console.log(json);
  showData(json);
}

const btnSave = document.getElementById("btn_save");
btnSave.addEventListener("click", async event => {
  const action = btnSave.textContent;

  const nis = document.getElementById("nis").value;
  const nama = document.getElementById("nama").value;
  const alamat = document.getElementById("alamat").value;
  const umur = document.getElementById("umur").value;
  const no_hp = document.getElementById("no_hp").value;
  const kelas = document.getElementById("kelas").value;
  const selectedtext = document.getElementById("selectedtext").value;
  const selvalue = document.getElementById("selvalue").value;

  let data = {
    nis: nis,
    nama: nama,
    alamat: alamat,
    umur: umur,
    no_hp: no_hp,
    kelas: kelas,
    selectedtext: selectedtext,
    selvalue: selvalue,
    action: action
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  };
  const response = await fetch("/api", options);
  const json = await response.json();
  console.log(json);

  getData();

  $("#exampleModal").modal("hide");

  if (action === "Simpan") {
    $.alert("Data Berhasil ditambah!");
  } else {
    $.alert("Data Berhasil dirubah!");
  }
});

$(document).ready(function() {
  $(".chkbx").click(function() {
    var text = "";
    $(".chkbx:checked").each(function() {
      text += $(this).val() + ",";
    });
    text = text.substring(0, text.length - 1);
    $("#selectedtext").val(text);
    var count = $("[type='checkbox']:checked").length;
    $("#count").val($("[type='checkbox']:checked").length);
  });
});

$(document).ready(function() {
  $("#myForm input").on("change", function() {
    var selvalue = $("[type='radio']:checked").val();
    $("#selvalue").val($("[type='radio']:checked").val());
  });
});

function showData(json) {
  let tr = "";
  $("#databody").html("");
  let no;
  for (let i = 0; i < json.length; i++) {
    no = i + 1;
    tr = $("<tr/>");
    tr.append("<td>" + no + "</td>");
    tr.append("<td>" + json[i].nis + "</td>");
    tr.append("<td>" + json[i].nama + "</td>");
    tr.append("<td>" + json[i].alamat + "</td>");
    tr.append("<td>" + json[i].umur + "</td>");
    tr.append("<td>" + json[i].no_hp + "</td>");
    tr.append("<td>" + json[i].kelas + "</td>");
    tr.append("<td>" + json[i].selectedtext + "</td>");
    tr.append("<td>" + json[i].selvalue + "</td>");
    tr.append(
      `
              <td>
                  <button type="button" class="btn btn-warning btnEdit" data-nis="` +
        json[i].nis +
        `">
                      Edit
                  </button>
                  <button type="button" class="btn btn-danger btnHapus" data-nis="` +
        json[i].nis +
        `">
                      Hapus
                  </button>
              </td>`
    );
    $("#databody").append(tr);
  }

  //Jquery Selector
  $(function() {
    $(".btnTambahData").on("click", function() {
      document.getElementById("nis").readOnly = false;
      document.getElementById("nis").value = "";
      document.getElementById("nama").value = "";
      document.getElementById("alamat").value = "";
      document.getElementById("umur").value = "";
      document.getElementById("no_hp").value = "";
      document.getElementById("kelas").value = "";
      document.getElementById("selectedtext").value = "";
      document.getElementById("selvalue").value = "";

      $("#exampleModalLabel").html("Tambah Data Siswa");
      $(".modal-footer button[id=btn_save]").html("Simpan");
    });

    $(".btnEdit").on("click", async function() {
      let nis = $(this).data("nis");
      console.log(nis);

      const url = `readbynis/${nis}`;
      const response = await fetch(url);
      const json = await response.json();
      console.log(json[0].nis);

      document.getElementById("nis").readOnly = true;
      document.getElementById("nis").value = json[0].nis;
      document.getElementById("nama").value = json[0].nama;
      document.getElementById("alamat").value = json[0].alamat;
      document.getElementById("umur").value = json[0].umur;
      document.getElementById("no_hp").value = json[0].no_hp;
      document.getElementById("kelas").value = json[0].kelas;
      document.getElementById("selectedtext").value = json[0].selectedtext;
      document.getElementById("selvalue").value = json[0].selvalue;

      $("#exampleModalLabel").html("Ubah Data Siswa");
      $(".modal-footer button[id=btn_save]").html("Ubah Data");
      $("#exampleModal").modal("show");
    });

    $(".btnHapus").on("click", async function() {
      let nis = $(this).data("nis");

      $.confirm({
        title: "Hapus Data Siswa",
        content: "Apakah Anda Yakin...???",
        buttons: {
          ya: {
            text: "YA",
            btnClass: "btn-blue",
            action: async function() {
              const url = `hapus/${nis}`;
              const response = await fetch(url);
              const json = await response.json();
              $.alert("Data Berhasil dihapus!");
              getData();
            }
          },
          tidak: function() {}
        }
      });
    });
  });
}
