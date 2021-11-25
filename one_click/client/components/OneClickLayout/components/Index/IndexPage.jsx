import React, { useCallback, useEffect, useState }  from 'react';
import Card from '../Card';
import { LineItems } from '../LineItems';
import { useCheckoutStore, useShippingAddress } from '@boldcommerce/checkout-react-components';
import { Price } from '@boldcommerce/stacks-ui/lib';
import LoadingState from '../LoadingState/LoadingState';


const IndexPage = () => {
  const { state } = useCheckoutStore();
  const { order_total, customer, addresses, shipping } = state.applicationState;
  const shippingAddressLines = addresses.shipping.address_line_2 ? `${addresses.shipping.address_line_1}, ${address.shipping.address_line_2}` : addresses.shipping.address_line_1;
  const billingAddressLines = addresses.billing.address_line_2 ? `${addresses.billing.address_line_1}, ${address.billing.address_line_2}` : addresses.billing.address_line_1;
  const { submitShippingAddress } = useShippingAddress();
  const [loading, setLoading] = useState(false);
  
  const setDefaultAddress = useCallback(async () => {
    setLoading(true);
    try {
      await submitShippingAddress(customer.saved_addresses[0]);
    } catch(e) {
      setLoading(false);
    }
    setLoading(false);
  }, [state]);

  useEffect(() => {
    //if customer hasn't set a shipping address yet and they have a saved shipping address, set the shipping address to the first one. 
    if(addresses.shipping.length == 0 && customer.saved_addresses.length > 0){
      setDefaultAddress();
    }
  }, []);

  return (
    <>
      <LineItems />
      <Card
        title={"Summary"}
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
        component={"/shipping"}
        description={ !loading ? `${addresses.shipping.first_name} ${addresses.shipping.last_name}` : ''}
      >
      { (loading && <LoadingState/>) || 
      ( 
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
      )}
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

    </>
  )
};

export default IndexPage;
