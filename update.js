var tab = require("./data.json");
const fs = require('fs');
const electron = require("electron")
const ipc = electron.ipcRenderer

var m = []
var f = []
{
m.push(document.getElementById("m-Neck"))
m.push(document.getElementById("sdm-Neck"))

m.push(document.getElementById("m-Trochenta"))
m.push(document.getElementById("sdm-Trochenta"))

m.push(document.getElementById("m-Intertrochenta"))
m.push(document.getElementById("sdm-Intertrochenta"))

m.push(document.getElementById("m-Hip"))
m.push(document.getElementById("sdm-Hip"))

m.push(document.getElementById("m-1/3"))
m.push(document.getElementById("sdm-1/3"))

m.push(document.getElementById("m-Mid"))
m.push(document.getElementById("sdm-Mid"))

m.push(document.getElementById("m-UD"))
m.push(document.getElementById("sdm-UD"))

m.push(document.getElementById("m-Forearm"))
m.push(document.getElementById("sdm-Forearm"))

m.push(document.getElementById("m-L1"))
m.push(document.getElementById("sdm-L1"))

m.push(document.getElementById("m-L2"))
m.push(document.getElementById("sdm-L2"))

m.push(document.getElementById("m-L3"))
m.push(document.getElementById("sdm-L3"))

m.push(document.getElementById("m-L4"))
m.push(document.getElementById("sdm-L4"))

m.push(document.getElementById("m-Spine"))
m.push(document.getElementById("sdm-Spine"))

m.push(document.getElementById("m-Wholebody"))
m.push(document.getElementById("sdm-Wholebody"))


f.push(document.getElementById("f-Neck"))
f.push(document.getElementById("sdf-Neck"))

f.push(document.getElementById("f-Trochenta"))
f.push(document.getElementById("sdf-Trochenta"))

f.push(document.getElementById("f-Intertrochenta"))
f.push(document.getElementById("sdf-Intertrochenta"))

f.push(document.getElementById("f-Hip"))
f.push(document.getElementById("sdf-Hip"))

f.push(document.getElementById("f-1/3"))
f.push(document.getElementById("sdf-1/3"))

f.push(document.getElementById("f-Mid"))
f.push(document.getElementById("sdf-Mid"))

f.push(document.getElementById("f-UD"))
f.push(document.getElementById("sdf-UD"))

f.push(document.getElementById("f-Forearm"))
f.push(document.getElementById("sdf-Forearm"))

f.push(document.getElementById("f-L1"))
f.push(document.getElementById("sdf-L1"))

f.push(document.getElementById("f-L2"))
f.push(document.getElementById("sdf-L2"))

f.push(document.getElementById("f-L3"))
f.push(document.getElementById("sdf-L3"))

f.push(document.getElementById("f-L4"))
f.push(document.getElementById("sdf-L4"))

f.push(document.getElementById("f-Spine"))
f.push(document.getElementById("sdf-Spine"))

f.push(document.getElementById("f-Wholebody"))
f.push(document.getElementById("sdf-Wholebody"))
}

function writeper()
{
    fs.writeFile("./data.json", JSON.stringify(tab), function writeJSON(err) {
        if (err) return console.log(err);
      });
}


{
    var option = []
    let cnt = 0
    var myParent = document.getElementById("radio")
    var br = document.createElement("br");
    br.style.display = "none"
    var selectList = document.createElement("select");
    selectList.style.display = "none"
    selectList.id = "catselect";
    myParent.appendChild(br);
    myParent.appendChild(selectList);

    for(let i = 0; i<tab.length; i+= 2)
    {
        let obj = tab[i];
        let cat1 = obj.category;
        console.log(cat1)
        if(cat1 != "India")
        {
            option.push(document.createElement("option"))
            option[cnt].value = cat1;
            option[cnt].text = cat1;
            option[cnt].style.display = "none"
            selectList.appendChild(option[cnt]);
            cnt = cnt +1;
        }
    }
    var butdel = document.createElement("button")
    butdel.id = "butdel"
    butdel.innerHTML = "DELETE!"
    butdel.style.display = "none"
    myParent.appendChild(butdel);

}

{
var sub = document.getElementById("sub")
var sub1 = document.getElementById("sub1")

var cat = document.getElementById("category")
var add = document.getElementById("modea")
var upd = document.getElementById("modeu")
var del = document.getElementById("moded")
}

function getinp(catif = "")
{
        var newdatam = {}
        var newdataf = {}
        newdatam["sex"] = "m"
        newdataf["sex"] = "f"

        console.log(catif)

        if(cat.value != "")
        {
            newdatam["category"] = cat.value
            newdataf["category"] = cat.value
        }
        else if(catif != "")
        {
            newdatam["category"] = catif
            newdataf["category"] = catif
        }
        else
        {
            ipc.send("errdialog")
            return
        }

        for(var i = 0; i<m.length; i+=2)
        {
            var tempm = m[i].value
            var sdtempm = m[i+1].value
            var tempf = f[i].value
            var sdtempf = f[i+1].value
            console.log(f[i].id)
            console.log(f[i+1].id)
            if(tempm === "" || tempf === "" || sdtempf ==="" || sdtempm === "")
            {
                ipc.send("errdialog")
                return
            }
            var injm = {}
            var injf = {}
            injm["bmd"] = tempm
            injm["sd"] = sdtempm
            injf["bmd"] = tempf
            injf["sd"] = sdtempf
            newdatam[m[i].name] = injm
            newdataf[m[i].name] = injf
        }
        tab.push(newdatam)
        tab.push(newdataf)
        console.log(tab)
        writeper()
        window.location.reload();
}

sub.addEventListener("click", function(){
    getinp();
})

add.addEventListener("click", function(){
    document.getElementById("Hidden").style.display = "block";
    document.getElementById("category1").style.display = "block"
    sub1.style.display = "none"
    sub.style.display = "block"


    br.style.display = "none"
    selectList.style.display = "none"
    butdel.style.display = "none"
    for(let i = 0; i<option.length; i++)
        option[i].style.display = "none"

    

})

sub1.addEventListener("click", function(){
    var curcat = document.querySelector('#catselect');
    var tempm = -1, tempf = -1;
    for(let i = 0; i<tab.length; i++)
    {
        var temp = tab[i]
        console.log(temp.category)
        if(temp.category === curcat.value)
        {
            console.log(temp.sex)
            if(temp.sex ==="m")
                tempm = i;
            if(temp.sex ==="f")
                tempf = i;
        }
    }
    console.log(tempm, tempf)
    console.log(tab)
    // if(tempm != -1)
    //     var a = tab.splice(tempm, 1)
    // if(tempf != -1)
    //     var b = tab.splice(tempf, 1)
    
    tab = tab.filter(function(value, index, arr){ 
        return  (index != tempm && index != tempf);
    });

    console.log(tab)    
    console.log(curcat.value === "")

    getinp(curcat.value);
})

upd.addEventListener("click", function(){

    butdel.style.display = "none"
    document.getElementById("category1").style.display = "none"
    br.style.display = "block"
    selectList.style.display = "block"
    for(let i = 0; i<option.length; i++)
        option[i].style.display = "block"
    
    document.getElementById("Hidden").style.display = "block";
    sub.style.display = "none"
    sub1.style.display = "block"

})

butdel.addEventListener("click", function(){

    var curcat = document.querySelector('#catselect');
    var tempm = -1, tempf = -1;
    for(let i = 0; i<tab.length; i++)
    {
        var temp = tab[i]
        if(temp.category === curcat.value)
        {
            if(temp.sex ==="m")
                tempm = i;
            else
                tempf = i;
        }
    }
    console.log(tab)
    // if(tempm != -1)
    //     tab.splice(tempm, 1)
    // if(tempf != -1)
    //     tab.splice(tempf, 1)
    
    tab = tab.filter(function(value, index, arr){ 
        return  (index != tempm && index != tempf);
    });
    console.log(tab)
    writeper()
    window.location.reload();
})

del.addEventListener("click", function(){
    document.getElementById("Hidden").style.display = "none";
    br.style.display = "block"
    selectList.style.display = "block"
    for(let i = 0; i<option.length; i++)
        option[i].style.display = "block"
    butdel.style.display = "block"
    
})