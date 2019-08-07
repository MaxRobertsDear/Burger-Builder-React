import React, { Component } from 'react'

import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.module.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/Forms/Input/Input'

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input', 
        elementConfig: {
          type: 'text', 
          placeholder: 'Your name'
        },
        value: ''
      },
      street: {
        elementType: 'input', 
        elementConfig: {
          type: 'text', 
          placeholder: 'Your Street'
        },
        value: ''
      },
      postcode: {
        elementType: 'input', 
        elementConfig: {
          type: 'text', 
          placeholder: 'Your Post Code'
        },
        value: ''
      }, 
      country: {
        elementType: 'input', 
        elementConfig: {
          type: 'text', 
          placeholder: 'Your Country'
        },
        value: ''
      },
      email: {
        elementType: 'input', 
        elementConfig: {
          type: 'email', 
          placeholder: 'Your E-Mail'
        },
        value: ''
      },
      deliveryMethod: {
        elementType: 'select', 
        elementConfig: {
          options: [
            {value: 'fastest', displayValue: 'Fastest'}, 
            {value: 'cheapest', displayValue: 'Cheapest'}, 
          ]
        },
        value: ''
      }
    },
    loading: false
  }

  orderHandler = (event) => {
    event.preventDefault()
    this.setState({loading: true})
    const order = {
      ingredients: this.props.ingredients, 
      price: this.props.price, 
    }
    axios.post('/orders.json', order)
    .then( reponse => {
      this.setState({loading: false})
      this.props.history.push('/')
    })
    .catch(error => {
      this.setState({loading: false})
    })
  }


  render () {
    const formElementsArray = []
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key, 
        config: this.state.orderForm[key]
      })
    }
    let form = (
      <form>
        {formElementsArray.map(formElement => (
          <Input 
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig} 
            value={formElement.config.value} />
        ))}
        <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
      </form>
    ) 
    if (this.state.loadng) {
      form = <Spinner />
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Info</h4>
        {form}
      </div>
    )
  }
}

export default ContactData