import React from "react";

const SavedAddress = (props) => {
  let data = props.data;
  console.log(data);
  let list = data.map((item)=> {
    return (<div key={item.id} className="col-xs-5 saved-address">
      <p className="address-type">{item.addressType}</p>
      <hr/>
      <p>{item.name}, {item.line1}, {item.line2}, {item.city}, {item.state}, - {item.postalCode}</p>
      <p className="landmark">Landmark</p>
      <p>{item.landmark}</p>
      <a className="edit card-item" onClick={()=>edit(item)}>Edit</a> | <a  className="remove card-item" onClick={()=>remove(item)}>Remove</a> | <a  className="d-t-address card-item" onClick={()=>deliverToAddress(item)}>Deliver to this address</a>
    </div>);
  });

  const edit = (item) => {
    props.edit(item);
  }

  const remove = (item) => {
    props.remove(item);
  }

  const deliverToAddress = (item) => {
    console.log(item);
  }

  return (
    <div className="saved-address-wrapper">
      <h6 className="title">Saved Address</h6>
      {list}
    </div>
  );
}

export default SavedAddress;