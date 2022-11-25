var tab = require("./data.json")
const electron = require("electron")
const ipc = electron.ipcRenderer




var myParent = document.getElementById("drpdn");
var selectList = document.createElement("select");
selectList.id = "cat";
myParent.appendChild(selectList);


for(let i = 0; i<tab.length; i+= 2)
{
    let obj = tab[i];
    let cat = obj.category;
    console.log(cat)
    var option = document.createElement("option");
    option.id = cat;
    option.value = cat
    option.className = "category-dropdown";
    option.text = cat;
    selectList.appendChild(option);
}

function calculate()
{

    var ele = document.getElementsByName("sex")
    var sex;
    for(var i = 0; i<ele.length; i++)
    {
        if(ele[i].checked)
            {
                sex = ele[i].value;
                break;
            }
    }
    var drp = document.getElementById("drpdn")
    var category = document.querySelector('#cat');
    var q =[]
    q.push(document.getElementById("Neck"))
    q.push(document.getElementById("Trochenta"))
    q.push(document.getElementById("Intertrochenta"))
    q.push(document.getElementById("Hip"))
    q.push(document.getElementById("1/3"))
    q.push(document.getElementById("Mid"))
    q.push(document.getElementById("UD"))
    q.push(document.getElementById("Forearm"))
    q.push(document.getElementById("L1"))
    q.push(document.getElementById("L2"))
    q.push(document.getElementById("L3"))
    q.push(document.getElementById("L4"))
    q.push(document.getElementById("Spine"))
    q.push(document.getElementById("Wholebody"))
    
    var curtab;
    for(let i = 0; i<tab.length; i++)
    {
        if(tab[i].sex === sex && tab[i].category == category.value)
        {
            curtab = tab[i]
            break
        }
    }

    for(var i = 0; i<14; i++)
    {
        var st = "ans"+(i+1)
        var anshtml = document.getElementById(st);
        var qq = q[i]
        if(qq.value === "")
        {
            console.log(qq.value)
            anshtml.innerText = "Value Not given"
            continue
        }
        
        var temp = qq.id
        var fromtab = curtab[temp]
        console.log(qq.value)
        var ans = (qq.value - fromtab.bmd)/fromtab.sd
        
        anshtml.innerText = ans.toFixed(4);

    }

    
}

const subbut = document.getElementById("subbut")

subbut.addEventListener("click", function(){
    const tempsex = document.querySelector( 'input[name="sex"]:checked')
    if(tempsex != null)
        calculate()
    else
        ipc.send("errdialogsex")
})

