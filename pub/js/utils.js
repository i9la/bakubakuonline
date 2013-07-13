var $en = {
  /* 0xnum -> 0,0,0... */
  De:function(str) {
    var str,i,j;
    var result = new Array();
    this.str = str;
    this.result = result;

    var count = 0;
    var arCount = str.length;
    for(i=0;i<arCount;i++){
      var String = str.shift();
      var aa = new Array(2);
      aa = String.split('x');
      for(j=0;j<aa[1];j++){
        result[count] == aa[0];
        count += 1;
      }
    }
    return result;
  }
}
