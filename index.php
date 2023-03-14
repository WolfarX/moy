<!DOCTYPE html>
<html>
<head>
   <meta charset="utf-8">
   <title>TARGET</title>
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <link rel="stylesheet" type="text/css" href="./style.css">
</head>
<body>

<div class="box nv flex column">
  <h2>Niveau:</h2>
  <select class="cycle">
    <option selected="" disabled="">Cycle</option>
    <option value="P">Primaire</option>
    <option value="Pr">Préparatoire</option>
    <option value="S">Sécondaire</option>
  </select>
  <button class="ok" style="display: none;">OK!</button>
</div>
<div class="box t" style='display:none'>
  <span class="status" style="background: #D3D3D3">Status</span>
  <div class="flex sc row">
    <div class="flex column">
      <h2>Target:</h2>
      <div class="flex column">
        <input type="text" class="target" placeholder="Target">
        <button class="tr">Submit</button>
      </div>
    </div>
    <div class="flex column">
      <h2>Moyenne:</h2>
      <input type="text" class="moyenne" placeholder="Moyenne" disabled>
    </div>
  </div>
  <div class="calc flex row">

  </div>
</div>

<script type="text/javascript" src="./script.js"></script>
</body>
</html>