let fs= require("fs");

fs.writeFile('textfile.txt','Hello!',(err) => {
    if(err) throw err;
    console.log('File created!');
});

fs.writeFile('file1.txt','Welcome!', (err) => {
    if(err) throw err;
    console.log('New file created!');
});

fs.readFile('file1.txt',(err) => {
    if(err) throw err;
    console.log('reading...');
});

fs.rename('textfile.txt','file2.txt',(err) => {
    if(err) throw err;
    console.log('Name changed');
});

fs.appendFile('textfile.txt','\n New content added', (err) => {
    if(err) throw err;
    console.log('content add successfully!');
});

// fs.unlink("file1.txt",(err) => {
//     if(err) throw err ;
//     console.log('File removed!');
// });