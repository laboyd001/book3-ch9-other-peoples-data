fetch("http://localhost:8088/food/")
  //makes the data into json
  .then((foodData) => foodData.json())
  // this is going to loop over my array to get barcode and look up food in the other database
  .then((realData) => {
    let foodList = document.querySelector("#foodList")
    realData.forEach((food) => {
      fetch(`https://world.openfoodfacts.org/api/v0/product/
            ${food.barcode}.json`)
        .then((foodData) => foodData.json())
        .then((realData) => {
          // below is the HTML template
          foodList.innerHTML += `
                    <div class="foodDiv">
                    <h1>${food.name}</h1>
                    <h2>
                    ${food.ethnicity} ${food.type}</h2>
                    <p>
                    Ingredients: ${realData.product.ingredients_text}<br/><br/>
                    Country of Origin: ${realData.product.countries}<br/><br/>
                    Barcode: ${food.barcode}</p>
                    Calories per serving: ${realData.product.nutriments.energy} kcal<br/><br/>
                    Fat per serving: ${realData.product.nutriments.fat} g<br/><br/>
                    Sugar per serving: ${realData.product.nutriments.sugars} g<br/><br/>
                    </div>
                    `
        })
    })
  })