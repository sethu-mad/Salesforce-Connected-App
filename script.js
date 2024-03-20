document.addEventListener('DOMContentLoaded', function(){
    setInterval(updateTime, 1000);
});

function updateTime(){
    var currentTimeElement = document.getElementById('currentTime');
    var currentTime = new Date();
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    var seconds = currentTime.getSeconds();
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    var timeString = hours + ':' + minutes + ':' + seconds;
    currentTimeElement.textContent = 'Time: ' + timeString;
}
document.getElementById("dropdown").addEventListener("change", fetchPrice);
function fetchPrice(value){
    var record = Salesforce.query("SELECT Price__c FROM Product__c WHERE Name = ?", value);
    var price = record.Price__c;
    document.getElementById("price").innerHTML = price;
}

const clientId = '3MVG9pRzvMkjMb6k9OhdYQR2C7XvOue74KBDmZmwueO0fUgNavCr0iHx64koag.mJNj51rZMMMFbK1y2v5Wgn';
const clientSecret = '688E97D1A19C44D8BB640F861EA6C6617E132C0CEC5C87042B9F1C2B25FC18A6';
const userName = 'sethu@demoorg.com';
const password = 'Love@Demo14';
const securityToken = 'ANRS6Mrx87MFWFihieAnCNJp3';

const loginURL = 'https://login.salesforce.com/services/oauth2/token';
const apiURL = 'https://AP27.salesforce.com/services/data/v59.0/query?q=SELECT+Id,Name+FROM+Account';
fetch(loginURL,{
    method: 'GET',
    headers: {
        'Content-Type':'application/x-www-form-urlencoded'
    },
    body:
    'grant_type=password&client_id=$(clientId)&client_secret=$(clientSecret)&username=$(userName)&password=$(password)$(securityToken)'
})
.then(response => response.json())
.then(data => {
    const accountList = document.getElementById('accountList');
    data.records.forEach(account => {
        const listItem = document.createElement('li');
        listItem.textContent = '${account.Name} (ID: ${account.Id})';
        accountList.appendChild(listItem);
    });
})
.catch(error => console.error('Error: ', error));