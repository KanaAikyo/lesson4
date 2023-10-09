const fs = require("fs/promises");
const { EOL } = require("os");

const coffeeMap = {
    DR: "dark-roast",
    MR: "medium-roast",
    B: "blonde",
};

const returnValidCoffeeTypeOrFail = (coffeeType) => {
  const validCoffeeType = coffeeMap[coffeeType];
  if (!validCoffeeType) throw new Error("Invalid coffee type");
  return validCoffeeType;
}

function viewAllSupply(coffeeType) {
   
    coffeeType = returnValidCoffeeTypeOrFail(coffeeType)
    return fs.readFile("supply.txt", "utf8")
    .then((data)=>{
      const coffees = data.split(EOL);
      let count = 0;
      coffees.forEach((coffee) => {
        if (coffee === coffeeType) count++;
      });
      return count
    })
    .catch((err)=>{console.log(err)})
}

 
const addSupply = (coffeeType) => {
    coffeeType = returnValidCoffeeTypeOrFail(coffeeType)
    return fs.appendFile("supply.txt", coffeeType + EOL)
}


const deleteSupply = (coffeeType, quantity,) => {
    coffeeType = returnValidCoffeeTypeOrFail(coffeeType)
     return fs.readFile("supply.txt", "utf8", )
    .then((data)=>{           
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
            return filteredCoffee
        })  
    .then((filteredCoffee)=> fs.writeFile("supply.txt", filteredCoffee.join(EOL)))

}

Promise.resolve() 
  .then(() => viewAllSupply("B"))
  .then((count)=>console.log(count))//5
  .then(() => addSupply("B"))
  .then(()=> viewAllSupply("B"))//6
  .then((count)=>console.log(count))
  .then(()=> deleteSupply("B",2))
  .then(()=> viewAllSupply("B"))//4
  .then((count)=>console.log(count))
  .then(()=>console.log("program completed"))
  .catch((err) => console.log(err));


