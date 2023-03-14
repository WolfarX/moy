let MG;
let P = {
  'P': {
    'P1': '1ére année',
    'P2': '2éme année',
    'P3': '3éme année',
    'P4': '4éme année',
    'P5': '5éme année',
    'P6': '6éme année'
  },
  'Pr': {
    'Pr7': '7éme année',
    'Pr8': '8éme année',
    'Pr9': '9éme année',
  },
  'S': {
    'S1': '1ére année',
    'S2-2éme année': {
      'S2Sc':'2éme Sciences',
      'S2Eco':'2éme économie',
      'S2L':'2éme Lettres',
      'S2Sp':'2éme Sport'
    },
    'S3-3éme année': {
      'S3S':'3éme Sciences naturelles',
      'S3Eco':'3éme économie',
      'S3L':'3éme Lettres',
      'S3Sp':'3éme Sport',
      'S3M':'3éme Maths',
      'S3T':'3éme Technique'
    },
    'Bac-Baccalauréat': {
      'BacS':'Bac Sciences naturelles',
      'BacEco':'Bac économie',
      'BacL':'Bac Lettres',
      'BacSp':'Bac Sport',
      'BacM':'Bac Maths',
      'BacT':'Bac Technique'
    }
  }
}
let cycleE = document.querySelector('.cycle');
okbtn = document.querySelector('.ok');
cycleE.addEventListener("input", function(){
  okbtn.style.display = '';
  if(document.querySelector('.niveau')) {
    document.querySelector('.niveau').parentNode.removeChild(document.querySelector('.niveau'));
  }
  cycle = cycleE.value;
  niveau = document.createElement('select');
  niveau.className = 'niveau';
  cycleE.after(niveau);
  if(cycle === 'P' || cycle === 'Pr') {
    for (const [key, value] of Object.entries(P[cycle])) {
      option = document.createElement('option');
      option.innerHTML = value;
      option.value = key;
      niveau.appendChild(option);
    }
  }
  else if(cycle === 'S') {
    for (const [key, value] of Object.entries(P[cycle])) {
      if(typeof value === 'string'){
        option = document.createElement('option');
        option.innerHTML = value;
        option.value = key;
        niveau.appendChild(option);
        continue;
      }
      optgroup = document.createElement('optgroup');
      optgroup.label = key.split('-')[1];
      for (const [k, v] of Object.entries(P[cycle][key])) {
        option = document.createElement('option');
        option.innerHTML = v;
        option.value = k;
        optgroup.appendChild(option);
        niveau.appendChild(optgroup);
      }
    }
  }
})
moyenne=document.querySelector('.moyenne');
calc = document.querySelector('.calc');
t=document.querySelector('.t');
okbtn.addEventListener("click", function(){
  calc.innerHTML='';
  if(t.style.display !='block') {
    t.style.display='block';
  }
  coeff=0;
  niv = niveau.value;
  let nv = new FormData();
  nv.append('nv', niv);
  fetch('request.php', {
    method: 'POST',
    body: nv,
  }).then(response => response.json())
    .then(data => {
      for(let i=0;i<data.length;i++) {
        coeff+=parseFloat(data[i].coeff);
        div=document.createElement('div');
        div.innerHTML+='<h2>'+ data[i].matiere +'</h2>';
        if(data[i].tp != '0') {
          div.innerHTML+='<span class="attach"><input type="checkbox"><h4>TP:</h4><input type="number"></span>';
        }
        if(data[i].orale != '0') {
          div.innerHTML+='<span class="attach"><input type="checkbox"><h4>orale</h4><input type="number"></span>';
        }
        div.innerHTML+='<span class="attach"><input type="checkbox"><h4>Controle 1: </h4><input type="number"></span>';
        if(data[i].controle != '1') {
          div.innerHTML+='<span class="attach"><input type="checkbox"><h4>Controle 2: </h4><input type="number"></span>';
        }
        div.innerHTML+='<span class="attach"><input type="checkbox"><h4>Synthése: </h4><input type="number" data-type="S"></span>';
        div.innerHTML+='<input type="number" placeholder="Moyenne" class="my" data-coeff="'+ data[i].coeff +'" disabled="">';
        calc.appendChild(div);
      }
      input = calc.querySelectorAll('input[type="number"]:enabled');
      input.forEach(x => {x.addEventListener("input", calcul)})
    }).catch(console.error)
})

target = document.querySelector('.target');
btnTarget = document.querySelector('.tr');
function calcul() {
  M=0;
  MM=0;
  MG=0;
  inputAll=calc.querySelectorAll('input[type="number"]:enabled');
  MGel=this.parentNode.parentNode.querySelector('input:disabled');
  inputCalc=this.parentNode.parentNode.querySelectorAll('input[type="number"]:enabled');
  inputCalc.forEach(x => {
    if(x.value == '') {return;}
    M+=parseFloat(x.value);
    if(x.dataset.type=='S') {parseFloat(M+=parseFloat(x.value));}
  })
  MM=M/(inputCalc.length+1);
  MGel.value=MM;
  MGall=calc.querySelectorAll('input:disabled');
  MGall.forEach(x => {
    if(x.value == '') {return;}
    MG+=parseFloat(x.value)*(parseFloat(x.dataset.coeff));
  })
  moyenne.value=MG/coeff;
}
function calcTarget() {
  status = document.querySelector('.status');
  status.style = 'background: "#6E6E6E"';
  r=0;
  all = target.value*coeff;
  reachE = calc.querySelectorAll('input[type="checkbox"]:checked');
  reachE.forEach(x => {
    r=r+ parseFloat(x.parentNode.querySelector('input[type="number"]').value)
    if(x.parentNode.querySelector('input[type="number"]').dataset == 'S') {r=r+ parseFloat(x.parentNode.querySelector('input[type="number"]').value);}
  })
  console.log();
  if(MG>=all) {
    console.log('t');
    console.log(status);
    status.innerHTML = "ALREADY!";
    status.style = 'background: "#00e611"';
  }

}
btnTarget.addEventListener("click", calcTarget)