var validator = require("validator");

module.exports = ({ args, settings, message }) => {
  let itemNameToCheck = args.slice(5).join("");
  let itemName = args.slice(5).join("+");
  let readableItemName = args.slice(5).join(" ");
  let itemPrice = args[1];
  let itemRecurring = args[2];
  let cancelURL = "";
  let returnURL = "";
  let cycles = args[3];
  let frequency = args[4].toLowerCase();
  let noFrequency = 3;

  if (frequency == "monthly") {
    noFrequency = 3;
  } else if (frequency == "biannually") {
    noFrequency = 5;
  } else if (frequency == "quarterly") {
    noFrequency = 4;
  } else if (frequency == "annually") {
    noFrequency = 6;
  } else {
    message.channel.send("Invalid frequency provided type !help for more info");
    return;
  }

  if (!validator.isNumeric(cycles) || !((cycles) => 1)) {
    message.channel.send("Invalid cycles provided type !help for more info");
    return;
  }

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

  let url = `${readableItemName} - (Initial Amount: R${itemPrice} ) (Recurring ${capitalize(
    frequency
  )}: R${itemRecurring}) (Cycles: ${cycles})- https://www.payfast.co.za/eng/process?cmd=_paynow&receiver=${
    settings.payfastKey
  }&item_name=${itemName}&amount=${itemPrice}${returnURL}${cancelURL}&cycles=${cycles}&frequency=${noFrequency}&m_payment_id=pay_now_${
    settings.payfastKey
  }&subscription_type=1&recurring_amount=${itemRecurring}`;

  message.channel.send(url);
};

const capitalize = (s) => (s && s[0].toUpperCase() + s.slice(1)) || "";
