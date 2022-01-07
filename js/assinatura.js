$('#signature').jSignature({'background-color':'transparent'});
let $sigdiv = $('#signature');
let datapair = $sigdiv.jSignature('getData', 'svgbase64', {
  'UndoButton':true
});

$('#signature').bind('change', function(e) {
  let data = $('#signature').jSignature('getData');
  $("#signature_capture").val(data);
});

$('#reset').click(function(e){
  $('#signature').jSignature('clear');
  $("#signature_capture").val('');
  e.preventDefault();
});
let salvarAssinatura = document.querySelector("#salvarAssinatura");
salvarAssinatura.addEventListener("click",function (e){
  e.preventDefault();
  let daddy = window.self;
  daddy.opener = window.self;
  daddy.close();
  localStorage.setItem("baseImg", document.querySelector("#signature_capture").value);
  
})