
function saveFileNumbered(data, filetype, num=1){

  if(!filepath.exists()){
    write('save the file');
    return
  }else{
    write('recur');
    saveFileNumbered(data, filetype, num+1)
  }

}

