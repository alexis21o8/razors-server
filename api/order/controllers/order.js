'use strict';
const stripe = require("stripe")("sk_test_51JyoILFncBrtj1ySDcH4dfOVqT0lZ9dpLVRkmvXewh7BTMu1A0TQZfLFpAgsFBYvTmE3MD3VzArAFKocsSh0Rf5g00GaILplek");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    create:async ctx =>{
        const {name,total,items,stripeTokenId} = ctx.request.body;
        const {id} = ctx.state.user;
        const charge = await stripe.charges.create({
            amount: (total * 100).toFixed(),
            currency:"usd",
            description:`Order ${new Date()} by ${ctx.state.user.username}`,
            source: stripeTokenId
        });
        const order = await strapi.services.order.create({
            name,total,items,user:id
        });
        return order;
    }
};
