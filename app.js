class plane{
    constructor(root_chord, end_chord, length, sweep_angle){
        this.b0         =Number(root_chord);
        this.bk         =Number(end_chord);
        this.l          =Number(length);
        this.xpk        =Number(sweep_angle);
        this.s          =(this.b0+this.bk)*this.l/2
        this.n          =this.b0/this.bk;
    }                   
    getMACba()
        {return 2*(this.b0+this.bk-(this.b0*this.bk/(this.b0+this.bk)))/3}
    getMACza()
        {let a;
            if(this.bk !=0){
                a = (this.l*(this.n+2)/(6*(this.n+1)))
            }
            else{
                a = this.l/6;
            }
            return a;
        }
    getMACxa()
        {return this.getMACza()*Math.tan(this.xpk*Math.PI/180)}
    checkNull() {
        if(this.b0 <= 0 || this.l <= 0 || this.xpk <= 0){
            return false;
        }
        else{return true}
    }
};

class draw extends plane{
    constructor(id, root_chord, end_chord, length, sweep_angle){
        super               (root_chord, end_chord, length, sweep_angle)
        this.drawId         =id;
        this._elbyID        =document.getElementById(this.drawId)
        this._drawWidth     =this.b0 + this.bk +Math.abs(this.b0 - this.l*Math.tan(this.xpk*Math.PI/180)/2); 
        this._drawHeight    =this.l/2 + 10;
    }
    
    setDrawAttr()
        {this._elbyID.setAttribute("width", this._drawWidth)
         this._elbyID.setAttribute('Height', this._drawHeight)
        //  для отрисовки canvas в полном масштабе на странице
        this._elbyID.style.width = '80vw';
        this._elbyID.style.height = 80*(this._drawHeight-10)/this._drawWidth + 'vw';
        }
    drawCanvas(){
        let ctx = this._elbyID.getContext('2d')
        if (this.b0 >= this.l*Math.tan(this.xpk*Math.PI/180)/2){
            //      мнимая концевая хорда bk
            ctx.beginPath()
            ctx.strokeStyle ='red';
            ctx.moveTo(2*this.b0 -this.l*Math.tan(this.xpk*Math.PI/180)/2,5+ this.l/2);
            ctx.lineTo(2*this.b0 -this.l*Math.tan(this.xpk*Math.PI/180)/2 + this.bk,5+ this.l/2);
            ctx.stroke();
            //      действительная корневая хорда b0
            ctx.beginPath()
            ctx.strokeStyle ='blue';
            ctx.moveTo(this.b0 -this.l*Math.tan(this.xpk*Math.PI/180)/2,5+ this.l/2);
            ctx.lineTo(2*this.b0 -this.l*Math.tan(this.xpk*Math.PI/180)/2,5+ this.l/2);
            ctx.stroke();
            //      действительная концевая хорда bk
            ctx.beginPath()
            ctx.strokeStyle ='red';
            ctx.moveTo(this.b0, 5);
            ctx.lineTo(this.b0+this.bk, 5);
            ctx.stroke();
            //      мнимая корневая хорда b0
            ctx.beginPath()
            ctx.strokeStyle ='blue';
            ctx.moveTo(0, 5);
            ctx.lineTo(this.b0, 5);
            ctx.stroke();
            //      передняя кромка крыла
            ctx.beginPath()
            ctx.strokeStyle ='black';
            ctx.moveTo(this.b0 -this.l*Math.tan(this.xpk*Math.PI/180)/2,5+ this.l/2);
            ctx.lineTo(this.b0, 5);
            ctx.stroke();
            //      задняя кромка крыла
            ctx.beginPath()
            ctx.strokeStyle ='black';
            ctx.moveTo(2*this.b0 -this.l*Math.tan(this.xpk*Math.PI/180)/2,5+ this.l/2);
            ctx.lineTo(this.b0+this.bk, 5);
            ctx.stroke();
            //      САХ
            ctx.beginPath()
            ctx.strokeStyle ='green';
            ctx.moveTo(this.b0 -this.l*Math.tan(this.xpk*Math.PI/180)/2 + this.getMACxa(),5+ this.l/2-this.getMACza());
            ctx.lineTo(this.b0 -this.l*Math.tan(this.xpk*Math.PI/180)/2 + this.getMACxa() + this.getMACba(),5+ this.l/2-this.getMACza());
            ctx.stroke();
            //      линия 0.5
            ctx.beginPath()
            ctx.setLineDash([5,3]);
            ctx.strokeStyle ='black';
            ctx.moveTo(this.b0+this.bk/2, 5);
            ctx.lineTo(1.5*this.b0 -this.l*Math.tan(this.xpk*Math.PI/180)/2,5+ this.l/2);
            ctx.stroke();
            //      линия диагонали
            ctx.beginPath()
            ctx.setLineDash([5,3]);
            ctx.strokeStyle ='black';
            ctx.moveTo(0,5);
            ctx.lineTo(2*this.b0 -this.l*Math.tan(this.xpk*Math.PI/180)/2 + this.bk,5+ this.l/2);
            ctx.stroke();
            
        }
        else{
            //      мнимая концевая хорда bk
            ctx.beginPath()
            ctx.strokeStyle ='red';
            ctx.moveTo(0,5+ this.l/2);
            ctx.lineTo(this.b0 + this.bk,5+ this.l/2);
            ctx.stroke();
            //      действительная корневая хорда b0
            ctx.beginPath()
            ctx.strokeStyle ='blue';
            ctx.moveTo(0,5+ this.l/2);
            ctx.lineTo(this.b0,5+ this.l/2);
            ctx.stroke();
            //      действительная концевая хорда bk
            ctx.beginPath()
            ctx.strokeStyle ='red';
            ctx.moveTo(this.l*Math.tan(this.xpk*Math.PI/180)/2, 5);
            ctx.lineTo(this.l*Math.tan(this.xpk*Math.PI/180)/2 + this.bk, 5);
            ctx.stroke();
            //      мнимая корневая хорда b0
            ctx.beginPath()
            ctx.strokeStyle ='blue';
            ctx.moveTo(this.l*Math.tan(this.xpk*Math.PI/180)/2 - this.b0, 5);
            ctx.lineTo(this.l*Math.tan(this.xpk*Math.PI/180)/2, 5);
            ctx.stroke();
            //      передняя кромка крыла
            ctx.beginPath()
            ctx.strokeStyle ='black';
            ctx.moveTo(0,5+ this.l/2);
            ctx.lineTo(this.l*Math.tan(this.xpk*Math.PI/180)/2, 5);
            ctx.stroke();
            //      задняя кромка крыла
            ctx.beginPath()
            ctx.strokeStyle ='black';
            ctx.moveTo(this.b0,5+ this.l/2);
            ctx.lineTo(this.l*Math.tan(this.xpk*Math.PI/180)/2+this.bk, 5);
            ctx.stroke();
            //      САХ
            ctx.beginPath()
            ctx.strokeStyle ='green';
            ctx.moveTo(this.getMACxa(),5+ this.l/2-this.getMACza());
            ctx.lineTo(this.getMACxa() + this.getMACba(),5+ this.l/2-this.getMACza());
            ctx.stroke();
            //      линия 0.5
            ctx.beginPath()
            ctx.setLineDash([5,3]);
            ctx.strokeStyle ='black';
            ctx.moveTo(this.l*Math.tan(this.xpk*Math.PI/180)/2+this.bk/2, 5);
            ctx.lineTo(this.b0/2,5+ this.l/2);
            ctx.stroke();
            //      линия диагонали
            ctx.beginPath()
            ctx.setLineDash([5,3]);
            ctx.strokeStyle ='black';
            ctx.moveTo(this.l*Math.tan(this.xpk*Math.PI/180)/2 - this.b0,5);
            ctx.lineTo(this.b0+this.bk,5+ this.l/2);
            ctx.stroke();
            
        }
    }
}


function findClass(el,elContainer){
    elContainer = document.querySelector(elContainer);
    el = elContainer.querySelector(el);
    return el};
function round(el,countAfterDot){
    return Math.round(el*countAfterDot)/countAfterDot;
}



findClass('.calc','main').addEventListener('click',()=>{
    let wing = new draw('draw',
                        findClass('.root_chord','.given_data').value*100, 
                        findClass('.end_chord','.given_data').value*100, 
                        findClass('.length','.given_data').value*100,
                        findClass('.sweep_angle','.given_data').value);
    console.log(wing);
    if(wing.checkNull()){
            findClass('.MAC_ba','.received_data').innerHTML = 'ba, длина САХ = '+ round(wing.getMACba(),100)/100 +'м';
            findClass('.MAC_za','.received_data').innerHTML = 'za, координата z САХ = '+round(wing.getMACza(),100)/100 +'м';
            findClass('.MAC_xa','.received_data').innerHTML = 'xa, координата x САХ = '+round(wing.getMACxa(),100)/100 +'м';

            wing.setDrawAttr();
            wing.drawCanvas();



        }
    else{
        alert('Введите данные что бы выполнить расчет');
    };
    
});





