window.addEventListener('load',()=>{
    let noteButton = document.getElementById('note-button');

    noteButton.addEventListener('click',()=>{
        let noteText = document.getElementById('note-text').value;
        console.log(noteText)

        let obj ={
            "noteText":noteText
        }

        let jsonData = JSON.stringify(obj);

        fetch('/noteText',{
            method: 'POST',
            headers:{
                "content-type":"application/json"
            },
            body: jsonData
        })
        .then(response=>response.json())
        .then(data=>{console.log(data)})

        displayNotes()
    })
    // document.getElementById('get-notes').addEventListener('click',()=>{
        displayNotes()
    // })
})

const displayNotes =()=>{
    fetch('/getNotes')
    .then(res=>res.json())
    .then(data=> {
        document.getElementById('notes').innerHTML = ''
        console.log(data.data)
        for(let i=0;i<data.data.length;i++){
            let string =  data.data[i].note
            let p = document.createElement('p');
            p.innerHTML = string;
            document.getElementById('notes').appendChild(p)
        }
    })
}