var $utils = {};

$utils.deepCopy = function(_old){
  var _new;
  switch(typeof _old){
    case "undefined":
      break;
    case "string":
      _new = _old + "";
      break;
    case "number":
      _new = _old + 0;
      break;
    case "boolean":
      _new = _old;
      break;
    case "object":
      if(_old === null){
        _new = null;
      }
      else{
        if(Object.prototype.toString.call(_old).slice(8, 13) === "Array"){
          _new = [];
          for(let i=0;i<_old.length;i++){
            _new.push($utils.deepCopy(_old[i]));
          }
        }
        else{
          _new = {};
          for(var k in _old){
            /* check if it is on its on object prototype rather than object itself */
            if(_old.hasOwnProperty(k)){
              _new[k] = $utils.deepCopy(_old[k]);
            }
          }
        }
      }
      break;
    default:
      _new = _old;
      break;
  }
  return _new;
};

$utils.omitObjByNullEmptyUndefined = function(obj) {
  var _obj = {};
  for(var k in obj){
    if(obj.hasOwnProperty(k)){
      if(obj[k] !== null && ((typeof obj[k] !== "string") || (obj[k].replace(/(^\s*)|(\s*$)/g, "") !== "")) && obj[k] !== undefined){
        _obj[k] = obj[k];
      }
    }
  }
  return _obj;
};

$utils.trim = function (str) {
  return str.replace(/(^\s*)|(\s*$)/g, "");
};

$utils.formatDate = function(rawDate, format) {
  var _date = new Date(rawDate);
  var __Y = _date.getFullYear(), __M = _date.getMonth() + 1, __D = _date.getDate();
  var __H = _date.getHours(), __m = _date.getMinutes(), __s = _date.getSeconds();
  /* add possible pre 0 */
  var preM = (__M > 9)?__M.toString():("0" + __M.toString());
  var preD = (__D > 9)?__D.toString():("0" + __D.toString());
  var preH = (__H > 9)?__H.toString():("0" + __H.toString());
  var prem = (__m > 9)?__m.toString():("0" + __m.toString());
  var pres = (__s > 9)?__s.toString():("0" + __s.toString());
  var formatted;
  switch(format){
    case "YYYY-MM-DD HH:mm:ss":
      formatted = __Y + "-" + preM + "-" + preD + " " + preH + ":" + prem + ":" + pres;
      break;
    case "YYYY-MM-DD":
      formatted = __Y + "-" + preM + "-" + preD;
      break;
    default:
      formatted = __Y + "-" + preM + "-" + preD;
      break;
  }
  return formatted;
};

export {
  $utils
}
