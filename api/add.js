const fetch = require('node-fetch');
const lookup = require('safe-browse-url-lookup')({ apiKey: 'AIzaSyDgjoHEfUjfZeIlUGOFEgCRdNKUmGNSlb8' });


 module.exports = async (req, res) => {
  const murl = req.query.url;
  console.log(murl);
  res.setHeader('Access-Control-Allow-Origin', 'https://s.peico.xyz')
  res.setHeader('Access-Control-Allow-Methods', 'GET')
        if (murl != null && murl != undefined) {
         if(murl.includes("peico.xyz")){
                         res.send("You can't shorten a already shortened URL");
         }
         lookup.checkSingle(murl).then(async isMalicious => {
          if(isMalicious){
            res.send("This URL seems Evil");
          } else {
            var tag = Math.random().toString(36).toUpperCase().substr(3, 5);  
            var url = "https://script.google.com/macros/s/AKfycbxEbbbhJFQlKTDSXsQfELqxuFPFeHTaT4AeEw_ETZDcpfYnTcE/exec?URL=" + murl + "&TAG=" + tag;
            var request = await fetch(url);
           var response = await request.text();
            if(response == "Done"){
               res.send(tag);
            } else {
               res.send("Opps, something went wrong!");
            }
         };
    }).catch(err => {
            res.send("Opps, something went wrong!");
    })
} else { 
   res.send("Before we fall into the pastly undefined possible error, we would like to tell you <br><h1>THIS IS A API AND NEEDS A VALID QUERRYSTRING, and allows requests from s.peico.xyz</h1>");
  }
 }
