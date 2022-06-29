import React, { useState, useEffect } from 'react';
import MainLayout from '../../layouts/MainLayout';
import Api from '../../Api';
import toolTipHandler from '../../componets/TooltipChart';

import {
  HTMLSelect,
  Button
} from "@blueprintjs/core";

import LineChart from '../../componets/LineChart';


const Sizes = (props) => {
  const [products, setProducts] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(undefined)
  const [flavors, setFlavors] = useState([])
  const [selectedFlavor, setSelectedFlavor] = useState(undefined)
  const [distris, setDistris] = useState([])
  const [selectedDistri, setSelectedDistri] = useState(undefined)
  const [versions, setVersions] = useState([])
  const [selectedVersion, setSelectedVersion] = useState(undefined)
  const [archs, setArchs] = useState([])
  const [selectedArch, setSelectedArch] = useState(undefined)
  const [numberOfSamples, setNumberOfSamples] = useState(10)
  const [viewRefreshButton, setViewRefreshButton] = useState(false)
  const [chartDatasets, setChartDatasets] = useState([])
  const [chartXAxis, setChartXAxis] = useState({})
  const [chartYAxisMax, setChartYAxisMax] = useState()
  const [chartYAxisMin, setChartYAxisMin] = useState()
  

  const api = new Api()

  //Start point
  useEffect(() => {
    api.find("product").then(data => {
      setProducts(data)
    })
  }, [])

  //--- Products ------------------------
  //When change products
  useEffect(() => {
    if (products !== undefined && products.length >0 )
      setSelectedProduct(products[0].product)
    else
      setSelectedProduct(undefined)
  }, [products])

  //When change selecteProduct
  useEffect(() => {
    setFlavors(undefined)
    if (selectedProduct !== undefined)
      api.find("flavor", {product: selectedProduct}).then(data => {
        setFlavors(data)
      })
  }, [selectedProduct])

  //--- Flavors ------------------------

  //When change flavors
  useEffect(() => {
    if (flavors !== undefined && flavors.length >0 ){
      setSelectedFlavor(flavors[0].flavor)
    } else
      setSelectedFlavor(undefined)
  }, [flavors])


  //When change selecteFlavour
  useEffect(() => {
    setDistris(undefined)
    if (selectedFlavor !== undefined)
      api.find("distri", {product: selectedProduct, flavor: selectedFlavor}).then(data => {
        setDistris(data)
      })
  }, [selectedFlavor])

  //--- Distri ------------------------
  
  //When change distri
  useEffect(() => {
    if (distris !== undefined && distris.length >0 )
      setSelectedDistri(distris[0].distri)
    else
      setSelectedDistri(undefined)
  }, [distris])


  //When change selecteFlavour
  useEffect(() => {
    setVersions(undefined)
    if (selectedDistri !== undefined)
      api.find("version", {product: selectedProduct, flavor: selectedFlavor, distri: selectedDistri}).then(data => {
        setVersions(data)
      })
  }, [selectedDistri])

  //--- version ------------------------
  
  //When change distri
  useEffect(() => {
    if (versions !== undefined && versions.length >0 )
      setSelectedVersion(versions[0].version)
    else
      setSelectedVersion(undefined)
  }, [versions])


  //When change selecteFlavour
  useEffect(() => {
    setArchs(undefined)
    if (selectedVersion !== undefined)
      api.find("arch", {product: selectedProduct, flavor: selectedFlavor, distri: selectedDistri, version: selectedVersion}).then(data => {
        setArchs(data)
      })
  }, [selectedVersion])
  

  //--- arch ------------------------
  
  //When change distri
  useEffect(() => {
    if (archs !== undefined && archs.length >0 )
      setSelectedArch(archs[0].arch)
    else
      setSelectedArch(undefined)
  }, [archs])

  //When change selectedArch
  useEffect(() => {
    setViewRefreshButton(selectedProduct && selectedFlavor && selectedDistri && selectedVersion && selectedArch)  
  }, [selectedProduct, selectedFlavor, selectedDistri, selectedVersion, selectedArch])


  //--- Handlers ------------------------
  function onRefreshChart() {
    let query = {
      product: selectedProduct, 
      flavor: selectedFlavor,
      distri: selectedDistri,
      version: selectedVersion,
      arch: selectedArch
    }
    api.find("size", query).then(data => {
      const values = data.map( e => e.value)
      let max = values.reduce((previousValue, currentValue) => {
        return (currentValue > previousValue) ? currentValue : previousValue
      }, 0);

      let min = values.reduce((previousValue, currentValue) => {
        return (currentValue < previousValue) ? currentValue : previousValue
      }, 10000000000);

      max = Math.round(max * 1.5)
      min = Math.round(min / 1.5)

      setChartXAxis({
        labels: data.map( e => e.build)
      })

      setChartYAxisMax(max)
      setChartYAxisMin(min)

      setChartDatasets([{
        label: `${selectedProduct} - ${selectedFlavor}`,
        data: values
      }])
    })
  }

  const tooltip = {
    handler: toolTipHandler
  }

  function paintSelector(title, field, state, setFnc ){
    return <span style={{ display: "inline", marginLeft: "2em" }}>
      <span style={{ display: "inline" }}>{title}: </span>
      <HTMLSelect onChange={e => setFnc(e.target.value)}>
        {state && state.map( (i, index) => {
          return <option key={index} value={i[field]}>{i[field]}</option>
        })}
      </HTMLSelect>
    </span>
  }

  return (
    <div>
      <MainLayout />

      <div style={{ padding: "2em" }}>

        { paintSelector("Product", "product", products, setSelectedProduct) }
        { paintSelector("Flavor", "flavor", flavors, setSelectedFlavor) }
        { paintSelector("Distri", "distri", distris, setSelectedDistri) }
        { paintSelector("Version", "version", versions, setSelectedVersion) }
        { paintSelector("Arch", "arch", archs, setSelectedArch) }


        <span style={{ display: "inline", marginLeft: "2em" }}>Number of builds: </span>
        <input type="text" placeholder="Default 10" value={numberOfSamples} style={{textAlign: "right", width: "5em"}} onChange={ e => setNumberOfSamples(e.target.value)}/>
        
        <Button className={"docs-wiggle"} icon="refresh" style={{marginLeft: "2em" }} onClick={() => onRefreshChart()} disabled={!viewRefreshButton}>Refresh</Button>
      </div>
      
      <LineChart 
        datasets={chartDatasets}
        xaxis={chartXAxis} 
        tooltip={tooltip}
        yaxisMax={chartYAxisMax}
        yaxisMim={chartYAxisMin}
      />
    </div>
  );
};

export default Sizes;
