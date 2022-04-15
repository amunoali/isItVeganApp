
document.querySelector('button').addEventListener('click', () => {
  let inputVal = document.querySelector('#barcode').value

  // if(inputVal !== 12){
  //   alert('Please ensure that barcode is 12 characters')
  //   return;
  // }
  const url = `https://world.openfoodfacts.org/api/v0/product/${inputVal}.json`

fetch(url)
  .then(res => res.json()) // parse response as JSON
  .then(data => {
  console.log(data)
  if(data.status === 1){
    const item = new productInfo(data.product)
    item.showInfo()
    item.listIngredients()
    // document.querySelector('img').src = data.product.image_front_small_url
    // document.querySelector('h2').innerText = data.product.abbreviated_product_name
  
  }else{
    alert(`Product ${inputVal} is not found. Please enter another barcode!`)
  }
 
})
.catch(err => {
    console.log(`error ${err}`)
})
})

class productInfo {
  constructor(productData){
    // this.name = productData.generic_name
    this.otherName = productData.product_name
    this.ingredients = productData.ingredients_text
    this.image = productData.image_front_small_url
  }
  showInfo(){
    document.querySelector('img').src = this.image
    // document.querySelector('h2').innerText = this.name
    document.querySelector('#product-BackUpName').innerText = this.otherName
    document.querySelector('table').innerText = this.ingredients
  }
  listIngredients(){
    let tableRef = document.getElementById('ingredient-table')
    for( let key in this.ingredients){
      let newRow = tableRef.insertRow(-1)
      let newICell = newRow.inserCell(0)
      let newVCell = newRow.inserCell(1)
      let newIText = document.createTextNode(
        this.ingredients[key].text
      )

      let veganStatus = this.ingredients.vegan
      let newVText = document.createTextNode(veganStatus)
      newICell.appendChild(newIText)
      newVCell.appendChild(newVText)
    }
  }
}
