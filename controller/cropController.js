document.addEventListener('DOMContentLoaded',function (){
    const data = ["Cereals","Legumes","Fruits","Corn", "crops"];
    const selectCategory = document.getElementById('category_C');
 data.forEach(crop =>{
     const option = document.createElement("option");
     option.value = crop.toLowerCase();
     option.textContent = crop;
     selectCategory.appendChild(option)
     }
 )
});
document.addEventListener('DOMContentLoaded',function (){
    const data = ["Summer","Autumn","Drought","Rainny"];
    const selectCropSeason = document.getElementById('cropSeason_C');

    data.forEach(season =>{
            const option = document.createElement("option");
            option.value = season.toLowerCase();
            option.textContent = season;
            selectCropSeason.appendChild(option)
        }
    )
});