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
  const nama_pasien = document.getElementById("nama_perawat").value;
  const nama_pasien = document.getElementById("nama_pasien").value;

  let data = {
    nis: nis,
    nama_perawat: nama_perawat,
    nama_pasien: nama_pasien
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

function showData(json) {
  let tr = "";
  $("#dataperawat").html("");
  let no;
  for (let i = 0; i < json.length; i++) {
    no = i + 1;
    tr = $("<tr/>");
    tr.append("<td>" + no + "</td>");
    tr.append("<td>" + json[i].nis + "</td>");
    tr.append("<td>" + json[i].nama_perawat + "</td>");
    tr.append("<td>" + json[i].nama_pasien + "</td>");
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
    $("#dataperawat").append(tr);
  }

  //Jquery Selector
  $(function() {
    $(".btnTambahData").on("click", function() {
      document.getElementById("nis").value = "";
      document.getElementById("nama_perawat").value = "";
      document.getElementById("nama_pasien").value = "";

      $("#exampleModalLabel").html("Tambah Data Perawat");
      $(".modal-footer button[id=btn_save]").html("Simpan");
    });

    $(".btnEdit").on("click", async function() {
      let nis = $(this).data("nis");
      console.log(nis);

      const url = `readbynis/${nis}`;
      const response = await fetch(url);
      const json = await response.json();
      console.log(json[0].nis);

      document.getElementById("nis").value = json[0].nis;
      document.getElementById("nama_perawat").value = json[0].nama_perawat;
      document.getElementById("nama_pasien").value = json[0].nama_pasien;

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
