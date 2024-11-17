document.addEventListener('DOMContentLoaded',function (){
    const response = ["Available","Not Avaialable"];
    const responseSelect = document.getElementById("responseType_R")
    response.forEach(reservation =>{
        const option = document.createElement('option')
        option.value = reservation.toLowerCase()
        option.textContent = reservation;
        responseSelect.append(option)
    })
})
document.addEventListener('DOMContentLoaded',function (){
    const reservationType = ["Personal Use","Work","Carraige","Emegenercy"];
    const reservationTypeSelect = document.getElementById("reservationType_R")
    reservationType.forEach(reservationType =>{
        const option = document.createElement('option')
        option.value = reservationType.toLowerCase()
        option.textContent = reservationType;
        reservationTypeSelect.append(option)
    })
})

document.getElementById("addBtn_R").addEventListener('click',function (){
 const staffID = document.getElementById("staffID_R").value;
 const vehicleId = document.getElementById("vehicleID_R").value;
 const reservedDate = document.getElementById("reservedDate_R").value;
 const response = document.getElementById("responseType_R").value;
 const reservationType = document.getElementById("reservationType_R").value;

    console.log(staffID, vehicleId, reservedDate, response, reservationType);
    var formdata = new FormData;
    formdata.append("staffId",staffID);
    formdata.append("vehicleId",vehicleId);
    formdata.append("date",reservedDate);
    formdata.append("response",response);
    formdata.append("reervationtype",reservationType);

    $.ajax({
      url:"",
      type:"POST",
        data:formdata,
      contentType :false,
      processData: false,
      success : function (){
          alert("Vehicle Reservation ADDED")
      },
      error:function (xhr,error,status){
          console.log("Error Details:", {
              xhr: xhr,
              status: status,
              error: error,
              response: xhr.responseText
          });
          alert("Failed to add Reservation. Check console for details.");

      }
    })

});

document.getElementById("resetBtn_R").addEventListener('click',function (){
    document.getElementById("staffID_R").value = "";
    document.getElementById("vehicleID_R").value = "";
     document.getElementById("reservedDate_R").value ="";
    document.getElementById("responseType_R").value = "";
    document.getElementById("reservationType_R").value = "";
    document.getElementById('lbl3').textContent ="";


});