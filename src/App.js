import React,{useEffect, useState} from "react";
import SavedAddress from './components/SavedAddress';
import Suggestions from './components/Suggestions';

const App = () => {
  const [scriptLoad, setScriptLoaded] = useState(false);
  const [populateAddress, setPopulateAddress] = useState({});

  //Form Fields State
  const [name, setName] = useState("");
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [city, setCity] = useState("");
  const [stateAddress, setStateAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [landmark, setLandmark] = useState("");
  const [addressType, setAddressType] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [list, setList] = useState([{
    id: 1234,
    name: "161, 6th Block",
    line1: "19th, Main Koramangala",
    city: "Banglore",
    state: "Karnataka",
    postalCode: 500046,
    landmark: "Near Bethany High School",
    addressType: "Home"
  }]);

  useEffect(()=>{
    const script = document.createElement("script");
  
    script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAJLPYT-hAwJSgYfjAhlFL3qSxAE3pn6cw&libraries=places";
    script.async = true;

    document.body.appendChild(script);
    script.onload = () => {
      setScriptLoaded(true);
    }
  },[]);

  const save = () => {
    let newItem = true;
    for (let i=0;i<list.length;i++){
      if (list[i].id == populateAddress.id) {
        newItem = false;
        if (name) {
          list[i].name = name;
        }
        if (addressType) {
          list[i].addressType = addressType;
        }
        if (city) {
          list[i].city = city;
        }
        if (line1) {
          list[i].line1 = line1;
        }
        if (line2) {
          list[i].line2 = line2;  
        }
        if (stateAddress) {
          list[i].state = stateAddress;
        }
        if(postalCode) {
          list[i].postalCode = postalCode;
        }
        if(landmark) {
          list[i].landmark = landmark;  
        }
        setList([...list]);
        break;
      }
    }
    if (newItem) {
      setList([...list, populateAddress]);
    }
    clear();
    setIsEditing(false);
  }

  const clear = () => {
    setPopulateAddress({
      id: '',
      name: '',
      line1: '',
      line2: '',
      city: '',
      state: '',
      postalCode: '',
      landmark: '',
      addressType: ''
    });
  }

  const remove = (removeItem) => {
    let updatedList = list.filter((item)=>{
      return item.id != removeItem.id
    });
    setList(updatedList);
  }

  const back = () => {
    clear();
    setIsEditing(false);
  }

  const edit = (editItem) => {
    setPopulateAddress(editItem);
    setIsEditing(true);
  }

  const onChangeName = (evt) => {
    setName(evt.target.value);
  }

  const onChangeAddressLine1 = (evt) => {
    setLine1(evt.target.value);
  }

  const onChangeAddressLine2 = (evt) => {
    setLine2(evt.target.value);
  }

  const onChangeCity = (evt) => {
    setCity(evt.target.value);
  }

  const onChangeState = (evt) => {
    setStateAddress(evt.target.value);
  }

  const onChangePostalCode = (evt) => {
    setPostalCode(evt.target.value);
  }

  const onChangeLandmark = (evt) => {
    setLandmark(evt.target.value);
  }

  const onChangeAddressType = (evt) => {
    setAddressType(evt.target.value);
  }
  
  return (
    <div className="container">
      <div className="row">
        <SavedAddress data={list} remove={remove} edit={edit}/>
      </div>
        <div className="row">
          {scriptLoad && !isEditing &&
            <Suggestions setPopulateAddress={setPopulateAddress}/>
          }
        </div>
        
        <div className="col-sm-12 p-bottom address-name">
          <input className="form-control input-lg" onChange={(e)=>onChangeName(e)} defaultValue={populateAddress.name} placeholder="Address Name" type="text"/>
        </div>
        <div className="col-sm-12 p-bottom">
          <input className="form-control input-lg" onChange={(e)=>onChangeAddressType(e)} defaultValue={populateAddress.addressType} placeholder="Address Type" type="text"/>
        </div>
        <div className="col-sm-6 p-bottom">
          <input className="form-control input-lg" onChange={(e)=>onChangeAddressLine1(e)} defaultValue={populateAddress.line1} placeholder="Address Line1" type="text"/>
        </div>
        <div className="col-sm-6 p-bottom">
          <input className="form-control input-lg" onChange={(e)=>onChangeAddressLine2(e)} defaultValue={populateAddress.line2} placeholder="Address Line2" type="text"/>
        </div>
        <div className="col-sm-6 p-bottom">
          <input className="form-control input-lg" onChange={(e)=>onChangeCity(e)} defaultValue={populateAddress.city} placeholder="City" type="text"/>
        </div>
        <div className="col-sm-6 p-bottom">
          <input className="form-control input-lg" onChange={(e)=>onChangeState(e)} defaultValue={populateAddress.state} placeholder="State"  type="text"/>
        </div>
        <div className="col-sm-6 p-bottom">
          <input className="form-control input-lg" onChange={(e)=>onChangePostalCode(e)} defaultValue={populateAddress.postalCode} placeholder="Postal Code"  type="text"/>
        </div>
        <div className="col-sm-6 p-bottom">
          <input className="form-control input-lg" onChange={(e)=>onChangeLandmark(e)} defaultValue={populateAddress.landmark} placeholder="Landmark"  type="text"/>
        </div>
        <div className="col-sm-12 p-bottom clear-save-data">
          {isEditing && <a className="back" onClick={()=>back()}>back</a>}
          <a className="clear" onClick={()=>clear()}>clear</a>
          <button type="button" className="btn btn-primary btn-save" onClick={()=>save()}>Save & Deliver to this Address</button>
        </div>
    </div>
  );
}

export default App;