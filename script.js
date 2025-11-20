let members = {};
let memberId = 1;

// Dropdown Update
function dropdownOptions() {
    let father = document.getElementById("father");
    let mother = document.getElementById("mother");

    father.innerHTML = '<option value="">None</option>';
    mother.innerHTML = '<option value="">None</option>';

    Object.values(members).forEach(m => {
        father.innerHTML += `<option value="${m.id}">${m.name}</option>`;
        mother.innerHTML += `<option value="${m.id}">${m.name}</option>`;
    });
}

// Save or Edit Member
function saveMember() {
    let id = document.getElementById("editId").value || memberId++;

    let name = document.getElementById("name").value.trim();
    if (!name) return alert("Name is required!");

    let member = members[id] || { id, children: [] };

    member.name = name;
    member.gender = document.getElementById("gender").value;
    member.dob = document.getElementById("dob").value;
    member.father = document.getElementById("father").value || null;
    member.mother = document.getElementById("mother").value || null;

    members[id] = member;

    // Auto add child to parents
    if (member.father) members[member.father].children.push(id);
    if (member.mother) members[member.mother].children.push(id);

    resetForm();
    renderMembers();
    renderTree();
}

// Reset Form
function resetForm() {
    document.getElementById("editId").value = "";
    document.getElementById("name").value = "";
    document.getElementById("gender").value = "";
    document.getElementById("dob").value = "";
    document.getElementById("father").value = "";
    document.getElementById("mother").value = "";
    dropdownOptions();
}

// Render members list
function renderMembers() {
    dropdownOptions();
    
    let list = document.getElementById("memberList");
    list.innerHTML = "";

    Object.values(members).forEach(m => {
        list.innerHTML += `
            <a class="list-group-item list-group-item-action" onclick="showDetails(${m.id})">
                ${m.name}
            </a>
        `;
    });
}

// Show details
function showDetails(id) {
    let m = members[id];

    let father = m.father ? members[m.father].name : "None";
    let mother = m.mother ? members[m.mother].name : "None";
    let children = m.children.map(cid => members[cid].name).join(", ") || "None";

    let siblings = Object.values(members)
        .filter(x => (x.father === m.father || x.mother === m.mother) && x.id !== id)
        .map(s => s.name)
        .join(", ") || "None";

    document.getElementById("details").innerHTML = `
        <p><b>Name:</b> ${m.name}</p>
        <p><b>Gender:</b> ${m.gender || "-"}</p>
        <p><b>Date of Birth:</b> ${m.dob || "-"}</p>
        <p><b>Father:</b> ${father}</p>
        <p><b>Mother:</b> ${mother}</p>
        <p><b>Children:</b> ${children}</p>
        <p><b>Siblings:</b> ${siblings}</p>

        <button class="btn btn-warning btn-sm me-2" onclick="editMember(${id})">Edit</button>
        <button class="btn btn-danger btn-sm" onclick="deleteMember(${id})">Delete</button>
    `;
}

// Edit Member
function editMember(id) {
    let m = members[id];
    document.getElementById("editId").value = m.id;
    document.getElementById("name").value = m.name;
    document.getElementById("gender").value = m.gender;
    document.getElementById("dob").value = m.dob;
    document.getElementById("father").value = m.father;
    document.getElementById("mother").value = m.mother;
}

// Delete Member
function deleteMember(id) {
    if (!confirm("Are you sure you want to delete this member?")) return;

    delete members[id];

    Object.values(members).forEach(m => {
        m.children = m.children.filter(c => c !== id);
    });

    renderMembers();
    renderTree();
    document.getElementById("details").innerHTML = "Click a name to view details";
}

// Build Family Tree View
function renderTree() {
    let roots = Object.values(members).filter(m => !m.father && !m.mother);

    let output = "";

    function buildTree(member, space = "") {
        output += space + member.name + "\n";
        member.children.forEach(cid => {
            buildTree(members[cid], space + "   └── ");
        });
    }

    roots.forEach(r => buildTree(r));
    document.getElementById("treeDisplay").textContent = output || "No members yet.";
}

// Initialize
dropdownOptions();

