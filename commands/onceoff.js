var validator = require("validator");

module.exports = ({ args, settings, message }) => {
  console.log(args);

  let itemNameToCheck = args.slice(2).join("");
  let readableItemName = args.slice(2).join(" ");
  let itemPrice = args[1];
  let itemName = args.slice(2).join("+");
  let cancelURL = "";
  let returnURL = "";

  settings.cancelurl
    ? (cancelURL = "&cancel_url=" + encodeURI(settings.cancelurl))
    : null;
  settings.returnurl
    ? (returnURL = "&return_url=" + encodeURI(settings.returnurl))
    : null;

  console.log(itemName);
  if (
    !validator.isBase64(itemNameToCheck, { urlSafe: true }) ||
    itemName == ""
  ) {
    console.log("Item Name / Service is not in a valid format");
    message.channel.send("Item Name / Service is not in a valid format");
    return;
  }

  if (!validator.isNumeric(itemPrice)) {
    console.log("Item price is not valid");
    message.channel.send("Item price is not valid");
    return;
  }

  let url = `${readableItemName} (R${itemPrice} Once Off) - https://www.payfast.co.za/eng/process?cmd=_paynow&receiver=${settings.payfastKey}&item_name=${itemName}&amount=${itemPrice}${returnURL}${cancelURL}`;

  message.channel.send(url);
};
