// START SELECTOR
let title = document.getElementById("title");
let price = document.getElementById("price");
let fees = document.getElementById("fees");
let Ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let quantity = document.getElementById("quantity");
let category = document.getElementById("category");
let btnMode = document.getElementById("create");
let search = document.getElementById("search");
let searchByTitle = document.getElementById("searchByTitle");
let searchByCategory = document.getElementById("searchByCategory");
let delAll = document.getElementById("delAll");
let delPro = document.getElementById("delPro");
let Update = document.getElementById("update");
// END SELECTOR

let Mood = 'Create'
let searchMood = 'title'
let temp;
// Start total Function
function get_total(){
if(price.value !== ''){
total.style.background = 'green'
total.innerHTML = `Total: ${(+price.value + +fees.value + +Ads.value) - + discount.value}`
}
else{
total.style.background = 'darkblue';
total.innerHTML = 'Total : 00:00'
}
}
// End total Function

// Start BtnMode Fuction
let data = [];
if(localStorage.Product == '' || localStorage.Product == null){
data = [];
}
else{
data = JSON.parse(localStorage.Product);
}
btnMode.onclick = ()=>{
if(title.value != '' && price.value != '' && category.value !== ''){
let pro = {
 title: title.value.toLowerCase(),
 price:price.value,
 fees:fees.value,
 Ads:Ads.value,
 discount:discount.value,
 quantity:quantity.value,
 total:total.innerHTML,
 category:category.value.toLowerCase(),
 }
 if(Mood === 'Create'){
    if(pro.quantity > 0 ){
        for(var i =0; i<pro.quantity; i++){
        data.push(pro)
        }
        }else{
        data.push(pro)
        }
 }else{
 data[temp] = pro;
 Mood = 'Create';
 btnMode.innerHTML = 'Create';
 quantity.style.display = 'inline-block';
 category.style.width = '49%'
 }
 localStorage.Product = JSON.stringify(data);
 ClearInputs();
 get_total();
 ShowData();
}
}
// End BtnMode Fuction

// Start ClearInputs Function
function ClearInputs(){
title.value = '';
price.value = '';
fees.value = '';
discount.value = '';
Ads.value = '';
total.innerHTML = '';
quantity.value = '';
category.value = '';
}
// End ClearInputs Function

// Start Show Data Function
function ShowData(){
let table = '';
for(var i=0; i<data.length; i++){
table += 
`<tr>
    <td>${i+1}</td>
    <td>${data[i].title}</td>
    <td>${data[i].price}</td>
    <td>${data[i].discount}</td>
    <td>${data[i].category}</td>
    <td ><button id="update" onclick = "updatePro(${i})">Update</button></td>
    <td ><button id="delPro" onclick = "deletePro(${i})">Delete</button></td>
</tr>
`
}
document.getElementById("tbody").innerHTML = table;
if(data.length > 0){
delAll.innerHTML = `Delete All ( ${data.length} )`
delAll.style.display = 'block'
}
else{
delAll.style.display = 'none'
}

}ShowData();
// End Show Data Function

// Start DelAll Function
delAll.onclick = ()=>{
data.splice(0);
localStorage.Product = JSON.stringify(data);
ShowData();
}
// End DelAll Function

// Start DelPro Function
function deletePro(n){
data.splice(n,1);
localStorage.Product = JSON.stringify(data);
ShowData();
}
// End DelPro Function



// Start Update Function
function updatePro(n){
quantity.style.display = 'none'
category.style.width = '100%'
btnMode.innerHTML = 'Update'
title.value = data[n].title;
price.value = data[n].price;
fees.value = data[n].fees;
Ads.value = data[n].Ads;
discount.value = data[n].discount;
total.innerHTML = data[n].total;
category.value = data[n].category;
get_total();
Mood = 'Update'
scroll({top:0,behavior:"smooth"});
temp = n;
}
// End Update Function


searchByTitle.onclick = ()=>{
searchMood = 'title'
search.placeholder = 'Search By Title'
search.focus();
}
searchByCategory.onclick = ()=>{
searchMood = 'category'
search.placeholder ='Search By Category'
search.focus();
}


// Start Search Function
function SearchPro(value){
if(searchMood === 'title'){
    let table = '';
    for(var i=0; i<data.length; i++){
    if(data[i].title.includes(value.toLowerCase())){
        table += 
        `<tr>
            <td>${i+1}</td>
            <td>${data[i].title}</td>
            <td>${data[i].price}</td>
            <td>${data[i].discount}</td>
            <td>${data[i].category}</td>
            <td ><button id="update" onclick = "updatePro(${i})">Update</button></td>
            <td ><button id="delPro" onclick = "deletePro(${i})">Delete</button></td>
        </tr>
        `
    }
    }document.getElementById("tbody").innerHTML = table;
    
}
else{
    let table = '';
    for(var i=0; i<data.length; i++){
    if(data[i].category.includes(value.toLowerCase())){
        table += 
        `<tr>
            <td>${i+1}</td>
            <td>${data[i].title}</td>
            <td>${data[i].price}</td>
            <td>${data[i].discount}</td>
            <td>${data[i].category}</td>
            <td ><button id="update" onclick = "updatePro(${i})">Update</button></td>
            <td ><button id="delPro" onclick = "deletePro(${i})">Delete</button></td>
        </tr>
        `
    }
    }
    document.getElementById("tbody").innerHTML = table;
}
}
// End Search Function