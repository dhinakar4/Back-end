const http = require("http");
const fs = require("fs");

http.createServer((req,res)=>{

if(req.url === "/read"){

    fs.readFile("file2.txt","utf8",(err,data)=>{
        if(err) throw err;
        res.write(data);
        res.end();
    });

}

else if (req.url === "/newfile") {
    
    fs.writeFile("newfile.txt", "new one!",(err) => {
        if(err) throw err;
        res.write("File created");
        res.end();
    } )
}

// else if(req.url === "/delete"){

//     fs.unlink("text.txt",(err)=>{
//         if(err) throw err;

//         res.write("File deleted!");
//         res.end();
//     });

// }

else if(req.url === "/update"){

    fs.appendFile("file2.txt","\nNew content added",(err)=>{
        if(err) throw err;

        res.write("File updated!");
        res.end();
    });

}

else{
    res.write("Server running");
    res.end();
}

}).listen(4000 , () => { console.log("server running!")});