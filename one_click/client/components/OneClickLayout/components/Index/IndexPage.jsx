import React  from 'react';
import Card from '../Card';
import classNames from 'classnames';
import { Price } from '@boldcommerce/stacks-ui/lib';
import { LineItems } from '../LineItems';
import { PaymentMethod } from '../Payment';
import { useCheckoutStore } from '@boldcommerce/checkout-react-components';
import { CheckoutButton } from '../CheckoutButton';


const IndexPage = ({ onSectionChange, show }) => {
  const { state } = useCheckoutStore();
  const { order_total, customer, addresses, shipping } = state.applicationState;
  const shippingAddressLines = addresses.shipping.address_line_2 ? `${addresses.shipping.address_line_1}, ${addresses.shipping.address_line_2}` : addresses.shipping.address_line_1;
  const billingAddressLines = addresses.billing.address_line_2 ? `${addresses.billing.address_line_1}, ${addresses.billing.address_line_2}` : addresses.billing.address_line_1;
  return (
    <div className={classNames('Sidebar IndexPage', show ? 'Sidebar--Show' : 'IndexPage--Hide')}>
      <LineItems />
      <Card
        title={"Summary"}
        handleClick={() => onSectionChange('summary')}
        component={"/summary"}
        overview={<Price amount={order_total} />}
      />
      { customer?.email_address && (
        <Card
          description={customer.email_address}
          action={{label: "Not you?"}}
        />
      )}
      <Card
        title={"Shipping"}
        handleClick={() => onSectionChange('shipping')}
        description={addresses.shipping.first_name ? `${addresses.shipping.first_name} ${addresses.shipping.last_name}` : 'No shipping address selected'}
      >
      { 
        shipping.selected_shipping &&
        <>
        <div>
          {`${shippingAddressLines}, 
            ${addresses.shipping.city},
            ${addresses.shipping.province},
            ${addresses.shipping.postal_code},
            ${addresses.shipping.country}
          `}
        </div>
        <div className="card-shipping-content">{shipping.selected_shipping.description} - <Price amount={shipping.selected_shipping.amount} /></div>
        </>
      }
      </Card>
      <Card
        title={"Payment"}
        type={"paymentCard"}
      >
      {
        state.orderInfo.billingSameAsShipping ? 
        <div>Billing address same as shipping address</div> :
        <div>
          {`${billingAddressLines}, 
            ${addresses.billing.city},
            ${addresses.billing.province},
            ${addresses.billing.postal_code},
            ${addresses.billing.country}
          `}
          </div>
      }
      </Card>
      <PaymentMethod />
      <CheckoutButton className="CheckoutButton"/>
    </div>
  )
};

export default IndexPage;
