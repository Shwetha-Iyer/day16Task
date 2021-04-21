function createTag(element,elementClass="",elementID=""){
    var tag = document.createElement(element);
    if(elementClass !== "")
    tag.setAttribute("class",elementClass);
    if(elementID !== "")
    tag.setAttribute("id",elementID);
    return tag;
}
async function callapi(){
    console.log("inside api");
    try{
        var resp = await fetch("https://60746f03066e7e0017e79e59.mockapi.io/Details");
        var data = await resp.json();
        console.log(data);
        window.datalength = data.length;
        //return data;
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
    
    var divpost = document.getElementById("divposts");
    divpost.innerHTML ="";
    console.log("inside display posts");
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
        //document.body.append(container);

    }
}


async function createPost(){
    var name = document.getElementById("name").value;
    var password = document.getElementById("password").value;
    var title = document.getElementById("title").value;
    var query = document.getElementById("query").value;
    document.getElementById("myform").reset();
    if(name&&password&&title&&query){
        console.log(name,password,title,query);
        window.datalength++;
        console.log(window.datalength);
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
                console.log(result);
                callapi();
            })
            .catch((err) => console.log(err));
        
    }
    else{
        alert("Post not created! Please fill in all the values in the form.");
    }
}

async function post(){
    console.log("inside post");
    console.log(this);
    var resp = await fetch(`https://60746f03066e7e0017e79e59.mockapi.io/Details/${this.id}`);
    var data = await resp.json();
    console.log(data);

}
