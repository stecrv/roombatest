var Roomba = {
    x: 0,
    y: 0,
    init: function (coords) {
        this.setPos(coords);
    },
    setPos: function (coords) {
        this.x = coords[0];
        this.y = coords[1];
    },
    getPos: function () {
        return [this.x,this.y];
    },
    move: function (movement) {
        switch (movement) {
            case 'u':
                this.x++;
                break;
            case 'l':
                this.y--;
                break;
            case 'r':
                this.y++;
                break;
            case 'd':
                this.x--;
                break;
        }
    }
};

var Room ={
    w : 5,
    l : 5,
    debris: [],
    roomba: null,
    init: function (size, numDebris) {
        this.setSize(size);
        this.setDebris(numDebris);
    },
    setSize: function (coords) {
        this.w = coords[0];
        this.l = coords[1];
    },
    getSize: function(){
        return [this.w, this.l];
    },
    setDebris: function (num){
        this.debris=[];
        for(var i=0; i<=num; i++){
            this.debris.push([this.getRandomInt(0,this.w),this.getRandomInt(0,this.l)]);
        }
    },
    getRandomInt: function(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

};

var roomba = Roomba;
var room = Room;

var App = {
    roomba : null,
    room: null,
    elId: 'room',
    init: function(size, numBedris, startingCoord){
        this.roomba = roomba;
        this.room = room;
        this.room.init(size,numBedris);
        if(!this.checkBoundaries(size,startingCoord)){
            startingCoord = [0,0]
        };
        this.roomba.init(startingCoord);
        this.draw();
    },
    checkBoundaries:function(dim,pos){
        return (pos[0]>=dim[0] || pos[1]>=dim[1] || pos[0]<0 || pos[1]<0) ? false : true;
    },
    isSamePos: function(el1, el2){
        return (el1[0]==el2[0] && el1[1]==el2[1])? true :  false;
    },
    draw:function(){
        var _this = this;

        var pos = roomba.getPos();
        var debris = room.debris;

        var layout = [];
        var row = [];
        for(var a = 0; a<room.w; a++){
            row = [];
            for(var b = 0; b<room.l; b++){

                    var l = 'O';
                    if(debris.length>0) {
                        debris.forEach(function (element, index, o) {
                            if (_this.isSamePos(element, [a, b])) {
                                l = 'X';
                            }
                            if (_this.isSamePos(element, pos)) {
                                l = 'O'; //remove debris
                                o.splice(index, 1);
                            }
                        });
                    }
                    if(_this.isSamePos(pos, [a,b])){
                        l = 'R';
                    };
                    row.push(l);

            }
            layout.push(row);
        }
        this.handleHtml(this.show(layout));
    },
    show: function(layout){
        var html = '';
        layout.forEach(function(row) {
            row.forEach(function(cell) {
                html += cell;
            });
            html += '<br/>';
        });
        return html;
    },
    handleHtml: function (html) {
        document.getElementById(this.elId).innerHTML=html;
    },
    move: function (direction) {
        var p = roomba.getPos()
        switch (direction) {
            case 'u':
                p[0]--;
                break;
            case 'l':
                p[1]--;
                break;
            case 'r':
                p[1]++;
                break;
            case 'd':
                p[0]++;
                break;
        }
        if(this.checkBoundaries(room.getSize(),p)){
            this.roomba.setPos(p);
            this.draw();
        }
    }
};

var app = App;