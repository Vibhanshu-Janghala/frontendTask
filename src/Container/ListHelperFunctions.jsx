export const generateId = (indexArr) => {
    let result = "";
    const genStrId = (num) => {
        if (num === undefined) {
            return "---";
        }
        let strNum = "" + num;
        if (strNum.length === 1) {
            return "00" + strNum;
        } else if (strNum.length === 2) {
            return "0" + strNum
        } else {
            return strNum;
        }
    }
    for (let i = 0; i < 3; i++) {
        result = result + genStrId(indexArr[i]);
    }
    return result;
}
export const getArray = (strId)=>{
    let arr = [];
    for(let i=0 ; i <9 ; i = i+3){
        if(strId.substring(i,i+3)=== "---"){
            return arr;
        }
        else{
            arr.push(parseInt(strId.substring(i,i+3)));
        }
    }
    return arr;
}
export const canDrop = (dragIndex,dropIndex)=>{
    let dragArr = getArray(dragIndex);
    let dropArr = getArray(dropIndex);
    if(dragArr.length === 3 && (dropArr.length === 3 || dropArr.length ===2)){
        return [dragArr,dropArr] ;
    }
    else if(dragArr.length === 2 && (dropArr.length === 1 || dropArr.length === 2)){
        return [dragArr,dropArr] ;
    }
    else if(dragArr.length === 1 &&  dropArr.length === 1){
        return [dragArr,dropArr] ;
    }
    else{
        return false ;
    }
}
