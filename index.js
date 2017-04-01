

var createApp = function(){
    /*
     <label for="width">Room width</label> <input id="width" name="width" value="5">
     <label for="length">Room length</label> <input id="length" name="length" value="5">
     <label for="x">Roomba starting X position</label> <input id="x" name="x" value="0">
     <label for="y">Roomba starting y position</label> <input id="y" name="y" value="0">
     */
    app.init(
        [   document.getElementById('width').value,
            document.getElementById('width').value],
        document.getElementById('num').value,
        [   document.getElementById('x').value,
            document.getElementById('y').value]
    );
};

window.onload = function(e){
    app.init([5,5],3,[1,1]);

    document.getElementById('generate').addEventListener("click", createApp);

    document.getElementById('up').addEventListener("click", function(){app.move('u')});
    document.getElementById('down').addEventListener("click", function(){app.move('d')});
    document.getElementById('left').addEventListener("click", function(){app.move('l')});
    document.getElementById('right').addEventListener("click", function(){app.move('r')});

};