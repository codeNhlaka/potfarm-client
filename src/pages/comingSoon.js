import '../styles/comingsoon.css';
import { useState } from 'react';
import { ProcessingIcon } from '../components/processingIcon';
import { CompleteIcon } from '../components/completeIcon';
import { SubmitIcon } from '../components/submitIcon';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Navigation = () => (
    <div className="nav">
        <h1 className="brand logo">Potfarm.</h1>
    </div> 
)

// css background image

const ProductImage = () => <div className="product-image"/> 


function Form({ notify }){
    const [isSubmiting, setIsSubmiting] = useState(false);
    const [subscribed, setSubscribed] = useState(false);
    const [email, setEmail] = useState(null);

    function handleChange(e){
        return setEmail(e.target.value);
    }

    function handleSubmit(){

        // validates email address...

        function scanEmail(address){
            let regex = new RegExp('[a-z0-9]+@[a-z]+[a-z]{2,3}');
            return regex.test(address);
        }

        // check if email is entered, if not - notify then return...

        if (!email){ 
            notify("Please enter an email address");
            return;
        } else {

            if (!scanEmail(email)){ // validate if email is valid...
                notify("Please enter a valid email");
                return;
            }

            setIsSubmiting(true);

            axios.post("http://localhost:4040/subscribe-email", {email}).then((response) => {
                const { subscribed } = response.data;
                
                setIsSubmiting(false);

                if (subscribed){
                    setSubscribed(true);

                    setTimeout(() => {
                        setSubscribed(false);
                        setEmail("")
                    }, 2000);

                } else {
                    notify("Something went wrong...")
                }

            }).catch(error => {
                notify("Something went wrong...")
            })
        }
    }

    return (
        <div className="form-section">
            <div className="header">
                <h1>Coming Soon</h1>
            </div>
            <div className="details">
                <p>Shop by strain, price, deals, dispensary, location, brand, star-rating, or vibes. Find the best legal weed near you.</p>
            </div>
            <div className="notify">
                <p>We'll notify you when we land</p>
            </div>
            <div className="input-container">
                <input onChange={e => handleChange(e)} type="text" placeholder="Email Address" autoComplete="false"/>
                <button onClick={ handleSubmit } disabled={isSubmiting}>
                    { isSubmiting ? <ProcessingIcon/> : subscribed ? <CompleteIcon/> : <SubmitIcon/> }
                </button>
            </div>
        </div>
    )
}

export default function ComingSoon(){
    const notify = (message) => toast(message);

    return (
        <div className="main">
            <ToastContainer />
            <Navigation/>
            <ProductImage/>
            <Form notify={ notify }/>
        </div>
    )
}