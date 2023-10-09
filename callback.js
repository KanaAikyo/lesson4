const fs = require("fs")
const { EOL } = require("os");

const coffeeMap = {
    DR: "dark-roast",
    MR: "medium-roast",
    B: "blonde",
};

const returnValidCoffeeTypeOrFail = (coffeeType,) => {
  const validCoffeeType = coffeeMap[coffeeType];
   if (!validCoffeeType) throw new Error("Invalid coffee type");
  return validCoffeeType;
}

function viewAllSupply(coffeeType,cb) {
   
    coffeeType = returnValidCoffeeTypeOrFail(coffeeType)
    try{ fs.readFile("supply.txt", "utf8",(err,data)=>{
        if(err){
            cb(err)
        }else{
            const coffees = data.split(EOL);
            let count = 0;
            coffees.forEach((coffee) => {
            if (coffee === coffeeType) count++;
            });
            cb(null,count)
        }
    })}
    catch(error){
        cb(error)
    }
}




const addSupply = (coffeeType,cb) => {
   try{ coffeeType = returnValidCoffeeTypeOrFail(coffeeType)
    fs.appendFile("supply.txt", coffeeType + EOL,(err)=>{
            if(err){
            cb(err)
            }else{
                cb(null,"saved")
            }
        })
    }catch{
        cb(err,null)
    }
}



const deleteSupply = (coffeeType, quantity,cb) => {
    coffeeType = returnValidCoffeeTypeOrFail(coffeeType)
    try{
       fs.readFile("supply.txt", "utf8", (err,data)=>{
            if(err){ 
                cb(err)
            }          
            const coffees = data.split(EOL);
            const filteredCoffee = [];
                        
            for (const bag of coffees) {
                if (quantity === "*") {
                    quantity = coffees.length; 
                } else if (bag === coffeeType && quantity > 0) {
                    quantity--; 
                } else {
                    filteredCoffee.push(bag); 
                }
            }
           
           fs.writeFile("supply.txt", filteredCoffee.join(EOL),(err)=>{
            if(err){
                cb(err)
            }else{
                cb(null,"deleted")
            }})

        })  
        
    }catch(err){
        cb(err,null)
    }

}



viewAllSupply("B",(err,count)=>{
    if(err){
        console.log(err)
    }
    console.log(count)
    addSupply("B",(err)=>{
        if(err){
            console.log(err)
        }
        viewAllSupply("B",(err,count)=>{
            if(err){
                console.log(err)
            }
            console.log(count)
            deleteSupply("B",2,(err)=>{
                if(err){console.log(err)
                }
                viewAllSupply("B",(err,count)=>{
                    if(err){
                        console.log(err)
                    }
                    console.log(count)
                    console.log("Program is completed")
                })  
            })
        })
    })
})

