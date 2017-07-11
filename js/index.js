 var map;

 $(document).ready(function(){

    if(window.localStorage.getItem("txtToSave") != null)
      $("#txtToSave").val(window.localStorage.getItem("txtToSave"));



        function onSuccess(acceleration) {

          var newX = Math.floor((acceleration.x+10)*255/20);
          var newY = Math.floor((acceleration.y+10)*255/20);
          var newZ = Math.floor((acceleration.z+10)*255/20);

            $("body").css("background-color","rgb("+newX+","+newY+","+newZ+")")
        }

        function onError() {
            alert('onError!');
        }

        setTimeout(function(){
          //navigator.accelerometer.watchAcceleration(onSuccess, onError,{frequency:500});
        },4000)



        $("#getAccel").on("click",function(){

            function onSuccessClick(acceleration) {
                $("#resultAccel").html("x:"+acceleration.x+"<br>"+
                  "y : "+acceleration.y+"<br>"+
                  "z : "+acceleration.z);
            }

            function onErrorClick() {
                alert('onError!');
            }

            navigator.accelerometer.getCurrentAcceleration(onSuccessClick, onErrorClick);

        })







        $("#getPhoto").on("click",function(){
          function onSuccessPhoto(imageData) {
                var image = document.getElementById('resultPhoto');
                image.src = "data:image/jpeg;base64," + imageData;
                image.style.display = "block";
            }

            function onFailPhoto(message) {
                alert('Failed because: ' + message);
            }
            navigator.camera.getPicture(onSuccessPhoto, onFailPhoto, {
                quality: 50,
                correctOrientation:true,
                destinationType: Camera.DestinationType.DATA_URL
            });


        })

        $("#showMap").on("click",function(){
          var nantes = {lat: 47.218371, lng: -1.553621};
          map = new google.maps.Map(document.getElementById('map'), {
            zoom: 11,
            center: nantes
          });

          var onSuccess = function(position) {
           var marker = new google.maps.Marker({
            position: {lat: position.coords.latitude, lng: position.coords.longitude},
            map: map
          });
        };

        // onError Callback receives a PositionError object
        //
        function onError(error) {
            alert('code: '    + error.code    + '\n' +
                  'message: ' + error.message + '\n');
        }

        navigator.geolocation.getCurrentPosition(onSuccess, onError);



        })



        $("#btnSaveTxt").on("click",function(){
          window.localStorage.setItem("txtToSave",$("#txtToSave").val())
        })

         $("#btnClearTxt").on("click",function(){
          window.localStorage.removeItem("txtToSave")
          $("#txtToSave").val("");
        })

  });