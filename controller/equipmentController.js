document.addEventListener('DOMContentLoaded',function (){
    const data = ["Metal","Plastic","Machinary"]
    const selectType = document.getElementById("type_E");
    data.forEach(equip =>{
        const option = document.createElement("option")
         option.value = equip.toLowerCase();
         option.textContent = equip
        selectType.append(option)
    })
})
document.addEventListener('DOMContentLoaded',function (){
    const data = ["Good Condition","Medium Condition","Bad Condition"]
    const selectType = document.getElementById("status_E");
    data.forEach(status =>{
        const option = document.createElement("option")
         option.value = status.toLowerCase();
         option.textContent = status
        selectType.append(option)
    })
})

document.getElementById("resetBtn_E").addEventListener('click',function (){
   resettext();
});

function resettext(){
    document.getElementById('lbl4').textContent="";
    document.getElementById('equip_E').value="";
    document.getElementById('type_E').value="";
    document.getElementById('status_E').value="";
}

document.getElementById("addBtn_E").addEventListener("click",function (){

   const id=document.getElementById('lbl4').textContent;
   const equipName=document.getElementById('equip_E').value;
   const type=document.getElementById('type_E').value;
   const status=document.getElementById('status_E').value;

    console.log(id, equipName, type, status);

    
});