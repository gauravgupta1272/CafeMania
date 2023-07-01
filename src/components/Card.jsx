import React ,{useEffect, useState, useRef }from 'react'
import { useDispatchCart, useCart} from './ContextReducer';
export default function Card(props) {
  let dispatch = useDispatchCart();
  let data = useCart();
  const priceRef = useRef();
  let options  = props.options
  let priceOptions = Object.keys(options);
  const [qty, setQty] = useState(1)
  const [size, setSize] = useState("")

  const handleAddtoCart = async () =>{
      let food =[];
      for (const item of data){
        if(item.id === props.foodItem._id){
          food = item;
          break;
        }
      }
      if (food !== []) {
        if (food.size === size) {
          await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty })
          return
        }
        else if (food.size !== size) {
          await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size,img: props.ImgSrc })
          //console.log("Size different so simply ADD one more to the list")
          return
        }
        return
      }
      await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size,img: props.ImgSrc })

  }

  let finalPrice = qty* parseInt(options[size]);
  useEffect(()=>{
    setSize(priceRef.current.value);
  },[])
  return (
    <div>
        <div>
        <div className="card mt-3" style={{"width": "18rem", "maxHeight": "360px"}}>
          <img src={props.foodItem.img} className="card-img-top" alt="..."  style={{height:"140px", objectFit:"fill"}}/>
          <div className="card-body">
            <h5 className="card-title">{props.foodItem.name}</h5>
            <div className="container w-100">
            <select className="m-2 h-100  bg-success text-white rounded px-2" onChange={(e)=>setQty(e.target.value)}>
              {Array.from(Array(6), (e,i)=> {
                return (
                  <option key={i+1} value={i+1}>{i+1}</option>
                )
              })}
            </select>
            <select className="m-2 h-100 bg-success text-white rounded px-2" ref={priceRef} onChange={(e)=>setSize(e.target.value)}>
              {priceOptions.map((data)=> {
                return <option key={data} value={data}>{data}</option>
                
              })}
            </select>
            <div className="fs-5 d-inline">₹{finalPrice}/-</div>
             </div>
             <hr/>
             <button className='btn btn-success justify-center ms-5 ' onClick={handleAddtoCart}>
             Add to Cart
             </button>
          </div>
        </div>
      </div>
    </div>
  )
}
