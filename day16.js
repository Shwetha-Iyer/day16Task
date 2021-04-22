function createTag(element,elementClass="",elementID=""){
    var tag = document.createElement(element);
    if(elementClass !== "")
    tag.setAttribute("class",elementClass);
    if(elementID !== "")
    tag.setAttribute("id",elementID);
    return tag;
}
var div1 = document.getElementById("div1");
var divpost = document.getElementById("divposts");
var modalclick = document.getElementById("modal-click");
async function callapi(){
    try{
        var resp = await fetch("https://60746f03066e7e0017e79e59.mockapi.io/Details");
        var data = await resp.json();
        window.datalength = data.length;
        displayPosts(data);
    }
    catch(error){
        console.log(error);
    }
}
var container = createTag("div","container");
container.setAttribute("style","font-family:Consolas;");
var row = createTag("div","row","rowz");
container.innerHTML = "<h3 style='color:white;'> Latest Posts </h3> <br>";

function displayPosts(data) {
    row.innerHTML ="";
    for(var i=data.length-1;i>=0;i--){
        var col = createTag("div","col-md-3");
        col.setAttribute("style","margin-top:20px; margin-bottom:10px;");
        var cardgroup = createTag("div","card-group h-100");
        var card = createTag("div","card",data[i].id);
        card.setAttribute("style","background-color:black;border: 2px solid rgb(76, 173, 76);padding:5px;");
        card.addEventListener("click",post);
        var cardbody = createTag("div","card-body");
        var cardtitle = createTag("h5","card-title");
        cardtitle.setAttribute("style","padding:10px;")
        cardtitle.innerText = data[i].title;
        var cardtext = createTag("p","card-text");
        cardtext.setAttribute("style","font-size:15px;padding:10px;")
        cardtext.innerText = data[i].query;
        var cardfoot = createTag("div","card-footer");
        var create = createTag("small");
        create.setAttribute("style","color:white;");
        create.innerText = `Created By ${data[i].name}`;
        cardfoot.append(create);
        cardbody.append(cardtitle,cardtext);
        card.append(cardbody,cardfoot);
        cardgroup.append(card);
        col.append(cardgroup);
        row.append(col);
        container.append(row);
        divpost.append(container);
    }
}
async function createPost(){
    var name = document.getElementById("name").value;
    var password = document.getElementById("password").value;
    var title = document.getElementById("title").value;
    var query = document.getElementById("query").value;
    document.getElementById("myform").reset();
    if(name&&password&&title&&query){
        window.datalength++;
        var str = {name:`${name}`,password:`${password}`,title:`${title}`,query:`${query}`,comment:[]};
        fetch("https://60746f03066e7e0017e79e59.mockapi.io/Details", {
            method: "POST",
            body: JSON.stringify(str),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          })
            .then((resp) => resp.json())
            .then((result) => {
                callapi();
            })
            .catch((err) => console.log(err));
    }
    else{
        alert("Post not created! Please fill in all the values in the form.");
    }
}
async function post(idd=""){
    document.body.innerHTML ="";
    var id;
    if(Number(idd))
    id=idd;
    else
    id=this.id;
    var resp = await fetch(`https://60746f03066e7e0017e79e59.mockapi.io/Details/${id}`);
    var data = await resp.json();
    window.datas = data;
    var div = createTag("div");
    div.setAttribute("style","padding:100px; justify-contents:center;text-align:center;");
    var h1 = createTag("h1");
    h1.setAttribute("style","font-size:50px;");
    var icon = createTag("i","bi bi-arrow-left-square");
    icon.innerText = `  ${data.title}`;
    icon.addEventListener("click",home);
    h1.append(icon);
    div.append(h1);
    var div2 = createTag("div");
    div2.setAttribute("style","justify-contents:center;");
    var col = createTag("div","col-12");
    col.setAttribute("style","width:80%;margin-left:auto; margin-right:auto;");
    var card = createTag("div","card");
    card.setAttribute("style","background-color:black; border: 2px solid rgb(76, 173, 76); margin-bottom:30px;");
    var p = createTag("p");
    p.setAttribute("style","padding:20px;");
    p.innerText = data.query;
    var cardfooter = createTag("div","card-footer");
    cardfooter.setAttribute("style","color:white;");
    cardfooter.innerText = `Created By ${data.name}`;
    card.append(p,cardfooter);
    var button1 = createTag("button","btn btn-success");
    button1.setAttribute("type","button");
    button1.setAttribute("style","margin-left:20px;");
    button1.setAttribute("data-toggle","modal");
    button1.setAttribute("data-target","#modal-addcomm");
    button1.innerText = "Add Comment";
    var button2 = createTag("button","btn btn-danger");
    button2.setAttribute("type","button",id);
    button2.setAttribute("style","margin-left:40px;");
    button2.setAttribute("data-toggle","modal");
    button2.setAttribute("data-target","#modal-deletepost");
    button2.innerText = "Delete Post";
    col.append(card, button1,button2);
    div2.append(col);
   // addComment dialog box 
        let modal = createTag("div","modal","modal-addcomm");
        modal.setAttribute("tabindex","-1");
        modal.setAttribute("data-backdrop","static");
        modal.setAttribute("data-keyboard","false");
        let modaldialog = createTag("div","modal-dialog");
        let modalcontent = createTag("div","modal-content");
        modalcontent.setAttribute("style","background-color: black; border: 1px solid rgb(76, 173, 76);");
        let modalheader = createTag("div","modal-header");
        let modaltitle = createTag("h4","modal-title");
        modaltitle.innerText = "Add your comment";
        modalheader.append(modaltitle);
        let modalbody = createTag("div","modal-body");
        let form = createTag("form","","myform1");
        let label1 = createTag("label");
        label1.setAttribute("for","commentname");
        label1.setAttribute("style","font-size: 20px; padding: 10px;");
        label1.innerText = "Name";
        let input1 = createTag("input","form-control","commentname");
        input1.setAttribute("type","text");
        let label2 = createTag("label");
        label2.setAttribute("for","comment");
        label2.setAttribute("style","font-size: 20px; padding: 10px;");
        label2.innerText = "Comment";
        let textarea = createTag("textarea","form-control","comment");
        textarea.setAttribute("rows","5");
        textarea.setAttribute("style","padding: 10px;");
        form.append(label1,input1,label2,textarea);
        modalbody.append(form);
        let modalfooter = createTag("div","modal-footer");
        modalfooter.setAttribute("style","justify-content:center;");
        let addcom = createTag("button","btn btn-success",id);
        addcom.setAttribute("data-dismiss","modal");
        addcom.setAttribute("type","button");
        addcom.addEventListener("click",addComment);
        addcom.innerText = "Add Comment";
        let close = createTag("button","btn btn-danger");
        close.setAttribute("data-dismiss","modal");
        close.setAttribute("type","button");
        close.innerText = "Cancel";
        modalfooter.append(addcom,close);
        modalcontent.append(modalheader,modalbody,modalfooter);
        modaldialog.append(modalcontent);
        modal.append(modaldialog);
        // delete post modal
        //===========================
        let modal1 = createTag("div","modal","modal-deletepost");
        modal1.setAttribute("tabindex","-1");
        modal1.setAttribute("data-backdrop","static");
        modal1.setAttribute("data-keyboard","false");
        let modaldialog1 = createTag("div","modal-dialog");
        let modalcontent1 = createTag("div","modal-content");
        modalcontent1.setAttribute("style","background-color: black; border: 1px solid rgb(76, 173, 76);");
        let modalheader1 = createTag("div","modal-header");
        let modaltitle1 = createTag("h4","modal-title");
        modaltitle1.innerText = "Do you want to delete your post?";
        modalheader1.append(modaltitle1);
        let modalbody1 = createTag("div","modal-body");
        let form1 = createTag("form","","myform2");
        let label3 = createTag("label");
        label3.setAttribute("for","pass");
        label3.setAttribute("style","font-size: 20px; padding: 10px;");
        label3.innerText = "Enter your password";
        let input2 = createTag("input","form-control","pass");
        input2.setAttribute("type","password");
        form1.append(label3,input2);
        modalbody1.append(form1);
        let modalfooter1 = createTag("div","modal-footer");
        modalfooter1.setAttribute("style","justify-content:center;");
        let delpost= createTag("button","btn btn-success",this.id);
        delpost.setAttribute("data-dismiss","modal");
        delpost.setAttribute("type","button");
        delpost.addEventListener("click",deletePost);
        delpost.innerText = "Delete";
        let close1 = createTag("button","btn btn-danger");
        close1.setAttribute("data-dismiss","modal");
        close1.setAttribute("type","button");
        close1.innerText = "Cancel";
        modalfooter1.append(delpost,close1);
        modalcontent1.append(modalheader1,modalbody1,modalfooter1);
        modaldialog1.append(modalcontent1);
        modal1.append(modaldialog1);
        if(data.comment.length!==0){
            var showcomments = createTag("div","col-12");
            let ptitle = createTag("p");
            ptitle.setAttribute("style","color:white; font-size:30px; margin-top:20px;");
            ptitle.innerText ="Comments";
            let table = createTag("table","table");
            table.setAttribute("style","border: 2px solid rgb(76, 173, 76);");
            for(let i=0;i<data.comment.length;i++){
                let tr = createTag("tr");
                tr.setAttribute("style","border: 2px solid rgb(76, 173, 76);");
                let td = createTag("td");
                let h4 = createTag("h6");
                h4.setAttribute("style","color:rgb(76, 173, 76);");
                h4.innerText = data.comment[i].comment;
                let p = createTag("p");
                p.setAttribute("style","color:white;");
                p.innerText = `Commented By ${data.comment[i].name}`;
                td.append(h4,p);
                tr.append(td);
                table.append(tr);
            }
            showcomments.append(ptitle,table);
            col.append(showcomments);
            div2.append(col);
        }
        document.body.append(div,div2,modal,modal1);
}
function deletePost(){
    var pass = document.getElementById("pass").value;
    fetch("https://60746f03066e7e0017e79e59.mockapi.io/Details/" + `${this.id}`)
    .then((resp) => resp.json())
    .then((result) => {
        if(result.password === pass){
            fetch("https://60746f03066e7e0017e79e59.mockapi.io/Details/"+ `${this.id}`, {
                method: "DELETE",
              })
                .then((resp) => resp.json())
                .then((result) => {
                    home();
                })
                .catch((err) => console.log(err));
        }
        else{
            document.getElementById("myform2").reset();
            alert("Wrong Password! Post not deleted");
        }
        
    })
    .catch((err) => console.log(err));
}
function addComment(){
    let name = document.getElementById("commentname").value;
    let comment =  document.getElementById("comment").value;
    document.getElementById("myform1").reset();
    let obj = {name: `${name}`,comment:`${comment}`};
    window.datas.comment.push(obj);
        fetch("https://60746f03066e7e0017e79e59.mockapi.io/Details/" + `${this.id}`, {
            method: "PUT",
            body: JSON.stringify(window.datas),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          })
            .then((resp) => resp.json())
            .then((result) => {
                post(this.id);
            })
            .catch((err) => console.log(err));
}
function home(){
    document.body.innerHTML ="";
    document.body.append(div1,modalclick,divpost);
    callapi();
}
