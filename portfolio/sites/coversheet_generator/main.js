document.getElementById("submit").addEventListener("click", function (event) {
    event.preventDefault();
    generatePage();
});

function generatePage() {

    subject_dd = document.getElementById("subject");
    subject_name = subject_dd.options[subject_dd.selectedIndex].value || "subjName";
    student_name = document.getElementById("student_name").value || "name";
    project_name = document.getElementById("project_name").value || "projName";


    let teachers = {
        "Physics": "Mrs Gigimol",
        "Biology": "Mrs Rekha M.M",
        "Chemistry": "Mrs Josephine Sherlin Beaul M",
        "Informatics Practices [old]": "Mr M. Bahadur Basha"
    }

    let teacherGs = {
        "Mrs Gigimol": "her",
        "Mrs Rekha M.M": "her",
        "Mrs Josephine Sherlin Beaul M": "her",
        "Mr M. Bahadur Basha": "his"
    }

    const subject_codes = {
        "Physics": "042",
        "Biology": "044",
        "Chemistry": "043",
        "Informatics Practices [old]": "265"
    }

    document.getElementById("cover").style.display = "";
    document.getElementById("bonafide").style.display = "";
    document.getElementById("acknowledgement").style.display = "";

    for (let x of document.getElementsByClassName("projectName")) {
        x.innerHTML = project_name;
    }

    for (let x of document.getElementsByClassName("studentName")) {
        x.innerHTML = student_name;
    }

    for (let x of document.getElementsByClassName("teacherName")) {
        x.innerHTML = teachers[subject_name];
    }

    for (let x of document.getElementsByClassName("teacherGender")) {
        x.innerHTML = teacherGs[teachers[subject_name]];
    }

    for (let x of document.getElementsByClassName("PGTSub")) {
        x.innerHTML = "PGT - " + subject_name;
        if (subject_name === "Informatics Practices [old]") {
            x.innerHTML = "PGT - CS/IP";
        }
    }

    for (let x of document.getElementsByClassName("AsAPart")) {
        x.innerHTML = "As a part of the " + subject_name + " course " + "(" + subject_codes[subject_name] + ")";
    }

    alert("Generating coversheets...")
    for(let x of ['cover', 'bonafide', 'acknowledgement']) {
        let elem = document.getElementById(x);
        domtoimage.toJpeg(elem, { bgcolor: "FFFFFF" })
        .then(function (dataUrl) {
            var link = document.createElement('a');
            link.download = `${student_name}_${subject_name}_${x}.jpeg`;
            link.href = dataUrl;
            link.click();
        });
    }
}
