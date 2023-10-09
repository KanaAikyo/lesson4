const { Readable } = require("stream");

const codingTips = [
  "Try to get a good night sleep before a midterm of final.",
  "When feeling lost, a short walk and fresh air can help a lot",
  "If you cannot solve the coding problem, try and use pseudocode first.",
  "First solve the problem naively, and reach for an optimal solution after.",
];

function tipStream(tips) {
  // return a new Readable() stream here.
  const myReadable = new Readable({
    read()  {
      if(tips.length>0){
        this.push(tips.shift())
      }else{
        this.push(null) // End the stream
      }
    }
  }); 
  return myReadable
}

const ts = tipStream(codingTips);
ts.setEncoding('utf-8')

ts.on("data", (chunk) => console.log(chunk));
ts.on("end", () => console.log("done!"));