var validator = require("validator");

module.exports = ({ args, settings, message }) => {
  let readableItemName = args.slice(3).join(" ");
  let itemNameToCheck = args.slice(3).join("");
  let itemName = args.slice(3).join("+");
  let itemPrice = args[1];
  let itemRecurring = args[2];
  let cancelURL = "";
  let returnURL = "";

  settings.cancelurl
    ? (cancelURL = "&cancel_url=" + encodeURI(settings.cancelurl))
    : null;
  settings.returnurl
    ? (returnURL = "&return_url=" + encodeURI(settings.returnurl))
    : null;

  if (
    !validator.isBase64(itemNameToCheck, { urlSafe: true }) ||
    itemName == ""
  ) {
    console.log("Item Name / Service is not in a valid format");
    message.channel.send("Item Name / Service is not in a valid format");
    return;
  }

  if (!(validator.isNumeric(itemPrice) && validator.isNumeric(itemRecurring))) {
    console.log("Item price is not valid");
    message.channel.send("Item price is not valid");
    return;
  }

  let url = `${readableItemName} - (Initial Amount: R${itemPrice} ) (Recurring Monthly: R${itemRecurring}) - https://www.payfast.co.za/eng/process?cmd=_paynow&receiver=${settings.payfastKey}&item_name=${itemName}&amount=${itemPrice}${returnURL}${cancelURL}&cycles=0&frequency=3&m_payment_id=pay_now_${settings.payfastKey}&subscription_type=1&recurring_amount=${itemRecurring}`;

  message.channel.send(url);
};
