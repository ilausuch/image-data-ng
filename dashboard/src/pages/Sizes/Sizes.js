import React, { useState, useEffect } from 'react';
import MainLayout from '../../layouts/MainLayout';
import Api from '../../Api';

import {
  HTMLSelect,
  Button
} from "@blueprintjs/core";
import { api } from '../../config';


const Sizes = (props) => {
  const [products, setProducts] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(undefined)
  const [flavors, setFlavors] = useState([])
  const [selectedFalvor, setSelectedFlavor] = useState(undefined)
  const [numberOfSamples, setNumberOfSamples] = useState(10)

  const api = new Api()

  //Start point
  useEffect(() => {
    api.find("product").then(data => {
      setProducts(data)
    })
  }, [])

  //When change products
  useEffect(() => {
    if (products !== undefined)
      if (products.length >0 )
        setSelectedProduct(products[0].product)
      else
        setSelectedProduct(undefined)
  }, [products])

  //When change selecteProduct
  useEffect(() => {
    getFlavors(selectedProduct)
  }, [selectedProduct])

  //When change flavors
  useEffect(() => {
    if (flavors !== undefined)
    if (flavors.length >0 )
      setSelectedFlavor(flavors[0].flavor)
    else
      setSelectedFlavor(undefined)
  }, [flavors])

  function getFlavors(product){
    api.find("flavor", {product: product}).then(data => {
      setFlavors(data)
      console.log(data)
    })
  }

  function onRefreshChart() {
    console.log("refresh")
  }


  return (
    <div>
      <MainLayout />

      <div style={{ padding: "2em" }}>

        <span style={{ display: "inline" }}>Product: </span>
        <HTMLSelect onChange={e => setSelectedProduct(e.target.value)}>
          {products && products.map( (i, index) => {
            return <option key={index} value={i.product}>{i.product}</option>
          })}
        </HTMLSelect>

        <span style={{ display: "inline", marginLeft: "2em" }}>Flavor: </span>
        <HTMLSelect onChange={e => setSelectedFlavor(e.target.value)}>
          {flavors && flavors.map( (i, index) => {
            return <option key={index} value={i.flavor}>{i.flavor}</option>
          })}
        </HTMLSelect>

        <span style={{ display: "inline", marginLeft: "2em" }}>Number of builds: </span>
        <input type="text" placeholder="Default 10" value={numberOfSamples} style={{textAlign: "right", width: "5em"}}/>
        
        <Button className={"docs-wiggle"} icon="refresh" style={{marginLeft: "2em" }} onClick={() => onRefreshChart()}>Refresh</Button>
      </div>
      
    </div>
  );
};

export default Sizes;

// onClick={this.beginWiggling}
//           small={size === "small"}
//           large={size === "large"}
//           {...buttonProps}