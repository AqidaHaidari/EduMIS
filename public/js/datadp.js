postDatadp = (data) => {
  console.log("HHHHHHHHHHHHH")
    const depname = document.getElementById('depname').value;
    const year = document.getElementById('year').value;
    const month = document.getElementById('month').value;
    // let url = "http://localhost:3000/";  
    let url = "/";  
      let method = 'POST'
    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            depname: depname,
            year: year,
            month: month
        })
    })
    .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Creating or editing a post failed!');
        }
        return res.json();
      })
    .then(data => {
      var x=document.getElementById('tableData').getElementsByTagName('tbody')[0].insertRow(0);
        var c1 = x.insertCell(0);
        var c2 = x.insertCell(1);
        var c3 = x.insertCell(2);
        var c4 = x.insertCell(3);
        var c5 = x.insertCell(4);
        c1.innerHTML="";
        c2.innerHTML=data.post.depname;
        c2.setAttribute('name','depname');
        c3.innerHTML=data.post.year;
        c3.setAttribute('name','year');
        c4.innerHTML=data.post.month;
        c4.setAttribute('name','month');
        c5.innerHTML='<input type="hidden" name="recordId" value="'+data.post._id+'"><button data-toggle="modal" data-target="#editModal" data-whatever="'+[data.post._id, data.post.depname, data.post.year, data.post.month]+'" onclick="returnRowToEdit(this)">Edit</button><button id ="sample" data-toggle="modal" data-target="#exampleModal" data-whatever="'+data.post._id+'" onclick="returnRowToDelete(this)">Delete</button>';
        document.getElementById('depname').value = null;
        document.getElementById('year').value = null;
        document.getElementById('month').value = null;
    })
    .catch(err => {
      console.log(err);
    });
}

let nodeElement = null;
let parentNodeElement = null;
returnRowToDelete = (btn) =>{
  const x = btn.parentNode.closest('tr');
  nodeElement = x;
  parentNodeElement = x.parentNode;
  console.log(parentNodeElement)
}

let parentNodeElementEdit = null;
returnRowToEdit = (btn) => {
  const x = btn.parentNode.closest('tr');
  parentNodeElementEdit = x;
}

editData = (btn) => {
  const parent = btn.parentNode;
  const recordId = parent.parentNode.querySelector('[name=id]').value;
  const depname = parent.parentNode.querySelector('[name=depname]').value;
  const year = parent.parentNode.querySelector('[name=year]').value;
  const month = parent.parentNode.querySelector('[name=month]').value;
  let url = "/editedData";
      let method = 'POST'
      fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: recordId,
            depname: depname,
            year: year,
            month: month
        })
    })
    .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Creating or editing a post failed!');
        }
        return res.json();
      })
    .then(data => {
      parentNodeElementEdit.querySelector('[name=year]').innerHTML = year;
      parentNodeElementEdit.querySelector('[name=depname]').innerHTML = depname;
      parentNodeElementEdit.querySelector('[name=month]').innerHTML = month;
    })
      .catch(err => {
        console.log(err);
      });
}

postDelete = (btn)=>{
  const parent = btn.parentNode;
  const recordId = parent.parentNode.querySelector('[name=recipientName]').value
  let url = "/deleted";
      let method = 'POST'
    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: recordId
        })
    })
    .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Creating or editing a post failed!');
        }
        return res.json();
      })
    .then(data => {
      parentNodeElement.removeChild(nodeElement)
    })
      .catch(err => {
        console.log(err);
      });
}