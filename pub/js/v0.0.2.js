/*
*i9LaFramework.js v0.0.2 Last update : 2012/2/5
* _ ___ __        _____                                 _       _
*|_| . |  |   ___|   __|___ ___ _____ ___ _ _ _ ___ ___| |_    |_|___
*| |_  |  |__| .'|   __|  _| .'|     | -_| | | | . |  _| '_|_  | |_ -|
*|_|___|_____|__,|__|  |_| |__,|_|_|_|___|_____|___|_| |_,_|_|_| |___|
*                                                            |___|
*Copyright (C) 2011-2012 i9LaWORKS, http://www.i9la.com/
*/

var $en={
    /*
    *encode NumX
    * from2012/2/1 last2012/2/1
    * str(example)=(0,0,0,1,1,1,0);
    * return encode result
     */
    En:function(str){ //0,0,0... -> 0xnum
        var str;
        var result = new Array();
        var i;
        this.str = str;
        this.result = result;

        for(i=0;i<str.length;i++){
            var aa = new Array(2);
            aa[0] = str[i] + "x";
            aa[1] = 1;
            while(str[i] == str[1 + i]){
                aa[1] += 1;
                str.shift();
            }
            var joinStr = aa[0] + aa[1];
            result.push(joinStr);
            //alert(result);
        }
        //alert(result); //q-fix
        return result;
    },
    /*
    *decode NumX
    * from2012/2/1 last2012/2/1
    * str(example)=("0x4,"1x4","0x1");
    * return decode result
     */
    De:function(str){ //0xnum -> 0,0,0....
        var str;
        var result = new Array();
        var i,j;
        this.str = str;
        this.result = result;

        var count = 0;
        var arCount = str.length; //because decrease ar.length
        for(i=0;i<arCount;i++){
            var String = str.shift(); //cut from head
            var aa = new Array(2);
            aa = String.split("x");
            for(j=0;j<aa[1];j++){
                result[count] = aa[0];
                count +=1;
            }
            //alert(result);
        }
        //alert(result);
        return result;
    }
}

/*
 *ls=LocalStorage
 */

//var $ls={
    /*
     *$ls:LocalStorage
     * from2012/2/1 last2012/2/2
     * return localstorage object
     */
    //Set:function(key,val){
        //var key;
        //var val;
       // this.key = key;
       // this.val = val;
        //return localStorage.setItem(key,val);
    //},
    //Get:function(key){
        //var key;
       // this.key = key;
        //return localStorage.getItem(key);
    //},
    //Remov:function(key){
        //var key;
        //this.key = key;
        //return localStorage.removeItem(key);
    //},
    //Clear:function(){
       // localStorage.clear();
    //}
//}



/*
*mk=Make
 */
var $mk={

    /*
    *$mk.Tbl:make standard table object
    * from:2011/12/15/last:2012/2/1
    * return
    * x:number of row
    * y:number of line(only tbody)
     */

    Tbl:function(x,y){
        var i,j;
        //var fig = 0;
        this.x = x;
        this.y = y;

        var body = document.getElementsByTagName("body")[0];
        var table = document.createElement("table");
        var thead = document.createElement("thead");
        var tbody = document.createElement("tbody");

        /*
        *table_head
         */
        var row_head = document.createElement("tr");
        for(i=0;i<x;i++){
            var cell_head = document.createElement("td");
            cell_head = document.createElement("td");
            if(i != 0){ //except zero
           var cellText = document.createTextNode(i);
            cell_head.className = "td_head";
           cell_head.appendChild(cellText);
            }
           row_head.appendChild(cell_head);
        }
       thead.appendChild(row_head);

        /*
        *table_body
         */
        for(j=0;j<y;j++){
            var row_body = document.createElement("tr");
            for(i=0;i<x;i++){
                var cell_body = document.createElement("td");
                if(i == 0){
                    var cellText = document.createTextNode(j);
                    cell_body.className = "td_body";
                    cell_body.appendChild(cellText);
                }else{
                     var cellText = document.createTextNode(i);
                    cell_body.appendChild(cellText);
                }
                row_body.appendChild(cell_body);
            }
            tbody.appendChild(row_body);
        }

        table.setAttribute("border","2");
        table.appendChild(thead);
        table.appendChild(tbody);
        body.appendChild(table);

        return this;
    },

    /*
    *$mk.Tbl:make standard table with foot
    * from:2011/12/15/last:2012/2/1
    * return
    * x:number of row
    * y:number of line(only tbody)
    * z:number of row(foot)
     */
    Tbl2:function(x,y,z){
            var i,j;
            //var fig = 0;
            this.x = x;
            this.y = y;
            this.z = z;

            var body = document.getElementsByTagName("body")[0];
            var table = document.createElement("table");
            var thead = document.createElement("thead");
            var tfoot = document.createElement("tfoot");
            var tbody = document.createElement("tbody");

            /*
            *table_head
             */
            var row_head = document.createElement("tr");
            for(i=0;i<x;i++){
                var cell_head = document.createElement("td");
                cell_head = document.createElement("td");
                if(i != 0){ //except zero
               var cellText = document.createTextNode(i);
                cell_head.className = "td_head";
               cell_head.appendChild(cellText);
                }
               row_head.appendChild(cell_head);
            }
           thead.appendChild(row_head);

            /*
            *table_foot
             */
            var row_foot = document.createElement("tr");
            for(i=0;i<z;i++){
                var cell_foot = document.createElement("td");
                var cellText = document.createTextNode(i);
                cell_foot.appendChild(cellText);
                row_foot.appendChild(cell_foot);
            }
            tfoot.className = "td_foot";
            tfoot.appendChild(row_foot);

            /*
            *table_body
             */
            for(j=0;j<y;j++){
                var row_body = document.createElement("tr");
                for(i=0;i<x;i++){
                    var cell_body = document.createElement("td");
                    if(i == 0){
                        var cellText = document.createTextNode(j);
                        cell_body.className = "td_body";
                        cell_body.appendChild(cellText);
                    }else{
                         var cellText = document.createTextNode(i);
                        cell_body.appendChild(cellText);
                    }
                    row_body.appendChild(cell_body);
                }
                tbody.appendChild(row_body);
            }

            table.setAttribute("border","2");
            table.appendChild(thead);
            table.appendChild(tfoot);
            table.appendChild(tbody);
            body.appendChild(table);

            return this;
    }
}
