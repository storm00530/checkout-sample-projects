import React  from 'react';
import { Route, useLocation, Switch } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { BillingAddress } from '@boldcommerce/checkout-react-components';
import { Shipping } from '../Shipping';
import { PaymentMethod } from '../Payment';

const CheckoutForm = () => {
  const location = useLocation();
  return (
    <>
      <TransitionGroup>
        <CSSTransition
          timeout={150}
          classNames="fade"
          key={location.key}
        >
          <Switch location={location}>
            <Route exact path="/shipping" component={Shipping} />
            <Route exact path="/billing" component={BillingAddress} />
            <Route exact path="/payment" component={PaymentMethod} />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </>
  )};


export default CheckoutForm;