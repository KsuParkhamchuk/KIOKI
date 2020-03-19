let encMessage = document.getElementById('encryptMessage');
let decrMessage = document.getElementById('decryptMessage');
let p = document.getElementById('pNumber');
let q = document.getElementById('qNumber');

let btnEncrypt = document.getElementById('encrypt__btn');
let btnDecrypt = document.getElementById('decrypt__btn');
let errorsBlock = document.getElementById('errors');
let newMessage = document.getElementById('newMessage');
let newMessage2 = document.getElementById('newMessage2');
let errors = [];
let result = [];
let decrypted = [];
let openKey = 0;


btnEncrypt.onclick = () =>{
    
    if(checkInputs()){
        openKey = p.value*q.value;
        
        let str = encMessage.value;
        console.log(openKey);
        for(let i=0; i<str.length; i++){
            let m = getNumberOfLetter(str.charAt(i));
            console.log("letter number:"+m);
            result.push((Math.pow(m,2))%openKey);
            
        }
        console.log('result: ' + result);
        result.forEach(elem =>{
            newMessage.value += elem + ' ';
        })
       
    }else {
        console.log(errors);
        errors.forEach(error =>{
        let p =document.createElement('p');
        errorsBlock.append(p,error);
    })
}
}

btnDecrypt.onclick = () => {
    let arr = []
    result.forEach(elem => {
        console.log(elem,p.value,q.value);
        let mp = Math.pow(elem,(Number(p.value)+1)/4)%p.value;
        let mq = Math.pow(elem,(Number(q.value)+1)/4)%q.value;
        let yp = {
            value: 0
        };
        let yq = {
            value: 0
        };
        let nod = gcd(Number(p.value),Number(q.value),yp, yq);
        let m1 = (yp.value*p.value*mq+yq.value*q.value*mp)%openKey;   
        let m2 = openKey - m1;
        let m3 = (yp.value*p.value*mq-yq.value*q.value*mp)%openKey;
        let m4 = openKey - m3;
        console.log(m1,m2,m3,m4);
        arr.push(m1);
        arr.push(m2);
        arr.push(m3);
        arr.push(m4);
        
        console.log(decrypted);
        newMessage2.value += arr + ' ';
        decrypted.push(arr);
        arr = [];
    })
    

}

getNumberOfLetter = (symbol) => {
    let startPos = 'а'.charCodeAt(0),
        currentPos = symbol.toLowerCase().charCodeAt(0),
        letterPosition = parseInt(currentPos - startPos);
    if(symbol === 'ё'){
        return 7;
    }
    return letterPosition >= 6 ? letterPosition+=2 : letterPosition+=1;
  }

checkInputs = () =>{
    let result = true;
    
    if(p.value%4 != 3){
        errors.push('p/4 should have reminder of devision = 3'); 
        result = false;
    }
    if(q.value%4 !=3){
        errors.push('q/4  should have reminder of devision = 3');
        result = false;
    }
    if(q.value == '' || p.value == '' || encMessage.value ==''){
        errors.push('All inputs should be filled');
        result = false;
    }
    console.log(result);
    return result;
  }


  gcd = ( a, b, x, y) =>{
    if (a == 0) {
        x.value = 0;
        y.value = 1;
        return b;
    }
    let x1 = {
        value: 0
    };
    let y1 = {
        value: 0
    };
    let d = gcd(b%a,a,x1,y1);
    x.value = Math.trunc(y1.value - Math.trunc(b/a) * x1.value);
    y.value = Math.trunc(x1.value);
    return d;
}
 
 
